import PropTypes from "prop-types";
import React, { createContext, useMemo, useEffect, useReducer, useCallback } from 'react';
import { useNavigate } from "react-router-dom";

import { setSession, isValidToken } from "./utils";

import {
  initDatabases,
  fetchAuth,
  fetchData,
  getDcs,
  getDcsData,
  getEventsByDate,
} from '../../../../dist/sqliteApi'; // تأكد أن المسار صحيح بالنسبة لك

// ----------------------------------------
export const AuthContext = createContext(null);

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "INITIAL":
      return {
        loading: false,
        user: action.payload.user,
      };
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

const STORAGE_KEY = "accessToken";

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  // تحميل قواعد البيانات مرة واحدة عند بداية التطبيق
  useEffect(() => {
    initDatabases()
      .then(() => {
        // بعد تحميل القواعد، حاول استرجاع الجلسة السابقة
        const accessToken = sessionStorage.getItem(STORAGE_KEY);

        if (accessToken && isValidToken(accessToken)) {
          // في هذا المثال التوكن وهمي، يمكن تطويره لاحقًا

          // استرجاع بيانات المستخدم (إذا تحتاجها)
          // هنا لنفترض أننا نخزن فقط user_id و token في الجلسة
          dispatch({
            type: "INITIAL",
            payload: { user: { accessToken } },
          });
        } else {
          setSession(null);
          dispatch({ type: "INITIAL", payload: { user: null } });
          navigate("/auth/jwt/login?returnTo=%2Fdashboard");
        }
      })
      .catch((err) => {
        console.error("Failed to init DB:", err);
        setSession(null);
        dispatch({ type: "INITIAL", payload: { user: null } });
        navigate("/auth/jwt/login?returnTo=%2Fdashboard");
      });
  }, [navigate]);

  // دالة تسجيل الدخول
  const login = useCallback(
    async (email, password) => {
      try {
        // تأكد أن قواعد البيانات محملة
        await initDatabases();

        // نفذ تسجيل الدخول عبر قاعدة البيانات المحلية
        const { user_id, accessToken } = fetchAuth(email, password);

        // حفظ التوكن في الجلسة (sessionStorage)
        setSession(accessToken);
        sessionStorage.setItem(STORAGE_KEY, accessToken);

        dispatch({
          type: "LOGIN",
          payload: { user: { id: user_id, accessToken } },
        });

        navigate("/dashboard"); // عدل المسار حسب حاجتك
      } catch (error) {
        console.error("Login failed:", error.message);
        alert("فشل تسجيل الدخول: " + error.message);
      }
    },
    [navigate]
  );

  // دالة تسجيل الخروج
  const logout = useCallback(() => {
    setSession(null);
    sessionStorage.removeItem(STORAGE_KEY);
    dispatch({ type: "LOGOUT" });
    navigate("/auth/jwt/login?returnTo=%2Fdashboard");
  }, [navigate]);

  // الحالة الحالية للمستخدم
  const status = state.loading
    ? "loading"
    : state.user
    ? "authenticated"
    : "unauthenticated";

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      login,
      logout,
      // يمكنك إضافة register إذا تريد
    }),
    [state.user, status, login, logout]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
