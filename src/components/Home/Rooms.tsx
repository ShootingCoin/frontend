import { Box } from "@chakra-ui/react";
import React from "react";
import { CardTypeEnum } from "~/src/types";
import RoomCard from "./RoomCard";

interface Props {
  selected: CardTypeEnum;
  onSelect: (val: CardTypeEnum) => void;
};

export default function Rooms({ selected, onSelect }: Props) {
  return (
    <Box
      my="auto"
      padding="40px 20px"
      display="grid"
      gridTemplateColumns="1fr 1fr"
      gap="24px 16px"
    >
      <RoomCard 
        type={CardTypeEnum.Gold} 
        isSelected={selected === CardTypeEnum.Gold} 
        onClick={() => onSelect(CardTypeEnum.Gold)}
      />
      <RoomCard 
        type={CardTypeEnum.Silver} 
        isSelected={selected === CardTypeEnum.Silver} 
        onClick={() => onSelect(CardTypeEnum.Silver)}
      />
      <RoomCard 
        type={CardTypeEnum.Bronze} 
        isSelected={selected === CardTypeEnum.Bronze} 
        onClick={() => onSelect(CardTypeEnum.Bronze)}
      />
      <RoomCard 
        type={CardTypeEnum.Friend} 
        isSelected={selected === CardTypeEnum.Friend} 
        onClick={() => onSelect(CardTypeEnum.Friend)}
      />
    </Box>
  );
};
