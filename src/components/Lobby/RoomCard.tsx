import { Box, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { limit } from 'src/constants';
import { CardTypeEnum } from '~/src/types';

interface Props {
  type: CardTypeEnum;
  isSelected: boolean;
  width?: number;
}

export default function RoomCard({ type, isSelected, width=236 }: Props) {
  const content = useMemo(() => {
    switch (type) {
      case CardTypeEnum.Challenger:
        return {
          bg: 'radial-gradient(50% 50% at 90% 100%,#A64F33 0%, #FFD8D877 71.44%, transparent 100%), radial-gradient(50% 50% at 90% 100%,#FF8F8855 80%, transparent 150%)',
          title: <>Challenger<br/>Room</>,
          description: 'High-priced room',
          price: `${limit.challenger.min.toLocaleString()} - ${limit.challenger.max.toLocaleString()}`
        };
      case CardTypeEnum.Master:
        return {
          bg: 'radial-gradient(50% 50% at 90% 100%,#00A110 0%, #FFFFFF77 61.44%, transparent 100%), radial-gradient(50% 50% at 90% 100%,#88FFC655 80%, transparent 150%)',
          title: <>Master<br/>Room</>,
          description: 'High-priced room',
          price: `${limit.master.min.toLocaleString()} - ${limit.master.max.toLocaleString()}`
        };
      case CardTypeEnum.Diamond:
        return {
          bg: 'radial-gradient(50% 50% at 90% 100%,#4C91E2 0%, #FFFFFF77 71.44%, transparent 100%), radial-gradient(50% 50% at 90% 100%,#88D4FF55 80%, transparent 150%)',
          title: <>Dia<br/>Room</>,
          description: 'High-priced room',
          price: `${limit.diamond.min.toLocaleString()} - ${limit.diamond.max.toLocaleString()}`
        };
      case CardTypeEnum.Platinum:
        return {
          bg: 'radial-gradient(50% 50% at 90% 100%,#3F4369 0%, #CAD9FFA1 71.44%, transparent 100%), radial-gradient(50% 50% at 90% 100%,#CBCBCB55 80%, transparent 150%)',
          title: <>Platinum<br/>Room</>,
          description: 'High-priced room',
          price: `${limit.platinum.min} - ${limit.platinum.max.toLocaleString()}`
        };
      case CardTypeEnum.Gold:
        return {
          bg: 'radial-gradient(50% 50% at 90% 100%,#FFBE16 0%, #F1FF7A77 71.44%, transparent 100%), radial-gradient(50% 50% at 90% 100%,#FFE34E55 80%, transparent 150%)',
          title: <>Golden<br/>Room</>,
          description: 'High-priced room',
          price: `${limit.gold.min} - ${limit.gold.max}`
        };
      case CardTypeEnum.Silver:
        return {
          bg: 'radial-gradient(50% 50% at 90% 100%,#525252 0%, #D7D7D777 71.44%, transparent 100%), radial-gradient(50% 50% at 90% 100%,#CBCBCB55 80%, transparent 150%)',
          title: <>Silver<br/>Room</>,
          description: 'A Low-Priced Room',
          price: `${limit.silver.min} - ${limit.silver.max}`
        };
      default:
        return {
          bg: 'radial-gradient(50% 50% at 90% 100%,#593407 0%, #8A705DA1 71.44%, transparent 100%), radial-gradient(50% 50% at 90% 100%,#FFAD4E55 30%, transparent 150%)',
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
      backdropBlur="20px"
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
        {content.price.length > 0 ? `$ ${content.price}`: ''}
      </Text>
    </Box>
  );
};
