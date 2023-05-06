import React from "react";
import { Box } from "@chakra-ui/react";

export default function ContentWrapper({ children, ...rest }: React.CSSProperties & { children: React.ReactNode }) {
  return (
    <Box
      bg="#070213"
      display="flex"
      flexDirection="column"
      color="#fff"
      flex="1"
      sx={rest}
    >
      {children}
    </Box>
  )
};
