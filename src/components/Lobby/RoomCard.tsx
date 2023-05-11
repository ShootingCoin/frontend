import { Box, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { CardTypeEnum } from '~/src/types';

interface Props {
  type: CardTypeEnum;
  isSelected: boolean;
  width?: number;
}

export default function RoomCard({ type, isSelected, width=236 }: Props) {
  const content = useMemo(() => {
    switch (type) {
      case CardTypeEnum.Gold:
        return {
          bg: 'radial-gradient(60% 60% at 90% 90%, #FFBE16 0%, #F1FF7A1A 80%)',
          title: <>Golden<br/>Room</>,
          description: 'High-priced room',
          price: '40-50'
        };
      case CardTypeEnum.Silver:
        return {
          bg: 'radial-gradient(60% 60% at 90% 90%, #606060 0%, #A3A3A31A 80%)',
          title: <>Silver<br/>Room</>,
          description: 'Middle-priced room',
          price: '20-40'
        };
      case CardTypeEnum.Friend:
        return {
          bg: 'radial-gradient(60% 60% at 90% 90%, rgba(179, 130, 50, 1) 0%, rgba(229, 212, 153, 0.1) 80%)',
          title: <>Play With<br/>Friends</>,
          description: 'Low-priced room',
          price: '10-20'
        };
      default:
        return {
          bg: 'radial-gradient(60% 60% at 90% 90%, rgba(255, 151, 151, 1) 0%, rgba(255, 255, 255, 0.1) 80%)',
          title: <>Bronze<br/>Room</>,
          description: 'STC Token Room',
          price: 'Free'
        };
    }
  }, [type]);
  return (
    <Box
      p={isSelected ? "18.5px 14.5px" : "20px 16px"}
      minW={`${width}px`}
      minH="304px"
      bg={`radial-gradient(92.22% 92.22% at 50% 50%, rgba(252, 252, 252, 0.0462) 0%, rgba(252, 252, 252, 0.21) 65.27%), ${content.bg}`}
      {...!isSelected && {
        transform: 'perspective(600px) translateZ(-100px)'
      }}
      borderRadius="20px"
      transition="0.5s"
      color="#fff"
      boxShadow="inset -1px 2px 1px rgba(255, 255, 255, 0.25)"
    >
      <Text mt="14px" fontWeight="700" fontSize="32px" lineHeight="40px">
        {content.title}
      </Text>
      <Text mt="24px" fontWeight="500" fontSize="17px" lineHeight="20px">
        {content.description}
      </Text>
      <Text mt="12px" fontWeight="700" fontSize="20px" lineHeight="26px">
        $ {content.price}
      </Text>
    </Box>
  );
};
