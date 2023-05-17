import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { Chip } from "~/src/types";
import Image from "next/image";
import { color } from "@comps/styles/common.style";
import HeaderHead from "./HeaderHead";
import { useRecoilValue } from "recoil";
import { currentSituationState } from "src/recoil/game";
import { uuidState } from "src/recoil/socket";

interface Props {
  chips: Chip[];
  isSelectable?: boolean;
  type?: 'setting'|'game';
  onSelect?: (val: number) => void;
  onReturn?: () => void;
  onExit?: () => void;
}

const GameHeader = ({
  chips,
  isSelectable=false,
  type="setting",
  onSelect,
  onReturn,
  onExit,
}: Props) => {
  const uuid = useRecoilValue(uuidState);
  const currentSituation = useRecoilValue(currentSituationState);

  return (
    <Box
      as="header"
      borderBottom="1px solid #515151"
      bg={color.background.header}
    >
      <HeaderHead 
        title={type ==='game' ? 'Game' : "Game Set"} 
        returnUrl="/lobby" 
        exitVisible={type === 'game'}
        {...onReturn && {
          onClickReturn: onReturn,
        }}
        onClickExit={onExit}
      />
      <Box
        p="20px 10px"
        display="flex"
        justifyContent="center"
      >
        {chips.map((chip, i) => {
          const isOut = type ==='game' && currentSituation && currentSituation.find(x => x.account === uuid && x.idx === i).isOut;
          return (
            <Box 
              key={`${chip.name}_${chip.amount}${chip.unit}_${i}`}
              {...isSelectable && {
                onClick: () => onSelect(i),
              }}
              p="7px"
              position="relative"
              textAlign="center"
              borderRadius="7px"
              bg={chip.isSelected ? color.primary.main : 'transparent'}
            >
              {isOut ? <Image alt="chip out" src="/imgs/chips/chip_aptos_out.svg" width="50px" height="50px" /> : <Image alt="chip" src="/imgs/chips/chip_aptos.svg"  width="50px" height="50px" />}
              <Text
                fontWeight="800"
                fontSize="16px"
                lineHeight="16px"
                color={chip.isSelected ? color.text.secondary : (isOut ? '#757575' : color.text.primary)}
              >
                {chip.amount.toLocaleString()}
              </Text>
              <Text
                mt='4px'
                fontWeight="500"
                fontSize="14px"
                lineHeight="18px"
                color={chip.isSelected ? color.text.secondary : color.text.primary}
              >
                {chip.unit}
              </Text>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default GameHeader;