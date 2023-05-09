import { Portal, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import { HomeHeader } from '../components/Header';
import { Rooms } from '../components/Home';
import { WalletConnectModal } from '../components/Modal';
import { CardTypeEnum } from '../types';

const MainPage = () => {
  const wallet = false;
  const [selected, setSelected] = useState<CardTypeEnum>(CardTypeEnum.Gold);
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Shooting coin</title>
      </Head>
      {!wallet && (
        <WalletConnectModal/>
      )}
      <Container>
        <HomeHeader />        
        <Rooms selected={selected} onSelect={setSelected} />
        <Button 
          disabled={!wallet}
          margin="auto auto 72px auto"
          onClick={() => router.push({ pathname: '/game/ready', query: { type: selected } })}
        >
          Enter the room
        </Button>
      </Container>
    </>
  );
};

export default MainPage;
