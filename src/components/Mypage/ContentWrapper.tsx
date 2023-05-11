import React from "react";
import { Box } from "@chakra-ui/react";

export default function ContentWrapper({ children, ...rest }: React.CSSProperties & { children: React.ReactNode }) {
  return (
    <Box
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
