"use client";

import { initBuddyState, useBuddyState } from 'buddy.link';
import {initialState, THEME_PALETTE} from '../lib/state';
import { theme } from '../lib/theme';
import { Poppins } from "next/font/google";
import { ThemeProvider } from 'styled-components';
import StyledProvider from '../lib/styled';

import '../lib/globals.css';

const withThemes = (palette) => {
  return {
    ...theme[palette]
  };
};

initBuddyState({
  ...initialState
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const RootLayout = ({ children }) => {
  const [palette, setPalette] = useBuddyState(THEME_PALETTE);



  return (
    <html lang={"en"}>
    <body className={poppins.className}>
    <ThemeProvider theme={withThemes(palette)}>
      <StyledProvider>
        {children}
      </StyledProvider>
    </ThemeProvider>
    </body>
    </html>
  );
}

export default RootLayout;