import { QueryClientProvider } from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@/theme/config';
import { client } from '@/api/hooks';
import { AppProps } from 'next/app';
import { ReactNode } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import '@/styles/global.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (children: ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((c) => c);

  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={client}>
        <Head>
          <title>Evelyn | CyberDash</title>
        </Head>
        {getLayout(<Component {...pageProps} />)}
      </QueryClientProvider>
    </ChakraProvider>
  );
}
