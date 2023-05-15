import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Container } from "src/components/common";
import { GameExitModal } from "src/components/Modal";
import { defaultChips } from "src/dummy";
import useWallet from "src/hooks/useWallet";
import Game from "~/src/components/Game";
import Participants from "~/src/components/Game/Participants";
import { GameHeader } from "~/src/components/Header";

const player2 = '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3';

const GamePage = ({ id }) => {
  const router = useRouter();
  const { query } = router;
  const { address } = useWallet();
  const [time, setTime] = useState(45);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        <GameHeader chips={defaultChips} type="game" onExit={() => setIsModalOpen(true)} />
        <Participants 
          player1={address}  
          player2={player2}
          player1Img=""
          player2Img=""
          time={time}
          isMatching
        />
        <Box mt="40px" mx="20px">
          <Game />
        </Box>
        <Button
          margin="36px auto 72px auto"
          onClick={() => {}}
          isLoading
        >
          READY
        </Button>
      </Container>
      
      <GameExitModal 
        open={isModalOpen} 
        onExit={() => {
          router.push(`/game/${query.id}/result`);
          setIsModalOpen(false);
        }}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default GamePage;

