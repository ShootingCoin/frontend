import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Container from '@comps/Container';
import { MypageHeader } from '@comps/Header';
import { Assets, History, Navigator } from '@comps/Mypage';
import { MypageNavigatorEnum } from '../types';

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
        <MypageHeader account='0xfc960a1de1e0687c7b91bfec9ca0f132b14bf3f2750591dd5c12a389611d4330' balance={23.45} />
        <Navigator current={current} onSelect={(val) => { push({ query: { category: val } }); }} />
        {current === MypageNavigatorEnum.Assets && <Assets />}
        {current === MypageNavigatorEnum.History && <History />}
      </Container>
    </>
  );
};