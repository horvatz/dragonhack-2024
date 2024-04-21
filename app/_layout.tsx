import { Stack } from "expo-router";
import React from "react";
import colors from "tailwindcss/colors";
import "../global.css";

/**
 * Layout shared by all the routes.
 */
const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        // statusBarStyle: "dark",
        // statusBarColor: colors.gray[100],
        navigationBarColor: colors.gray[100],
      }}
    />
  );
};

export default Layout;
