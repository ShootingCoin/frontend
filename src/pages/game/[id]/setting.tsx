import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Participants from "~/src/components/Game/Participants";
import Setting from "~/src/components/Game/Setting";
import { GameHeader } from "~/src/components/Header";
import { Button, Container } from '@comps/common';
import { account, defaultChips, player2 } from "src/dummy";
import { useRouter } from "next/router";
import { GameExitModal } from "src/components/Modal";
import useLoading from "src/hooks/useLoading";
import { useRecoilState, useRecoilValue } from "recoil";
import { eggsState, isFirstState, opponentEggsState } from "src/recoil/game";
import { webSocketState } from "src/recoil/socket";

const GameSettingPage = () => {
  const router = useRouter();
  const { isLoading, setIsLoading } = useLoading();
  const [isFirst, setIsFirst] = useRecoilState(isFirstState);
  const [eggs, setEggs] = useRecoilState(eggsState);
  const opponentEggs = useRecoilValue(opponentEggsState);
  const webSocket = useRecoilValue(webSocketState);
  const [time, setTime] = useState(45);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickReady = () => {
    if (eggs) {
      webSocket.send(JSON.stringify({
        state: 'setting',
        data: eggs,
      }));
      setIsLoading(true);
    }
    // router.push(`/game/${router.query.id}`);
  };

  useEffect(() => {
    if (opponentEggs && !isLoading) {
      setIsFirst(false);
    }
    if (opponentEggs && isLoading && eggs) {
      if (!eggs.includes(x => x.account === opponentEggs[0].account)) {
        setEggs([
          ...eggs,
          ...opponentEggs,
        ]);
        console.log('The game is ready!');
        router.push(`/game/${router.query.id}`)
      }
    }
  }, [opponentEggs, isLoading]);

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
        />
        <Box 
          mt="40px" 
          mx="20px"
          sx={{ ...isLoading &&  { '& #game-setting': { pointerEvents: 'none' } } }}
        >
          <Setting />
        </Box>
        <Button
          margin="36px auto 72px auto"
          disabled={!eggs}
          onClick={handleClickReady}
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
