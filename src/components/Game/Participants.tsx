import React, { useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import ClockIcon from 'public/icons/icon-clock.svg';
import Profile from "./Profile";
import { color } from "@comps/styles/common.style";
import { useRecoilState, useRecoilValue } from "recoil";
import { isFirstState, isMyTurnState } from "src/recoil/game";


interface Props {
  player1: string;
  player2?: string;
  player1Img: string;
  player2Img?: string;
  time: number;
  isMatching?: boolean;
}

export default function Participants({
  player1,
  player2,
  player1Img,
  player2Img,
  time,
  isMatching=false,
}: Props) {
  const isFirst = useRecoilValue(isFirstState);
  const [isMyTurn, setIsMyTurn] = useRecoilState(isMyTurnState);

  useEffect(() => {
    setIsMyTurn(isFirst);
  }, [isFirst]);
  return (
    <Box pt="18px" px="20px" display="flex" position="relative">
      <Profile
        type={1}
        address={player1}
        img={player1Img}
        isCurrent={isMyTurn}
      />
      <Box 
        mt="8px"
        mx="auto" 
        px="20px" 
        display="flex" 
        alignItems="center"
        h="fit-content"
        color="#999"
        fontWeight="500"
        fontSize="19px"
        lineHeight="23px"
      >
        <Text mr="18px">00</Text>
        <ClockIcon />
        <Text ml="18px">{String(time).padStart(2, '0')}</Text>
      </Box>
      <Profile
        type={2}
        address={player2}
        img={player2Img}
        isCurrent={!isMyTurn}
      />
      {isMatching && (
        <Text 
          position="absolute"
          bottom="-36px"
          left="50%"
          transform="translateX(-50%)"
          color={color.text.primary}
          fontSize="16px"
          lineHeight="19px"
          textAlign="center"
        >
          Matching Success !<br/>
          Press Ready for Game Start
        </Text>
      )}
    </Box>
  );
};
