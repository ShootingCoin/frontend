import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ClipboardIcon from 'public/icons/icon-clipboard.svg';

interface Props {
  account: string;
}

export default function MypageHeader({ account }: Props) {
  return (
    <Box
      as="header"
      p="40px 20px"
      display="flex"
      alignItems="center"
    >
      <Box 
        w="65px"
        h="65px"
        boxSizing="border-box"
        border="2px solid #fff"
        borderRadius="99px"
        bgColor="#DE9CFF"
      >
        <img alt="wallet img" />
      </Box>
      <Box
        as="button"
        type="button"
        onClick={() => {
          window.navigator.clipboard.writeText(account).then(() => alert('Copied!'));
        }}
        ml="20px"
        verticalAlign="middle"
      >
        <Text
          mr="10px"
          fontWeight="700"
          fontSize="22px"
          lineHeight="26px"
          color="#fff"
          float="left"
        >
          {account.slice(0, 5)}...{account.slice(-3, )}
        </Text>
        <ClipboardIcon style={{ margin: '6px 0' }} />
      </Box>
    </Box>
  );
};
