import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Participants from "~/src/components/Game/Participants";
import Setting from "~/src/components/Game/Setting";
import { GameHeader } from "~/src/components/Header";
import { Button, Container } from '@comps/common';
import { defaultChips } from "src/dummy";
import { useRouter } from "next/router";
import { GameExitModal } from "src/components/Modal";
import useLoading from "src/hooks/useLoading";

const account = '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3';
const player2 = '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3';

const GameSettingPage = () => {
  const router = useRouter();
  const { isLoading } = useLoading();
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
        <GameHeader 
          chips={defaultChips} 
          onReturn={() => setIsModalOpen(true)} 
        />
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
          onClick={() => {
            router.push(`/game/${router.query.id}`)
          }}
          isLoading={isLoading}
        >
          READY
        </Button>
      </Container>
      <GameExitModal
        open={isModalOpen} 
        title={<>Do you want to get out of the<br/>game now?</>}
        description={<>If you go out now, it might take a long time<br/>to assign a new game.</>}
        exitText={<>Leave Now</>}
        onExit={() => {
          setIsModalOpen(false);
          router.push('/lobby');
        }}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default GameSettingPage;
