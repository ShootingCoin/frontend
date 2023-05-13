import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Participants from "~/src/components/Game/Participants";
import Setting from "~/src/components/Game/Setting";
import { GameHeader } from "~/src/components/Header";
import { Chip } from "~/src/types";
import { Button, Container } from '@comps/common';

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

const account = '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3';
const player2 = '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3';

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
