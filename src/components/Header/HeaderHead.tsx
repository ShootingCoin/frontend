import React from "react";
import { color } from "@comps/styles/common.style";
import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import Chevron from 'public/icons/icon-chevron-left.svg';
import ExitIcon from 'public/icons/icon-exit.svg';

interface Props {
  title: string;
  returnUrl: string;
  exitVisible?: boolean;
};

export default function HeaderHead({
  title,
  returnUrl,
  exitVisible=false,
}: Props) {
  return (
    <Box p="16px 24px" display="flex" alignItems="center">
      <Link href={returnUrl} passHref>
        <a>
          <Chevron/>
        </a>
      </Link>
      <Text
        ml="10px"
        mr="auto"
        fontWeight={700}
        fontSize="20px"
        lineHeight="26px"
        color={color.text.primary}
      >
        {title}
      </Text>
      {exitVisible && <ExitIcon/>}
    </Box>
  );
};
