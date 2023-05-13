import React from 'react';
import { Button as Btn } from '@chakra-ui/react';
import { Spinner } from "@comps/common";
import { color } from '@comps/styles/common.style';

interface Props {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick: () => void;
};

const Button = ({
  children,
  disabled=false,
  isLoading=false,
  onClick,
  fullWidth=false,
  ...rest
}: Props & React.CSSProperties) => {
  const background = rest.background ? `${rest.background}`: ((disabled || isLoading) ? `${color.primary.main}80` : color.primary.main);
  return (
    <Btn
      type="button"
      disabled={disabled || isLoading}
      onClick={onClick}
      {...!fullWidth && { maxW: '260px' }}
      w="100%"
      h="60px"
      fontWeight="800"
      fontSize="18px"
      lineHeight="24px"
      color={color.text.primary}
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