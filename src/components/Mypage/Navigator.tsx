import { Box } from "@chakra-ui/react";
import React from "react";
import { MypageNavigatorEnum } from "~/src/types";

interface Props {
  current: MypageNavigatorEnum;
  onSelect: (val: MypageNavigatorEnum) => void;
}

function name(value: MypageNavigatorEnum) {
  switch (value) {
    case MypageNavigatorEnum.Assets: return 'Assets';
    case MypageNavigatorEnum.History: return 'History';
    case MypageNavigatorEnum.NFT: return 'NFT';
  };
};

export default function Navigator({ current, onSelect }: Props) {
  return (
    <Box as="nav" borderBottom="1px solid #515151" textAlign="center">
      {[
        MypageNavigatorEnum.Assets, 
        MypageNavigatorEnum.History, 
        MypageNavigatorEnum.NFT
      ].map(x => (
        <Box 
          key={x}
          as="button"
          type="button"
          onClick={() => current !== x ? onSelect(x) : {}}
          p="13px 26px"
          color={current === x ? '#fff' : '#6F6F6F'}
          fontWeight="500"
          fontSize="17px"
          lineHeight="20px"
        >
          {name(x)}
        </Box>
      ))}
    </Box>
  );
};
