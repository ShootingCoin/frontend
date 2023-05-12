import React, { useState } from 'react';
import { Box, Input, Select, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { color } from '@comps/styles/common.style';

interface Props {
  limit: number;
  defaultValue: number | null;
  onChangeValue: (val: number) => void;
  selectedCoin?: string;
}

export default function TokenForm({
  limit,
  defaultValue,
  onChangeValue,
  selectedCoin,
}: Props) {
  const [isWrong, setIsWrong] = useState(false);
  return (
    <Box
      p="16px 12px 16px 28px"
      position="relative"
      display="flex"
      alignItems="center"
      border="1px solid #fff"
      borderRadius="8px"
    >
      <Input 
        type="number"
        defaultValue={defaultValue}
        onChange={e => {
          const value = Number(e.target.value);
          if (value <= limit) {
            onChangeValue(value);
            if (isWrong) {
              setIsWrong(false);
            }
          } else {
            setIsWrong(true);
          }
        }}
        focusBorderColor="transparent"
        p="0"
        fontWeight="700"
        fontSize="26px"
        lineHeight="31px"
        color={color.text.primary}
        maxW="150px"
        border="none"
        sx={{
          '&:focus': {
            outline: 'none !important',
            border: 'none !important'
          }
        }}
      />
      <Box 
        ml="auto"
        p="6px 6px 6px 14px"
        display="flex"
        bg="#393C3E"
        w="140px"
        borderRadius="5px"
      >
        <Image
          alt={selectedCoin} 
          src={`/imgs/coins/${selectedCoin}.svg`} 
          width="27px" 
          height="27px" 
        />
        <Select 
          defaultValue={selectedCoin}
          focusBorderColor="transparent"
          bg="transparent"
          color="#fff"
          fontWeight="300"
          fontSize="16px"
          lineHeight="19px"
          border="none"
          sx={{
            ml: '11px',
            padding: '0'
          }}
        >
          <option value="Aptos">APT</option>
          <option value="Ethereum">ETH</option>
        </Select>
      </Box>
      {isWrong && (
        <Text
          position="absolute"
          right="0"
          bottom="-20px"
          fontWeight="300"
          fontSize="13px"
          lineHeight="15px"
          color="#FF7676"
        >
          Can't put more than {limit} in
        </Text>
      )}
    </Box>
  );
};

