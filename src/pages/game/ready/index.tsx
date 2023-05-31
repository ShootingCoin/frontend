
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { GameHeader } from "~/src/components/Header";
import { TokenForm } from "~/src/components/Setting";
import { CardTypeEnum, Chip } from "~/src/types";
import { color } from "src/components/styles/common.style";
import { Button, Container, Switch } from '@comps/common';
import { NFTCarousel } from "src/components/Mypage";
import { defaultChips } from "src/dummy";
import { useRecoilValue } from "recoil";
import { matchIdState, uuidState } from "src/recoil/socket";
import api from "src/api";
import useLoading from "src/hooks/useLoading";

export default function ReadyPage() {
  const { query, push } = useRouter();
  const { setIsLoading, LoadingDialog } = useLoading();
  const uuid = useRecoilValue(uuidState);
  const matchId = useRecoilValue(matchIdState);
  const [current, setCurrent] = useState(0);
  const [chips, setChips] = useState<Chip[]>(defaultChips);
  const [isShow, setIsShow] = useState(false);

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

  const handleClickReady = async () => {
    if (uuid) {
      setIsLoading(true);
      await api.match(1000, uuid);
    }
  };

  useEffect(() => {
    setChips(chips.map((x, i) => ({ ...x, isSelected: current === i })));
  }, [current]);

  useEffect(() => {
    if (matchId) {
      setIsLoading(false);
      push(`/game/${matchId}/setting`);
    }
  }, [matchId]);

  return (
    <>
      <Head>
        <title>Shooting coin: Ready</title>
      </Head>
      <LoadingDialog />
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
            selectedCoin={chips.find(x => x.isSelected)?.name || 'STC'}
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
        <Box mt="48px" mx="20px" display="flex" alignItems="center">
          <Text mr="auto" color="#fff" fontWeight="700" fontSize="20px" lineHeight="26px">
            Select NFTSkin
          </Text>
          <Switch onChange={(e) => setIsShow(e.target.checked)} />
        </Box>
        <Box {...!isShow && { opacity: '0', pointerEvents: 'none' }}>
          <NFTCarousel />
        </Box>

        <Button
          onClick={handleClickReady}
          margin="44px auto 32px auto"
        >
          Go to placement
        </Button>
      </Container>
    </>
  );
};
