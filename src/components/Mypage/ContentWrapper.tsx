import React from "react";
import { Box } from "@chakra-ui/react";
import { color } from "@comps/styles/common.style";

export default function ContentWrapper({ children, ...rest }: React.CSSProperties & { children: React.ReactNode }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      color={color.text.primary}
      flex="1"
      sx={{
        '&::-webkit-scrollbar': { display: 'none' },
        ...rest
      }}
    >
      {children}
    </Box>
  )
};
