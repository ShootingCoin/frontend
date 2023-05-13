import React from 'react';
import { Box, Grid, GridItem, Text } from '@chakra-ui/react';
import { nftData } from 'src/dummy';
import { color } from '../styles/common.style';
import ContentWrapper from './ContentWrapper';
import useLayoutConfig from 'src/hooks/useLayoutConfig';
import { useRouter } from 'next/router';

export default function NFTList() {
  const router = useRouter();
  const { contentAreaHeight } = useLayoutConfig();

  return (
    <ContentWrapper padding="32px 24px" maxHeight={contentAreaHeight} overflow="scroll">
      <Grid gridTemplateColumns="repeat(2, 1fr)" gap="16px 14px">
        {nftData.map((nft, idx) => (
          <GridItem
            key={`mypage-nft-list-${nft.id}-${nft.code}`}
            onClick={() => router.push({
              pathname: '/mypage/nft',
              query: {
                id: nft.id,
              }
            })}
            position="relative"
            bg="#6f6f6f"
            borderRadius="11px"
            overflow="hidden"
          >
            <img alt={`nft image ${idx}`} src={nft.image} />
            <Box 
              p="12px 12px 6px 12px"
              position="absolute" 
              bottom="0" 
              left="0"
              w="100%"
              background="linear-gradient(180deg, rgba(148, 148, 148, 0) 0%, rgba(78, 77, 77, 0.418919) 16.15%, #434343 100%)"
            >
              <Text
                color={color.text.primary}
                fontWeight="500"
                fontSize="14px"
                lineHeight="18px"
              >
                {nft.code}
              </Text>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </ContentWrapper>
  );
};
