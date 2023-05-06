import { Box } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";
import Container from "~/src/components/Container";
import Game from "~/src/components/Game";

const GamePage = () => {
  return (
    <>
      <Head>
        <title>Shooting coin</title>
      </Head>
      <Container>
        <Box my="auto">
          <Game />
        </Box>
      </Container>
    </>
  );
};

export default GamePage;