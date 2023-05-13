import React from "react";
import { Box } from "@chakra-ui/react";
import Head from "next/head";
import { Container } from "src/components/common";
import { color } from "src/components/styles/common.style";
import { HeaderHead } from "src/components/Header";
import { NFTCarousel } from "src/components/Mypage";
import { useRouter } from "next/router";
import Image from "next/image";

export default function MyNFTPage() {
  const { query } = useRouter();

  return (
    <>
      <Head>
        <title>Shooting coin: My NFT</title>
      </Head>
      <Container>
        <Box 
          as="header"
          bg={color.background.header}
          borderBottom="1px solid #515151"
        >
          <HeaderHead title="My NFT" returnUrl="/mypage?category=nft" />
        </Box>
        <Box mt="55px">
          <NFTCarousel initialShow={Number(query.id)} />
        </Box>

        <Box mt="auto" position="relative">
          <Box position="relative" w="100%" pb="calc(100% * 692 / 884)">
            <Image
              alt="button-hover-background"
              src="/imgs/img_nft_button_hover.png"
              layout="fill"
            />
          </Box>
          <Box
            position="absolute"
            w="30vw"
            h="30vw"
            maxW="150px"
            maxH="150px"
            bg="#DE9CFF"
            borderRadius="50%"
            top="25%"
            left="50%"
            transform="translate(-50%, 0)"
            animation="1s hover ease-in-out infinite alternate"
            sx={{
              '@keyframes hover': {
                from: { transform: 'translate(-50%, -5%)' },
                to: { transform: 'translate(-50%, 5%)' },
              }
            }}
          />
        </Box>
      </Container>
    </>
  );
};
