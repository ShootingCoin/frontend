import { Box, Button, Portal, Text } from '@chakra-ui/react';
import React from 'react';
import { color } from '@comps/styles/common.style';

export default function WalletConnectModal() {
  const buttonList = [
    {
      name: 'MetaMask',
      icon: '/imgs/wallets/metamask.svg',
      onClick: () => {}
    }
  ];
  return (
    <Portal>
      <Box 
        bg="#000000C2"
        position="fixed"
        top="0"
        left='0'
        right='0'
        bottom='0'
      />
      <Box
        position="fixed"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        p="24px"
        maxWidth="452px"
        w="calc(100% - 48px)"
        bg={color.background.header}
        borderRadius="12px"
      >
        <Text pb="16px" fontWeight="700" fontSize="20px" lineHeight="26px" color="white">
          Connect Wallet
        </Text>
        {buttonList.map(btn => (
          <Button
            key={btn.name}
            onClick={btn.onClick}
            leftIcon={<img alt={btn.name} src={btn.icon} />}
            mt="16px"
            w="100%"
            height="64px"
            color={color.text.primary}
            bg="#2D3247"
            fontWeight="800"
            fontSize="18px"
            lineHeight="24px"
          >
            {btn.name}
          </Button>
        ))}
        <Text
          mt="32px"
          fontWeight="500" 
          fontSize="14px" 
          lineHeight="18px" 
          color="#7B8089" 
          sx={{ '& a': { color: color.primary.main } }}
        >
            By connecting a wallet, you agree to<br/>
            Shooting Coin’ <a href="terms-of-service">Term of Service</a> and consent to 
            its <a href="privacy-policy">Privacy Policy</a>
        </Text>
      </Box>
    </Portal>
  );
};
