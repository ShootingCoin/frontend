import { Box, Portal, Text } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Button } from "../common";
import { color } from "../styles/common.style";

interface Props {
  open: boolean;
  title?: ReactNode;
  description?: ReactNode;
  closeText?: ReactNode;
  exitText?: ReactNode;
  onExit: () => void;
  onClose: () => void;
};

export default function GameExitModal({
  open,
  title=<>Do you really want to<br/>end the game?</>,
  description=<>The lost coins will be given to<br/>the other partygame?</>,
  closeText=<>Staying in the game</>,
  exitText=<>Quit the game</>,
  onExit,
  onClose,
}: Props) {
  if (!open) return <></>;
  return (
    <Portal>
      <Box
        onClick={onClose}
        zIndex="10"
        bg="#000000C2"
        position="fixed"
        top="0"
        left='0'
        right='0'
        bottom='0'
      />
      <Box
        position="fixed"
        zIndex="11"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        p="24px"
        maxWidth="452px"
        w="calc(100% - 48px)"
        color={color.text.primary}
        bg={color.background.header}
        borderRadius="12px"
      >
        <Text fontWeight="700" fontSize="20px" lineHeight="24px">
          {title}
        </Text>
        <Text mt="16px" fontWeight="500" fontSize="17px" lineHeight="20px">
          {description}
        </Text>
        <Button 
          onClick={onClose}
          fullWidth 
          marginTop="24px"
        >
          {closeText}
        </Button>

        <Button 
          onClick={onExit} 
          fullWidth  
          marginTop="12px"
          background="#2D3247"
        >
          {exitText}
        </Button>
      </Box>
    </Portal>
  );
};
