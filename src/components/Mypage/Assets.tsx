import { Box, Text } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import useLayoutConfig from "src/hooks/useLayoutConfig";
import ContentWrapper from "./ContentWrapper";

export default function Assets({ assets }) {
  const { contentAreaHeight } = useLayoutConfig();
  
  return (
    <ContentWrapper maxHeight={contentAreaHeight} overflow="scroll">
      <Box mt="9px" color="#fff" height="fit-content">
        {assets.map((asset, i) => (
          <Box key={`${asset.name}_${i}`} display="flex" alignItems="center" p="15px 24px">
            <Image alt={asset.name} src={`/imgs/coins/${asset.name}.svg`} width="44px" height="44px" />
            <Box ml="12px">
              <Text fontWeight={700} fontSize="20px" lineHeight="26px">
                {asset?.name}
              </Text>
              <Text mt="4px" fontWeight={500} fontSize="16px" lineHeight="16px">
                {asset?.symbol}
              </Text>
            </Box>
            <Box ml="auto" textAlign="right">
              <Text fontWeight={700} fontSize="20px" lineHeight="26px">
                {asset?.formatted}
              </Text>
              <Text mt="4px" fontWeight={500} fontSize="16px" lineHeight="16px">
                $ {asset?.price?.toLocaleString() || 0}
              </Text>
            </Box>
          </Box>
        ))}
      </Box>
    </ContentWrapper>
  );
};
