import { Box } from "@chakra-ui/react";
import React from "react";
import { MypageNavigatorEnum } from "~/src/types";
import { color } from "../styles/common.style";

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
    <Box as="nav" p="20px" bg={color.background.header} borderBottom="1px solid #515151" textAlign="center">
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
          py="12px"
          width="108px"
          color="#fff"
          fontWeight="700"
          fontSize="20px"
          lineHeight="26px"
          {...current === x && {
            bg: '#DCDCDC30',
            borderRadius: '6px'
          }}
        >
          {name(x)}
        </Box>
      ))}
    </Box>
  );
};
