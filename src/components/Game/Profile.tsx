import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { reduceAddress } from "~/src/utils";
import { color } from "@comps/styles/common.style";
import Spinner from "../Spinner";

interface Props {
  address?: string;
  img?: string;
  type: 1|2;
  isCurrent?: boolean;
}

export default function Profile({
  address,
  type,
  img,
  isCurrent=false,
}: Props) {
  return (
    <Box w="70px">
      {address ? (
        <>
          <Box
            w="45px"
            h="45px"
            borderRadius="99px"
            background={img ? `url(${img})` : (type === 1 ? "#DE9CFF" : '#FF7A7A')}
            {...isCurrent && {
              border: `3px solid ${color.primary.main}`,
              boxShadow: `0px 0px 8px ${color.primary.main}`,
            }}
            {...type === 2 && {
              ml: 'auto'
            }}
          />
          <Text
            mt="8px"
            fontWeight="300"
            fontSize="13px"
            lineHeight="1.2"
            color="#B0B0B0"
          >
            {reduceAddress(address)}
          </Text>
        </>
      ) : (
        <Box 
          ml="auto"
          p="11px"
          w="45px" 
          h="45px" 
          bgColor="#939393" 
          borderRadius="99px"
        >
          <Spinner/>
        </Box>
      )}
    </Box>
  );
};
