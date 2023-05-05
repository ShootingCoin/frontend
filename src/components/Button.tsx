import React from 'react';
import { Button as Btn } from '@chakra-ui/react';

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const Button = ({
  children,
  disabled=false,
  isLoading=false,
  onClick,
  ...rest
}: Props & React.CSSProperties) => {
  const background = disabled ? "#78E7FF80" : "#78E7FF";
  return (
    <Btn
      type="button"
      disabled={disabled}
      isLoading={isLoading}
      onClick={onClick}
      maxW="260px"
      w="100%"
      h="60px"
      fontWeight="700"
      fontSize="20px"
      lineHeight="24px"
      color="#000"
      bgColor={background}
      borderRadius="7px"
      sx={rest}
      _hover={{ bg: background }}
      _active={{ bg: background }}
      _focus={{ bg: background }}
    >
      {children}
    </Btn>
  )
};

export default Button;