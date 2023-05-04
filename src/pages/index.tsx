import Head from 'next/head';
import React from 'react';
import Container from '../components/Container';
import Game from '../components/Game';

const MainPage = () => {
  return (
    <>
      <Head>
        <title>Shooting coin</title>
      </Head>
      <Container>
        <Game/>
      </Container>
    </>
  );
};

export default MainPage;
