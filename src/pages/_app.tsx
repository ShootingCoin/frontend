import App from 'next/app';
import { ChakraProvider } from '@chakra-ui/react'
import { GlobalStyle } from '@comps/styles/GlobalStyle';
import React, { useEffect } from 'react';
import { RecoilRoot, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { matchIdState, webSocketState, uuidState } from 'src/recoil/socket';
import { WagmiConfig } from 'wagmi';
import { client } from 'src/hooks/useWallet';
import { eggsState, isLoadingState, isMyTurnState, opponentEggsState } from 'src/recoil/game';
import { useRouter } from 'next/router';
import convertGameData from 'src/utils/convertGameData';
import axios from 'axios';
import { tokenPriceState } from 'src/recoil/token';

let socket;

function WebSocketInitializer({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setTokenPrice = useSetRecoilState(tokenPriceState); 
  const [socketId, setSocketId] = useRecoilState(uuidState);
  const [matchId, setMatchId] = useRecoilState(matchIdState);
  const [, setIsLoading] = useRecoilState(isLoadingState);
  const [, setIsMyTurn] = useRecoilState(isMyTurnState);
  const [, setWebSocket] = useRecoilState(webSocketState);
  const [, setEggs] = useRecoilState(eggsState);
  const [, setOpponentEggs] = useRecoilState(opponentEggsState);

  const socketInitializer = () => {
    socket = new WebSocket(`${process.env.WS_ORIGIN}/v1/ws`);
  
    socket.addEventListener('open', function (event) {
      console.log('ws connected');
    });

    socket.addEventListener('message', function (event) {
      const data = JSON.parse(event.data);

      if (data.type === 'wsId') setSocketId(data.content);
      if (data.type === 'gameId') setMatchId(data.content);
      if (data.type === 'gameInfo') {
        const gameData = JSON.parse(data.content);

        if (gameData.state === 'setting') {
          const val = convertGameData(gameData.data);
          setOpponentEggs(val);
        }
        if (gameData.state === 'action') {
          const val = convertGameData(gameData.data);
          setEggs(val);
          setIsLoading(true);
          setIsMyTurn(true);
        }
      }
    });

    setWebSocket(socket);
  };

  useEffect(() => {
    const getPrice = async () => {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
      if (response?.data['matic-network']?.usd) {
        setTokenPrice({
          MATIC: response?.data['matic-network']?.usd,
          STC: 0,
        });
      }
    };
    getPrice();
    socketInitializer();
  }, []);
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
            <div id="modal-portal"/>
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