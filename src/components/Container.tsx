import { Container as Box } from "@chakra-ui/react";
import React from "react";

export default function Container({ children }) {
  return (
    <Box
      p={0}
      maxW="500px"
      minH="100vh"
      w="100%"
      display="flex" 
      alignItems="center" 
      justifyContent="center"
    >
      {children}
    </Box>
  )
};