import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { color } from "@comps/styles/common.style";
import HeaderHead from "./HeaderHead";

interface Props {
  account: string;
  balance: number;
}

export default function MypageHeader({ account, balance }: Props) {
  return (
    <Box
      as="header"
      bg={color.background.header}
      color={color.text.primary}
    >
      <HeaderHead title="My Page" returnUrl="/lobby" exitVisible />
      <Box
        p="24px"
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
        <Box ml="20px" display="flex" alignItems="center" fontWeight="700">
          <Text fontSize="30px" lineHeight="36px" float="left">
            $
          </Text>
          <Text ml="20px" py="3px" float="right" fontSize="25px" lineHeight="30px">
            {balance}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
