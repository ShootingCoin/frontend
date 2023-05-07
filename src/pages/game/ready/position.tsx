import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Button from "~/src/components/Button";
import Container from "~/src/components/Container";
import Participants from "~/src/components/Game/Participants";
import Setting from "~/src/components/Game/Setting";
import { GameHeader } from "~/src/components/Header";
import { Chip } from "~/src/types";

const defaultChips: Chip[] = [
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 32,
  },
  {
    name: 'Ethereum',
    unit: 'ETH',
    amount: 0.32,
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 14,
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 7,
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 5.4,
  },
];

const account = '0xfc960a1de1e0687c7b91bfec9ca0f132b14bf3f2750591dd5c12a389611d4330';
const player2 = '0xfc960a1de1e0687c7b91bfec9ca0f132b14bf3f2750591dd5c12a389611d4330';

const GamePage = () => {
  const [time, setTime] = useState(45);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        clearInterval(countdown);
      }
    }, 1000);
    return clearInterval(countdown);
  }, [time]);
  return (
    <>
      <Head>
        <title>Shooting coin</title>
      </Head>
      <Container>
        <GameHeader chips={defaultChips} />
        <Participants 
          player1={account}  
          player2={player2}
          player1Img=""
          player2Img=""
          time={time}
          isMatching
        />
        <Box mt="40px" mx="20px">
          <Setting />
        </Box>
        <Button
          margin="36px auto 72px auto"
          onClick={() => {}}
          isLoading
        >
          READY
        </Button>
      </Container>
    </>
  );
};

export default GamePage;
