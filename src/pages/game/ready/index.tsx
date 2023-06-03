
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import { GameHeader } from "~/src/components/Header";
import { TokenForm } from "~/src/components/Setting";
import { CardTypeEnum } from "~/src/types";
import { color } from "src/components/styles/common.style";
import { Button, Container, Switch } from '@comps/common';
import { NFTCarousel } from "src/components/Mypage";
import { useRecoilState, useRecoilValue } from "recoil";
import { matchIdState, uuidState } from "src/recoil/socket";
import useLoading from "src/hooks/useLoading";
import useWallet from "src/hooks/useWallet";
import { useContract, useSigner } from "wagmi";
import { abi, contractAddress } from "src/contracts/Manager";
import { STCAddress } from "src/contracts/Coin";
import { limit } from "src/constants";
import { chipsState } from "src/recoil/game";
import api from "src/api";

export default function ReadyPage() {
  const { query, push } = useRouter();
  const { setIsLoading, LoadingDialog } = useLoading();
  const { data: signer } = useSigner({
    chainId: 80001,
  });
  const contract = useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: signer,
  });
  const { address } = useWallet();
  const uuid = useRecoilValue(uuidState);
  const matchId = useRecoilValue(matchIdState);
  const [chips, setChips] = useRecoilState(chipsState);
  const [current, setCurrent] = useState(0);
  const [isShow, setIsShow] = useState(false);

  const handleClickReady = async () => {
    if (uuid && address) {
      setIsLoading(true);
      const coinAddress = query.type === 'bronze' ? STCAddress : '0x0'; // 0x0: Polygon
      const hash = await contract.enterGame(
        address,
        [coinAddress, limit[query.type as string]?.min, [0, 0, 0, 0, 0]],
      );
      if (hash) {
        await api.match(limit[query.type as string]?.min, uuid);
      }
      console.log(hash)
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

  useEffect(() => {
    if (query.type) {
      const coinInfo = query.type === 'bronze' ? {
        name: 'STC',
        unit: 'STC',
      } : {
        name: 'Polygon',
        unit: 'MATIC',
      };
      setChips(
        new Array(5).fill({
          ...coinInfo,
          amount: limit[query.type as string]?.min
        }).map((x, i) => { 
          if (i === 0) {
            return {
              ...x,
              isSelected: true
            };
          }
          return x;
        })
      )
    }
  }, [query]);

  return (
    <>
      <Head>
        <title>Shooting coin: Ready</title>
      </Head>
      <LoadingDialog />
      <Container>
        <GameHeader isSelectable onSelect={(val) => setCurrent(val)} />
        <Box mt="24px" mx="18px">
          <Text mb="8px" fontWeight="700" fontSize="20px" lineHeight="26px" color={color.text.primary}>
            Select Token
          </Text>
          <TokenForm
            type={query.type as CardTypeEnum || CardTypeEnum.Bronze}
            defaultValue={chips.find(x => x.isSelected)?.amount || null}
            selectedCoin={chips.find(x => x.isSelected)?.name || 'Polygon'}
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
