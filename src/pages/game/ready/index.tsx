
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { GameHeader } from "~/src/components/Header";
import { TokenForm } from "~/src/components/Setting";
import NFTCarousel from "~/src/components/Mypage/NFTCarousel";
import { CardTypeEnum, Chip } from "~/src/types";
import { color } from "src/components/styles/common.style";
import { Button, Container } from '@comps/common';

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
        <Box mt="24px" mx="18px">
          <Text mb="8px" fontWeight="700" fontSize="20px" lineHeight="26px" color={color.text.primary}>
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
          margin="45px auto"
        >
          Go to placement
        </Button>
      </Container>
    </>
  );
};
