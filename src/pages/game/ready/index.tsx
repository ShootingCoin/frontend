
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import Container from "~/src/components/Container";
import { GameHeader } from "~/src/components/Header";
import { TokenForm } from "~/src/components/Setting";
import NFTCarousel from "~/src/components/Mypage/NFTCarousel";
import { CardTypeEnum, Chip } from "~/src/types";
import Button from "~/src/components/Button";

const defaultChips: Chip[] = [
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 32,
  },
  {
    name: 'Ethereum',
    unit: 'ETH',
    amount: 0.32,
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 14,
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 7,
  },
  {
    name: 'Aptos',
    unit: 'APT',
    amount: 5.4,
  },
];

export default function ReadyPage() {
  const { query, push } = useRouter();
  const [current, setCurrent] = useState(0);
  const [chips, setChips] = useState<Chip[]>(defaultChips);

  const limit = useMemo(() => {
    if (query.type) {
      switch (query.type) {
        case CardTypeEnum.Gold: return 50;
        case CardTypeEnum.Silver: return 40;
        default: return 20;
      }
    }
    return 20;
  }, [query]);

  useEffect(() => {
    setChips(chips.map((x, i) => ({ ...x, isSelected: current === i })));
  }, [current]);

  return (
    <>
      <Head>
        <title>Shooting coin: Ready</title>
      </Head>
      <Container>
        <GameHeader 
          chips={chips} 
          isSelectable 
          onSelect={(val) => setCurrent(val)} 
        />
        <Box mx="18px">
          <Text mt="22px" fontWeight="700" fontSize="22px" lineHeight="26px" color="#8C8C8C">
            {current === 0 && 'First '}
            {current === 1 && 'Second '}
            {current === 2 && 'Third '}
            {current === 3 && 'Fourth '}
            {current === 4 && 'Fifth '}
            Coin
          </Text>
          <Text my="22px" fontWeight="500" fontSize="16px" lineHeight="19px" color="#fff">
            Select Token
          </Text>
          <TokenForm
            limit={limit}
            defaultValue={chips.find(x => x.isSelected)?.amount || null}
            selectedCoin={chips.find(x => x.isSelected)?.name || 'Aptos'}
            onChangeValue={(val) => {
              setChips(chips.map(x => {
                if (x.isSelected) {
                  return { ...x, amount: val, };
                }
                return x;
              }))
            }}
          />
        </Box>
        <NFTCarousel />

        <Button
          onClick={() => push({ pathname: '/game/ready/position' })}
          margin="64px auto"
        >
          Go to placement
        </Button>
      </Container>
    </>
  );
};
