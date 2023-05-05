import { Box, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { CardTypeEnum } from '~/src/types';

interface Props {
  type: CardTypeEnum;
  isSelected: boolean;
  onClick: () => void;
}

export default function RoomCard({ type, isSelected, onClick }: Props) {
  const content = useMemo(() => {
    switch (type) {
      case CardTypeEnum.Gold:
        return {
          bg: 'radial-gradient(50% 50% at 50% 50%, #FFBE16 0%, #F1FF7A 100%)',
          title: <>Golden<br/>Room</>,
          description: 'High-priced room',
          price: '40-50'
        };
      case CardTypeEnum.Silver:
        return {
          bg: 'radial-gradient(50% 50% at 50% 50%, #606060 0%, #A3A3A3 100%)',
          title: <>Silver<br/>Room</>,
          description: 'Middle-priced room',
          price: '20-40'
        };
      case CardTypeEnum.Friend:
        return {
          bg: 'radial-gradient(50% 50% at 50% 50%, rgba(179, 130, 50, 1) 0%, rgba(229, 212, 153, 1) 100%)',
          title: <>Play With<br/>Friends</>,
          description: 'Low-priced room',
          price: '10-20'
        };
      default:
        return {
          bg: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 151, 151, 1) 0%, rgba(255, 255, 255, 1) 100%)',
          title: <>Bronze<br/>Room</>,
          description: 'Low-priced room',
          price: '10-20'
        };
    }
  }, [type]);
  return (
    <Box
      onClick={onClick}
      p={isSelected ? "18.5px 14.5px" : "20px 16px"}
      w="100%"
      minH="213px"
      bg={
        type === CardTypeEnum.Gold ?
          'rgba(202, 192, 103, 0.32)'
          : 'radial-gradient(50% 50% at 50% 50%, rgba(90, 90, 90, 0.42) 0%, rgba(216, 216, 216, 0.42) 100%)'
      }
      {...isSelected ? {
        border: '2px solid #8BF8FF',
        boxShadow: '0px 0px 17px #8BF8FF',
        backdropFilter: 'blur(7px)',

      } : {
        border: '0.5px solid rgba(255, 255, 255, 0.44)'
      }}
      borderRadius="14px"
      color={isSelected ? '#fff' : 'rgba(255, 255, 255, 0.4)'}
    >
      <Box
        w="57px"
        h="57px"
        borderRadius="99px"
        bg={content.bg}
        opacity={isSelected ? 1 : 0.4}
       />
      <Text mt="14px" fontWeight="700" fontSize="18px" lineHeight="21px">
        {content.title}
      </Text>
      <Text mt="32px" fontWeight="500" fontSize="13px" lineHeight="16px">
        {content.description}
      </Text>
      <Text mt="7px" fontWeight="500" fontSize="13px" lineHeight="16px">
        $ {content.price}
      </Text>
    </Box>
  );
};
