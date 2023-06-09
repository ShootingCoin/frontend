import { Box, Portal, Text } from '@chakra-ui/react';
import React from 'react';
import { HistoryType } from 'src/types';
import { color } from '@comps/styles/common.style';
import dayjs from 'dayjs';
import { reduceHashString } from 'src/utils';
import Image from 'next/image';
import { Button } from '@comps/common';

interface Props {
  account: string;
  open: boolean;
  onClose: () => void;
};

export default function HistoryModal({
  gameId,
  user1,
  user1coinAddress,
  user1GetAmount,
  user2,
  user2coinAddress,
  user2GetAmount,
  timeStamp,
  account,
  open,
  onClose
}: HistoryType & Props) {
  const opponent = user1 === account ? user2 : user1;
  const amount = user1 === account ? user1GetAmount : user2GetAmount;
  const status = amount > 0 ? 'win' : 'lose';
  if (!open) return <></>;
  return (
    <Portal>
      <Box 
        onClick={onClose}
        bg="#000000C2"
        position="fixed"
        top="0"
        left='0'
        right='0'
        bottom='0'
      />
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        p="24px"
        maxWidth="452px"
        w="calc(100% - 48px)"
        bg={color.background.header}
        borderRadius="12px"
      >
        <Text color={color.text.primary} fontWeight={700} fontSize="20px" lineHeight="24px" letterSpacing="0.2%">
          Game Details
        </Text>

        <table style={{ marginTop: '50px' }}>
          <colgroup>
            <col width={81}/>
            <col/>
          </colgroup>
          <tbody>
            <tr>
              <td>
                <Text mb="16px" fontWeight={500} fontSize="16px" lineHeight="16px" color={color.text.teritary}>
                  Play Time
                </Text>
              </td>
              <td>
                <Text mb="16px" fontWeight={500} fontSize="17px" lineHeight="20px" color={color.text.primary}>
                  {dayjs(timeStamp * 1000).format('YYYY.MM.DD')}&nbsp;&nbsp;{dayjs(timeStamp * 1000).format('HH:mm')}
                </Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text mb="16px" fontWeight={500} fontSize="16px" lineHeight="16px" color={color.text.teritary}>
                  Game Id
                </Text>
              </td>
              <td>
                <Text mb="16px" fontWeight={500} fontSize="17px" lineHeight="20px" color={color.primary.main}>
                  {gameId}
                </Text>
              </td>
            </tr>
            <tr>
              <td>
                <Text fontWeight={500} fontSize="16px" lineHeight="16px" color={color.text.teritary}>
                  Opponent
                </Text>
              </td>
              <td>
                <Text fontWeight={500} fontSize="17px" lineHeight="20px" color={color.primary.main}>
                  {reduceHashString(opponent, 8, 6)}
                </Text>
              </td>
            </tr>
          </tbody>
        </table>

        <Box mt="28px" display="flex" alignItems="center">
          <Image
            alt="ethereum"
            src="/imgs/coins/Ethereum.svg"
            width={40}
            height={40}
          />
          <Box ml="12px" color={color.text.primary}>
            <Text fontSize="17px" lineHeight="20px" {...status === 'lose' && { color: color.text.teritary }}>
              {status === 'win' ? 'You got' : 'You lost'}
            </Text>
            <Text mt="4px" fontWeight={700} fontSize="20px" lineHeight="26px" letterSpacing="0.2%">
              {amount} {'MATIC'}
            </Text>
          </Box>
        </Box>
        <Button
          onClick={onClose}
          fullWidth
          marginTop="24px" 
          width="100%"
          background="#2D3247"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.07)"
        >
          OK
        </Button>
      </Box>
    </Portal>
  );
};
