import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import useLayoutConfig from "src/hooks/useLayoutConfig";
import ContentWrapper from "./ContentWrapper";

const assets = [
  {
    name: 'Ethereum',
    unit: 'ETH',
    amount: 23.43,
    price: 3223.444
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 1000,
    price: 3223.444
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 232,
    price: 3223.444
  },
];

export default function Assets() {
  const { contentAreaHeight } = useLayoutConfig();
  return (
    <ContentWrapper maxHeight={contentAreaHeight} overflow="scroll">
      <Box mt="9px" color="#fff" height="fit-content">
        {assets.map((asset, i) => (
          <Box key={`${asset.name}_${i}`} display="flex" alignItems="center" p="15px 24px">
            <Image alt={asset.name} src={`/imgs/coins/${asset.name}.svg`} width="44px" height="44px" />
            <Box ml="12px">
              <Text fontWeight={700} fontSize="20px" lineHeight="26px">
                {asset.name}
              </Text>
              <Text mt="4px" fontWeight={500} fontSize="16px" lineHeight="16px">
                ({asset.unit})
              </Text>
            </Box>
            <Box ml="auto" textAlign="right">
              <Text fontWeight={700} fontSize="20px" lineHeight="26px">
                {asset.amount}
              </Text>
              <Text mt="4px" fontWeight={500} fontSize="16px" lineHeight="16px">
                $ {asset.price}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </ContentWrapper>
  );
};
