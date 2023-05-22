import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MypageHeader } from '@comps/Header';
import { Assets, History, Navigator, NFTList } from '@comps/Mypage';
import { MypageNavigatorEnum } from 'src/types';
import { Container } from '@comps/common';
import { assets } from 'src/dummy';

export default function mypage() {
  const { query, push } = useRouter();
  const [current, setCurrent] = useState<MypageNavigatorEnum>(MypageNavigatorEnum.Assets);
  const balance = assets.map(x => x.price).reduce((x, acc) => acc + x);

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
        <MypageHeader account='0xfs312a2f3E829C0b614566B3E152e417d14q6EP3' balance={balance} />
        <Navigator current={current} onSelect={(val) => { push({ query: { category: val } }); }} />
        {current === MypageNavigatorEnum.Assets && <Assets />}
        {current === MypageNavigatorEnum.History && <History />}
        {current === MypageNavigatorEnum.NFT && <NFTList />}
      </Container>
    </>
  );
};