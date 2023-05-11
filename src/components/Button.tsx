import React from 'react';
import { Button as Btn } from '@chakra-ui/react';
import Spinner from './Spinner';
import { color } from './styles/common.style';

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
  const background = (disabled || isLoading) ? `${color.primary.main}80` : color.primary.main;
  return (
    <Btn
      type="button"
      disabled={disabled || isLoading}
      onClick={onClick}
      maxW="260px"
      w="100%"
      h="60px"
      fontWeight="800"
      fontSize="18px"
      lineHeight="24px"
      color="#fff"
      bgColor={background}
      borderRadius="7px"
      sx={rest}
      _hover={{ bg: background }}
      _active={{ bg: background }}
      _focus={{ bg: background }}
    >
      {!isLoading ? children : (
        <Spinner size={47} />
      )}
    </Btn>
  )
};

export default Button;