import { Text } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import { HomeHeader } from '../components/Header';
import { Rooms } from '../components/Home';
import { CardTypeEnum } from '../types';

const MainPage = () => {
  const wallet = true;
  const [selected, setSelected] = useState<CardTypeEnum>(CardTypeEnum.Gold);
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Shooting coin</title>
      </Head>
      <Container>
        <HomeHeader />
        {wallet ? (
          <Rooms selected={selected} onSelect={setSelected} />
        ) : (
          <Text
            mt="132px"
            fontWeight="600"
            fontSize="22px"
            lineHeight="28px"
            color="#D9D9D9"
            textAlign="center"
          >
            Please link your wallet
          </Text>
        )}
        <Button 
          margin="auto auto 72px auto"
          onClick={() => router.push({ pathname: '/game/ready', query: { type: selected } })}
        >
          {wallet ? "Enter the room" : "Get Started"}
        </Button>
      </Container>
    </>
  );
};

export default MainPage;
