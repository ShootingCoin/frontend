import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MypageHeader } from '@comps/Header';
import { Assets, History, Navigator, NFTList } from '@comps/Mypage';
import { MypageNavigatorEnum } from 'src/types';
import { Container } from '@comps/common';
import useWallet from 'src/hooks/useWallet';
import { chainId } from 'src/constants';
import { STCAddress } from 'src/contracts/Coin';
import { useBalance } from 'wagmi';
import { tokenPriceState } from 'src/recoil/token';
import { useRecoilValue } from 'recoil';

export default function mypage() {
  const { query, push } = useRouter();
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
  const [current, setCurrent] = useState<MypageNavigatorEnum>(MypageNavigatorEnum.Assets);
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

  useEffect(() => {
    if (
      query.category 
      && (query.category === MypageNavigatorEnum.Assets
      || query.category === MypageNavigatorEnum.History
      || query.category === MypageNavigatorEnum.NFT)
    ) {
      setCurrent(query.category);
    }
  }, [query]);

  return (
    <>
      <Head>
        <title>Shooting coin: Mypage</title>
      </Head>
      <Container>
        {!(isSTCLoading || isPolygonLoading || isSTCError || isPolygonError) && (
          <>
            <MypageHeader balance={balance} />
            <Navigator current={current} onSelect={(val) => { push({ query: { category: val } }); }} />
            {current === MypageNavigatorEnum.Assets && <Assets assets={assets} />}
            {current === MypageNavigatorEnum.History && <History />}
            {current === MypageNavigatorEnum.NFT && <NFTList />}
          </>
        )}
      </Container>
    </>
  );
};