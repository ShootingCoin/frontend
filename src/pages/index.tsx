import Head from 'next/head';
import React from 'react';
import { Box } from '@chakra-ui/react';
import Game from '../components/Game';

const MainPage = () => {
  return (
    <>
      <Head>
        <title>Shooting coin</title>
      </Head>
      <Box
        minHeight="100vh"
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Game />
      </Box>
    </>
  );
};

export default MainPage;
