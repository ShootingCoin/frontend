import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ContentWrapper from "./ContentWrapper";
import { color } from "@comps/styles/common.style";

const history: {
  status: 'win'|'lose',
  date: Date,
}[] = [
  {
    status: 'win',
    date: new Date(),
  },
  {
    status: 'win',
    date: new Date(),
  },
  {
    status: 'lose',
    date: new Date(),
  },
  {
    status: 'win',
    date: new Date(),
  },
];

export default function History() {
  return (
    <ContentWrapper padding="32px 20px">
      {history.map((data, i) => (
        <Box
          key={`history ${i}`}
          mb="18px"
          display="flex"
          minH="100px"
          border="1px solid #fff"
          borderRadius="7px"
          overflow="hidden"
          bg={data.status === 'win' ? '#203140' : '#3B1422'}
        >
          <Box w="24px" h="inherit" bgColor={data.status === 'win' ? color.primary.main : '#FF5858'} />
          <Box flex='1' display="flex" flexDirection="column">
            <Text 
              m="auto 8px 4px auto"
              fontWeight="300" 
              fontSize="12px" 
              lineHeight="14px"
            >
              {data.date.getDate().toString().padStart(2, '0')}.{data.date.getMonth().toString().padStart(2, '0')}.{data.date.getFullYear()}
            </Text>
          </Box>
        </Box>
      ))}
    </ContentWrapper>
  );
};
