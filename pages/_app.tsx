import { NextComponentType, NextPage, NextPageContext } from 'next';
import { SessionProvider, useSession } from 'next-auth/react';
import { extendTheme } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css'

import Fallback from '~/components/features/Fallback';

import { Chakra } from "./chakra";
import { Session } from 'inspector';
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

interface AuthEnabledComponentConfig {
  authEnabled: boolean;
}
type NextComponentWithAuth = NextComponentType<NextPageContext, any, {}> &
    Partial<AuthEnabledComponentConfig>;


type AppPropsWithLayout = any & AppProps & {
    Component: NextComponentWithAuth;
};

function MyApp({ Component, pageProps:{ session, ...pageProps} }: AppPropsWithLayout) {
  return (
    <SessionProvider session={session}>
      <Chakra cookies={pageProps.cookies}>
        <RecoilRoot>
          {Component.authEnabled ? (
              <Auth>{<Component {...pageProps} />}</Auth>
          ) : (
              <Component {...pageProps} />
          )}
          <ToastContainer position="bottom-right" />
        </RecoilRoot>
      </Chakra>
    </SessionProvider>
    )
} 

const Auth = ({ children }: { children: any }) => {
  const { data: session } = useSession({ required: true });
  const isUser = !!session?.user;
  if (isUser) {
      return children;
  }

  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <Fallback />;
};

export default MyApp
