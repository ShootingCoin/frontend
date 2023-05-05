import { Box, Text } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';
import Button from '../components/Button';
import Container from '../components/Container';
import HomeHeader from '../components/Header/HomeHeader';

const MainPage = () => {
  return (
    <>
      <Head>
        <title>Shooting coin</title>
      </Head>
      <Container>
        <HomeHeader />
        
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
        <Button 
          margin="auto auto 72px auto"
          onClick={() => {}}
        >
          Get Started
        </Button>
      </Container>
    </>
  );
};

export default MainPage;
