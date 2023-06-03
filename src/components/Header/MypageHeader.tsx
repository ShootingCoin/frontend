import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { color } from "@comps/styles/common.style";
import HeaderHead from "./HeaderHead";
import Image from "next/image";

interface Props {
  balance: number;
}

export default function MypageHeader({ balance }: Props) {
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
        <Image
          alt="profile"
          src="/imgs/profile.svg"
          width="65"
          height="65"
        />
        <Box ml="20px" display="flex" alignItems="center" fontWeight="700">
          <Text fontSize="30px" lineHeight="36px" float="left">
            $
          </Text>
          <Text ml="20px" py="3px" float="right" fontSize="25px" lineHeight="30px">
            {balance.toLocaleString()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
