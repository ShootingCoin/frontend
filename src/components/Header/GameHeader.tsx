import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Chip } from "~/src/types";
import CheckIcon from 'public/icons/icon-check.svg';
import Image from "next/image";

interface Props {
  chips: Chip[];
  isSelectable?: boolean;
  onSelect?: (val: number) => void;
}

const GameHeader = ({
  chips,
  isSelectable=false,
  onSelect
}: Props) => {
  return (
    <Box
      as="header"
      p="20px 10px"
      display="flex"
      justifyContent="center"
      borderBottom="1px solid #515151"
    >
      {chips.map((chip, i) => (
        <Box 
          key={`${chip.name}_${chip.amount}${chip.unit}_${i}`}
          {...isSelectable && {
            onClick: () => onSelect(i),
          }}
          p="7px"
          position="relative"
          textAlign="center"
          borderRadius="7px"
          bg={chip.isSelected ? '#8BF8FF' : 'transparent'}
        >
          {chip.isSelected && (
            <Box
              position="absolute"
              top="-6px"
              left="-6px"
            >
              <CheckIcon/>
            </Box>
          )}
          {chip.isOut ? <Image alt="chip out" src="/imgs/chips/chip_aptos_out.svg" width="57px" height="57px" /> : <Image alt="chip" src="/imgs/chips/chip_aptos.svg"  width="57px" height="57px" />}
          <Text
            mt="6px"
            fontWeight="700"
            fontSize="16px"
            lineHeight="19px"
            color={chip.isSelected ? '#000' : (chip.isOut ? '#757575' : '#fff')}
          >
            {chip.amount}
          </Text>
          <Text
            fontWeight="500"
            fontSize="11px"
            lineHeight="13px"
            color={chip.isSelected ? '#000' : '#757575'}
          >
            {chip.unit}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default GameHeader;