import { Box, Text } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Button, Container } from "src/components/common";
import { color } from "src/components/styles/common.style";

const data = {
  status: 'lose', 
  amount: 234.09,
  unit: 'ETH',
  price: 127433.433,
};

export default function ResultPage() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Shooting coin: You {data.status === 'win' ? 'Win' : 'Lose'}</title>
      </Head>
      <Container>
        <Box
          position="relative"
          w="100%"
          pt="100%"
        >
          <Image
            {...data.status === 'win' ? { 
              alt: 'result image - win',
              src: '/imgs/img_result_win.svg'
            }: {
              alt: 'result image - lose',
              src: '/imgs/img_result_lose.svg'
            }}
            layout="fill"
          />
        </Box>
        <Box m="32px" textAlign="center">
          <Text fontWeight="500" fontSize="20px" lineHeight="24px" color={color.text.teritary}>
            {data.status === 'win' ? 'You got' : 'You lost'}
          </Text>
          <Text mt="4px" fontWeight="700" fontSize="28px" lineHeight="40px" color={color.text.primary}>
            {data.amount.toLocaleString()} {data.unit}
          </Text>
          <Text mt="4px" fontWeight="500" fontSize="20px" lineHeight="24px" color={color.text.primary}>
            $ {data.price.toLocaleString()}
          </Text>
        </Box>

        <Box m="auto 24px 24px 36px">
          <Button onClick={() => router.push('/lobby')} fullWidth>
            Back to home
          </Button>
        </Box>
      </Container>
    </>
  )
};
