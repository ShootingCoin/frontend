import App from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalStyle } from '@comps/styles/GlobalStyle';
import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilState } from 'recoil';
import { uuidState } from 'src/recoil/socket';
import { WagmiConfig } from 'wagmi';
import { client } from 'src/hooks/useWallet';

let socket;

function WebSocketInitializer({ children }: { children: React.ReactNode }) {
  const [, setSocketId] = useRecoilState(uuidState);
  const socketInitializer = () => {
    socket = new WebSocket(`${process.env.WS_ORIGIN}/v1/ws`);
  
    socket.addEventListener('open', function (event) {
      console.log('ws connected');
    });

    socket.addEventListener('message', function (event) {
      console.log(event);
      setSocketId(event.data);
    });
  };

  useEffect(() => socketInitializer(), []);
  return (
    <>
      {children}
    </>
  );
}

function app({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <RecoilRoot>
          <GlobalStyle />
          <WebSocketInitializer>
            <Component {...pageProps} />
          </WebSocketInitializer>
        </RecoilRoot>
      </WagmiConfig>
    </ChakraProvider>
  );
}
   
app.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  
  return { ...appProps }
}

export default app;