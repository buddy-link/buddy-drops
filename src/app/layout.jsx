"use client";

import {initBuddyDrops} from '../index';
import { theme } from '../lib/theme';
import { Poppins } from "next/font/google";
import { ThemeProvider } from 'styled-components';
import StyledProvider from '../lib/styled';
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
require('@solana/wallet-adapter-react-ui/styles.css');
import '../lib/globals.css';
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";

const withThemes = (palette) => {
  return {
    ...theme[palette]
  };
};

initBuddyDrops();

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const RootLayout = ({ children }) => {
  const endpoint = process.env.NEXT_PUBLIC_DEVNET_RPC;

  return (
    <html lang={"en"}>
      <body className={poppins.className}>
        <ConnectionProvider endpoint={ endpoint }>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <ThemeProvider theme={withThemes("light")}>
                <StyledProvider>
                  {children}
                </StyledProvider>
              </ThemeProvider>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </body>
    </html>
  );
}

export default RootLayout;