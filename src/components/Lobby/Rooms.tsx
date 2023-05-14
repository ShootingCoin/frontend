import { Box } from "@chakra-ui/react";
import { throttle } from "lodash";
import React, { useEffect } from "react";
import { CardTypeEnum } from "~/src/types";
import RoomCard from "./RoomCard";

interface Props {
  selected: CardTypeEnum;
  onSelect: (val: CardTypeEnum) => void;
};

const roomTypes = [
  { type: CardTypeEnum.Gold },
  { type: CardTypeEnum.Silver },
  { type: CardTypeEnum.Bronze },
  { type: CardTypeEnum.Friend },
];

const width = 236;

export default function Rooms({ selected, onSelect }: Props) {
  useEffect(() => {
    let idx = roomTypes.find(x => x.type === selected) || 0;
    let isScrolling = false;
    let carousel = document.getElementById('room-carousel');
    const margin = document.body.clientWidth < 500 ? (3 * width - document.body.clientWidth) / 2 : (3 * width - 500) / 2;
    carousel.scrollLeft = margin;

    const onScroll = throttle((e) => {
      e.preventDefault();
      if (!isScrolling) {
        idx = Math.round(carousel.scrollLeft / width);
        if (idx >= roomTypes.length) {
          idx = roomTypes.length - 1;
        }
        onSelect(roomTypes[idx].type);
        carousel.scrollLeft = idx * width + margin;
        isScrolling = true;
      }
      setTimeout(() => {
        isScrolling = false;
      }, 500);
    }, 500);

    carousel.addEventListener('scroll', onScroll);
    return () => {
      carousel.removeEventListener('scroll', onScroll);
    }
  }, []);
  return (
    <Box 
      id="room-carousel"
      mt="52px" 
      display="flex"
      overflowX="scroll"
      transition="1s"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}
    >
      <Box pr={`${width}px`} />
      {roomTypes.map(room => (
        <RoomCard 
          key={room.type}
          type={room.type} 
          isSelected={selected === room.type} 
          width={width}
        />
      ))}
      <Box pr={`${width}px`} />
    </Box>
  );
};
