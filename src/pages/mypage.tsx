import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { MypageHeader } from '@comps/Header';
import { Assets, History, Navigator } from '@comps/Mypage';
import { MypageNavigatorEnum } from '../types';
import { Container } from '@comps/common';

export default function mypage() {
  const { query, push } = useRouter();
  const [current, setCurrent] = useState<MypageNavigatorEnum>(MypageNavigatorEnum.Assets);

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
        <title>Shooting coin: mypage</title>
      </Head>
      <Container>
        <MypageHeader account='0xfs312a2f3E829C0b614566B3E152e417d14q6EP3' balance={23.45} />
        <Navigator current={current} onSelect={(val) => { push({ query: { category: val } }); }} />
        {current === MypageNavigatorEnum.Assets && <Assets />}
        {current === MypageNavigatorEnum.History && <History />}
      </Container>
    </>
  );
};