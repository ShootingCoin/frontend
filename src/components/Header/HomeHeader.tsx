import { Box, Text } from "@chakra-ui/react";
import React from "react";

const HomeHeader = () => {
  const balance = 12.35;
  return (
    <Box 
      p="18px 20px" 
      display="flex" 
      alignItems="center" 
      w="100%"
      borderBottom="1px solid #515151"
    >
      <Text
        fontWeight="700"
        fontSize="25px"
        lineHeight="1.2"
        color="#fff"
      >
        $&nbsp;&nbsp;{balance}
      </Text>
      <Box 
        ml="auto"
        w="47px"
        h="47px"
        boxSizing="border-box"
        border="2px solid #fff"
        borderRadius="99px"
        bgColor="#DE9CFF"
      >
        <img alt="wallet img" />
      </Box>
    </Box>
  );
};

export default HomeHeader;