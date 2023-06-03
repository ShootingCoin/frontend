import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { color } from "@comps/styles/common.style";
import { useRouter } from "next/router";
import Image from "next/image";
import useWallet from "src/hooks/useWallet";
import { reduceHashString } from "src/utils";
import { WalletConnectModal } from "../Modal";
import { Button } from "../common";
import { useBalance } from "wagmi";
import { chainId } from "src/constants";
import { STCAddress } from "src/contracts/Coin";
import { useRecoilValue } from "recoil";
import { tokenPriceState } from "src/recoil/token";

const HomeHeader = () => {
  const router = useRouter();
  const { address } = useWallet();
  const { data: STC, isLoading: isSTCLoading, isError: isSTCError } = useBalance({
    address: address as `0x${string}`,
    chainId: chainId,
    token: STCAddress,
  });
  const { data: Polygon, isLoading: isPolygonLoading, isError: isPolygonError } = useBalance({
    address: address as `0x${string}`,
    chainId: chainId,
  });
  const tokenPrice = useRecoilValue(tokenPriceState);
  const [showModal, setShowModal] = useState(false);
  const assets = [{ 
    name: 'Polygon',
    price: Number(Polygon?.formatted) * tokenPrice?.MATIC,
    ...Polygon
  }, {
    name: 'STC',
    price: Number(STC?.formatted) * tokenPrice?.STC,
    ...STC
  }];
  const balance = assets.map(x => x.price).reduce((cur, acc) => cur + acc);

  if (isSTCLoading || isPolygonLoading || isSTCError || isPolygonError) return <></>;
  return (
    <>
    {!address && showModal && (
      <WalletConnectModal onClose={() => setShowModal(false)} />
    )}
    <Box 
      as="header"
      p="18px 20px" 
      display="flex" 
      alignItems="center" 
      w="100%"
      bg={color.background.header}
      borderBottom="1px solid #515151"
    >
      {address ? (
        <>
          <Box
            mr="8px"
            height="36px"
            onClick={() => router.push('/mypage')}
          >
            <Image
              alt="profile"
              src="/imgs/profile.svg"
              width="36"
              height="36"
            />
          </Box>
          <Text
            mr="auto"
            color="white"
            fontWeight="700"
            fontSize="20px"
            lineHeight="26px"
            letterSpacing="0.2%"
          >
            {reduceHashString(address)}
          </Text>
          <Text
            fontWeight="700"
            fontSize="20px"
            lineHeight="1.3"
            color="#fff"
          >
            $ {balance.toLocaleString()}
          </Text>
        </>
      ) : (
        <>
          <Image
            alt="logo"
            src="/imgs/logo.svg"
            width="40"
            height="40"
          />
          <Text
            ml="6px"
            fontWeight="700"
            fontSize="20px"
            lineHeight="1.3"
            color="#fff"
            letterSpacing="0.2%"
          >
            ShootingCoin
          </Text>
          <Button

            onClick={() => setShowModal(true)}
            marginLeft="auto"
            width="130px"
            height="40px"
            fontWeight="600"
            fontSize="16px"
          >
            Connect Wallet
          </Button>
        </>
      )}
    </Box>
    </>
  );
};

export default HomeHeader;