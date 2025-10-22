import axios from "src/utils/axios";
import { paths } from "src/routes/paths";

// ----------------------------------------------------------------------

const STORAGE_KEY = "accessToken";
let expiredTimer = null;

// ----------------------------------------------------------------------

export function jwtDecode(token) {
  if (!token) return {};
  const parts = token.split(".");
  if (parts.length < 2) return {};
  const base64Url = parts[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  try {
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error("Failed to decode JWT:", err);
    return {};
  }
}

// ----------------------------------------------------------------------

export const isValidToken = (token) => {
  if (!token) return false;
  const decoded = jwtDecode(token);
  if (!decoded || typeof decoded.exp !== "number") return false;
  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

// ----------------------------------------------------------------------

export const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem(STORAGE_KEY, accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    const decoded = jwtDecode(accessToken);
    if (decoded?.exp) scheduleTokenRefresh(decoded.exp);
  } else {
    localStorage.removeItem(STORAGE_KEY);
    delete axios.defaults.headers.common.Authorization;
    clearTimeout(expiredTimer);
  }
};

// ----------------------------------------------------------------------

function scheduleTokenRefresh(exp) {
  clearTimeout(expiredTimer);

  if (!exp || typeof exp !== "number") return handleTokenExpired();

  const expMs = exp * 1000;
  const currentTimeMs = Date.now();
  let timeLeftMs = expMs - currentTimeMs;
  // const refreshThresholdMs = 60 * 1000; // قبل دقيقة من انتهاء التوكن
  const refreshThresholdMs = 1000 ; // قبل 30 ثانية من انتهاء التوكن

  if (timeLeftMs <= 0) return handleTokenExpired();

  if (timeLeftMs > refreshThresholdMs) {
    expiredTimer = setTimeout(() => scheduleTokenRefresh(exp), timeLeftMs - refreshThresholdMs);
  } else {
    expiredTimer = setTimeout(refreshToken, 0);
  }
}

// ----------------------------------------------------------------------
export async function refreshToken() {
  try {
    const oldToken = localStorage.getItem(STORAGE_KEY);
    if (!oldToken) throw new Error("No token in localStorage");

    const response = await axios.post("/api/api.php?action=refreshToken", { token: oldToken });
    const newToken = response?.data?.accessToken;

    if (!newToken) throw new Error("No new token received");

    setSession(newToken);
    console.log("Token refreshed successfully");
    return newToken;  // <-- هنا نعيد التوكن الجديد
  } catch (error) {
    console.error("refreshToken failed:", error);
    handleTokenExpired();
    throw error; // <-- نعيد رمي الخطأ حتى initialize يعرف أن التجديد فشل
  }
}

// ----------------------------------------------------------------------

function handleTokenExpired() {
  localStorage.removeItem(STORAGE_KEY);
  delete axios.defaults.headers.common.Authorization;
  clearTimeout(expiredTimer);
  window.location.href = paths.auth.jwt.login;
}
