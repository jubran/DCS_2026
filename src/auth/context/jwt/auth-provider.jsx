
// auth-provider.jsx localstorage management with token refresh
import PropTypes from "prop-types";
import { useMemo, useEffect, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { AuthContext } from "./auth-context";
import { setSession, isValidToken ,refreshToken} from "./utils";

// ----------------------------------------------------------------------

const initialState = { user: null, loading: true };
const STORAGE_KEY = "accessToken";

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL": return { loading: false, user: action.payload.user };
    case "LOGIN":
    case "REGISTER": return { ...state, user: action.payload.user };
    case "LOGOUT": return { ...state, user: null };
    default: return state;
  }
};

// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();
  const apiBaseUrl = import.meta.env.VITE_HOST_API;

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const response = await axios.get(`${apiBaseUrl}/dashboard`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const { user } = response.data;
        dispatch({ type: "INITIAL", payload: { user: { ...user, accessToken } } });
      } else {

        accessToken = localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await axios.get(`${apiBaseUrl}/dashboard`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          const { user } = response.data;
          dispatch({ type: "INITIAL", payload: { user: { ...user, accessToken } } });
        } else {
          throw new Error("No valid token");
        }
      }
    } catch (error) {
      console.error("Session initialization failed:", error);
      setSession(null);
      dispatch({ type: "INITIAL", payload: { user: null } });
      navigate("/auth/jwt/login?returnTo=%2Fdashboard");
    }
  }, [apiBaseUrl, navigate]);

  useEffect(() => { initialize(); }, [initialize]);

  const login = useCallback(async (user_name, password) => {
    try {
      const response = await axios.post(
        "/api/api.php?action=fetchAuth",
        JSON.stringify({ user_name, password }),
        { headers: { "Content-Type": "application/json" } }
      );

      const { accessToken, username } = response.data;
      if (!accessToken) throw new Error("No accessToken in response");

      setSession(accessToken);
      dispatch({ type: "LOGIN", payload: { user: { username, accessToken } } });
    } catch (error) {
      console.error("Login failed:", error);
    }
  }, []);

  const register = useCallback(async (email, password, firstName, lastName) => {
    const response = await axios.post(`${apiBaseUrl}/api/auth/register`, { email, password, firstName, lastName });
    const { accessToken, user } = response.data;

    setSession(accessToken);
    dispatch({ type: "REGISTER", payload: { user: { ...user, accessToken } } });
  }, [apiBaseUrl]);

  const logout = useCallback(() => {
    setSession(null);
    dispatch({ type: "LOGOUT" });
    navigate("/auth/jwt/login?returnTo=%2Fdashboard");
  }, [navigate]);

  const status = state.loading ? "loading" : state.user ? "authenticated" : "unauthenticated";

  const memoizedValue = useMemo(() => ({
    user: state.user,
    method: "axios",
    loading: status === "loading",
    authenticated: status === "authenticated",
    unauthenticated: status === "unauthenticated",
    login,
    register,
    logout,
  }), [login, logout, register, state.user, status]);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = { children: PropTypes.node };
