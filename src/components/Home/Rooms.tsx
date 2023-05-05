import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { CardTypeEnum } from "~/src/types";
import RoomCard from "./RoomCard";

export default function Rooms() {
  const [selected, setSelected] = useState<CardTypeEnum>(CardTypeEnum.Gold);
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
        onClick={() => setSelected(CardTypeEnum.Gold)}
      />
      <RoomCard 
        type={CardTypeEnum.Silver} 
        isSelected={selected === CardTypeEnum.Silver} 
        onClick={() => setSelected(CardTypeEnum.Silver)}
      />
      <RoomCard 
        type={CardTypeEnum.Bronze} 
        isSelected={selected === CardTypeEnum.Bronze} 
        onClick={() => setSelected(CardTypeEnum.Bronze)}
      />
      <RoomCard 
        type={CardTypeEnum.Friend} 
        isSelected={selected === CardTypeEnum.Friend} 
        onClick={() => setSelected(CardTypeEnum.Friend)}
      />
    </Box>
  );
};
