import React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import PrimarySearchAppBar from "../Header";

import { Outlet } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PrimarySearchAppBar />
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </ThemeProvider>
  );
}

export default Layout;
