import { Box, keyframes } from "@chakra-ui/react";
import React from "react";
import { color } from "./styles/common.style";

interface Props {
  size?: number;
}

const animation = keyframes`
  0%   { transform: rotate(25deg);  }
  30%   { transform: rotate(95deg);  }
  100% { transform: rotate(385deg); }
`

export default function Spinner({ size=23,  }: Props) {
  return (
    <Box
      w={`${size}px`}
      h={`${size}px`}
      borderWidth={`${size / 8}px`}
      borderStyle="solid"
      borderTopColor={color.primary.main}
      borderBottomColor="#FFFFFF80"
      borderLeftColor="#FFFFFF80"
      borderRightColor="#FFFFFF80"
      borderRadius="99px"
      animation={`1s ${animation} linear infinite`}
    />
  );
};