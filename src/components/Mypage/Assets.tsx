import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import ContentWrapper from "./ContentWrapper";

const assets = [
  {
    name: 'Ethereum',
    unit: 'ETH',
    amount: 23.43,
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 1000,
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 232,
  },
];

export default function Assets() {
  return (
    <ContentWrapper>
      <Box mt="36px">
        {assets.map((asset, i) => (
          <Box key={`${asset.name}_${i}`} display="flex" alignItems="center" p="12px 32px">
            <Image alt={asset.name} src={`/imgs/coins/${asset.name}.svg`} width="40px" height="40px" />
            <Text mx="20px" fontWeight="500" fontSize="18px" lineHeight="21px">
              {asset.name}
            </Text>
            <Text
              ml="auto"
              fontWeight="600"
              fontSize="20px"
              lineHeight="24px"
              sx={{
                '& span': {
                  fontWeight: '300',
                  fontSize: '14px',
                  lineHeight: '17px',
                }
              }}
            >
              {asset.amount}&nbsp;&nbsp;
              <span>{asset.unit}</span>
            </Text>
          </Box>
        ))}
      </Box>
    </ContentWrapper>
  );
};
