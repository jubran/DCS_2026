/* eslint-disable perfectionist/sort-imports */
import React from "react";
import "src/global.css";

import "src/locales/i18n";
// ----------------------------------------------------------------------

import Router from "src/routes/sections";

import ThemeProvider from "src/theme";

import { LocalizationProvider } from "src/locales";

import { useScrollToTop } from "src/hooks/use-scroll-to-top";

import ProgressBar from "src/components/progress-bar";
import { MotionLazy } from "src/components/animate/motion-lazy";
import { SettingsDrawer, SettingsProvider } from "src/components/settings";

import { AuthProvider } from "src/auth/context/jwt";


// ----------------------------------------------------------------------

export default function App() {
  const charAt = `

  ░░░    ░░░
  ▒▒▒▒  ▒▒▒▒
  ▒▒ ▒▒▒▒ ▒▒
  ▓▓  ▓▓  ▓▓
  ██      ██

  `;

  useScrollToTop();

  return (
    <AuthProvider>
      {/* <AuthProvider authMethod="axios"> */}
        {/* <AuthProvider authMethod="jquery"> */}
        <LocalizationProvider>
        <SettingsProvider
          defaultSettings={{
            themeMode: "light", // 'light' | 'dark'
            themeDirection: "rtl", //  'rtl' | 'ltr'
            themeContrast: "default", // 'default' | 'bold'
            themeLayout: "vertical", // 'vertical' | 'horizontal' | 'mini'
            themeColorPresets: "default", // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
            themeStretch: false,
          }}
        >
          <ThemeProvider>
            <MotionLazy>
              <SettingsDrawer />
              <ProgressBar />
              <Router />
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
