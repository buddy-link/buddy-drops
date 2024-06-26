"use client";

import {initBuddyDrops, initBuddyState} from 'buddy.drops';
import { theme } from '../lib/theme';
import { Poppins } from "next/font/google";
import { ThemeProvider } from 'styled-components';
import StyledProvider from '../lib/styled';
import {
  ConnectionProvider, useConnection, useWallet,
  WalletProvider,
} from "@solana/wallet-adapter-react";
require('@solana/wallet-adapter-react-ui/styles.css');
import '../lib/globals.css';
import {WalletModalProvider} from "@solana/wallet-adapter-react-ui";
import {useEffect} from "react";
import { USER_WALLET, WALLET_CONNECTION, SOLANA_ENVIRONMENT, ENVIRONMENT_DEVNET } from 'buddy.drops';
import { useBuddyState } from 'buddy.drops';

const withThemes = (palette) => {
  return {
    ...theme[palette]
  };
};

initBuddyDrops({[SOLANA_ENVIRONMENT]: ENVIRONMENT_DEVNET});

const UnsafeSolanaWalletAdapter = () => {

  const { connection } = useConnection();
  const wallet = useWallet();

  console.log('connection', connection);
  console.log('wallet', wallet);

  const [, setConnection] = useBuddyState(WALLET_CONNECTION);

  const [, setWallet] = useBuddyState(USER_WALLET);

  useEffect(() => {
    setConnection(connection);
    setWallet(wallet);
  }, [connection, wallet])

  return null;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const RootLayout = ({ children }) => {
  const endpoint = process.env.NEXT_PUBLIC_RPC_ENDPOINT;

  return (
    <html lang={"en"}>
      <body className={poppins.className}>
        <ConnectionProvider endpoint={ endpoint }>
          <WalletProvider wallets={[]} autoConnect>
            <WalletModalProvider>
              <UnsafeSolanaWalletAdapter/>
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