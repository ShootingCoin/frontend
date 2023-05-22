import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { color } from "@comps/styles/common.style";
import { useRouter } from "next/router";
import { assets } from "src/dummy";

const HomeHeader = () => {
  const router = useRouter();
  const balance = assets.map(x => x.price).reduce((x, acc) => acc + x);
  return (
    <Box 
      as="header"
      p="18px 20px" 
      display="flex" 
      alignItems="center" 
      w="100%"
      bg={color.background.header}
      borderBottom="1px solid #515151"
    >
      <Text
        fontWeight="700"
        fontSize="25px"
        lineHeight="1.2"
        color="#fff"
      >
        $&nbsp;&nbsp;{balance.toLocaleString()}
      </Text>
      <Box 
        ml="auto"
        w="47px"
        h="47px"
        boxSizing="border-box"
        border="2px solid #fff"
        borderRadius="99px"
        bgColor="#DE9CFF"
        onClick={() => router.push('/mypage')}
      >
        {/* <img alt="wallet img" /> */}
      </Box>
    </Box>
  );
};

export default HomeHeader;