import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Container } from '@comps/common';
import { HomeHeader } from '@comps/Header';
import { Rooms } from '@comps/Lobby';
import { WalletConnectModal } from '@comps/Modal';
import { CardTypeEnum } from '../types';


const LobbyPage = () => {
  const wallet = false;
  const [selected, setSelected] = useState<CardTypeEnum>(CardTypeEnum.Gold);
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Shooting coin: Lobby</title>
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

export default LobbyPage;
