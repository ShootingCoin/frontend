import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { Button, Container } from '@comps/common';
import { HomeHeader } from '@comps/Header';
import { Rooms } from '@comps/Lobby';
import { CardTypeEnum } from '../types';
import useWallet from 'src/hooks/useWallet';
import { Text } from '@chakra-ui/react';


const LobbyPage = () => {
  const { address } = useWallet();
  const [selected, setSelected] = useState<CardTypeEnum>(CardTypeEnum.Bronze);
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Shooting coin: Lobby</title>
      </Head>
      <Container>
        <HomeHeader />        
        <Text
          mt="80px"
          textAlign="center"
          color="#fff"
          fontWeight="700"
          fontSize="32px"
          lineHeight="40px"
        >
          Select Game Room
        </Text>
        <Rooms selected={selected} onSelect={setSelected} />
        {address && (
          <Button 
            disabled={!address}
            margin="auto auto 72px auto"
            onClick={() => router.push({ pathname: '/game/ready', query: { type: selected } })}
          >
            Enter the room
          </Button>
        )}
      </Container>
    </>
  );
};

export default LobbyPage;
