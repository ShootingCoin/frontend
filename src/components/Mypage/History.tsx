import React, { useEffect, useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ContentWrapper from "./ContentWrapper";
import useLayoutConfig from "src/hooks/useLayoutConfig";
import Image from "next/image";
import { HistoryType } from "src/types";
import { HistoryModal } from "../Modal";
import dayjs from "dayjs";
import { useContract, useSigner } from "wagmi";
import { abi, contractAddress } from "src/contracts/Manager";
import useWallet from "src/hooks/useWallet";

export default function History() {
  const { contentAreaHeight } = useLayoutConfig();
  const { address } = useWallet();
  const { data: signer } = useSigner({
    chainId: 80001,
  });
  const contract = useContract({
    address: contractAddress,
    abi: abi,
    signerOrProvider: signer,
  });

  const [selected, setSelected] = useState<HistoryType|null>(null);
  const [histories, setHistories] = useState<HistoryType[]>([]);
  const [isModal, setIsModal] = useState(false);

  useEffect(() => {
    if (address && contract && signer) {
      const getNft = async () => {
        const result = await contract.getHistory(address);
        setHistories(result);
      };
      getNft();
    }
  }, [address, contract]);
  return (
    <>
    <HistoryModal {...selected} account={address} open={isModal} onClose={() => setIsModal(false)}/>
    <ContentWrapper padding="24px" maxHeight={contentAreaHeight} overflow="scroll">
      <Box height="fit-content">
        {histories.map((history, i) => {
          const accountIdx = history.user1 === address ? 'user1' : 'user2';
          const amount = history[`${accountIdx}GetAmount`];
          const status = amount > 0 ? 'win' : 'lose';
          return (
            <Box
              key={`history ${i}`}
              onClick={() => {
                setSelected(history);
                setIsModal(true);
              }}
              mb="16px"
              px="4px"
              display="flex"
              borderRadius="12px"
              overflow="hidden"
              bg="#1C2241"
            >
              <Box mr="auto" p="19px 17px">
                <Text 
                  fontWeight={700} 
                  fontSize="18px" 
                  lineHeight="26px" 
                  letterSpacing="0.2%" 
                  color={status === 'win' ? '#6CD3FF' : '#FF7171'}
                >
                  You {status === 'win' ? 'got' : 'lost'}
                </Text>
                <Text
                  mt="4px"
                  fontWeight={700} 
                  fontSize="20px" 
                  lineHeight="26px" 
                  letterSpacing="0.2%" 
                >
                  {Math.abs(amount)} {'MATIC'}
                </Text>
                <Text mt="6px" fontWeight={500} fontSize="14px" lineHeight="18px">
                  {dayjs(history.timeStamp * 1000).format('YYYY.MM.DD')}
                </Text>
              </Box>
              <Image
                alt={`history-image-${status}`}
                src={`/imgs/img_result_${status}_sm.svg`}
                width={120}
                height={118}
              />
            </Box>
          );
        })}
      </Box>
    </ContentWrapper>
    </>
  );
};
