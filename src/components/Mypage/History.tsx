import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import ContentWrapper from "./ContentWrapper";
import useLayoutConfig from "src/hooks/useLayoutConfig";
import Image from "next/image";
import { HistoryType } from "src/types";
import { HistoryModal } from "../Modal";
import dayjs from "dayjs";

const history: Array<HistoryType> = [
  {
    hash: '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3',
    opponent: '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3',
    status: 'win',
    amount: 32.03,
    unit: 'ETH',
    date: new Date(),
  },
  {
    hash: '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3',
    opponent: '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3',
    status: 'win',
    amount: 32.03,
    unit: 'ETH',
    date: new Date(),
  },
  {
    hash: '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3',
    opponent: '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3',
    status: 'lose',
    amount: 32.03,
    unit: 'ETH',
    date: new Date(),
  },
  {
    hash: '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3',
    opponent: '0xfs312a2f3E829C0b614566B3E152e417d14q6EP3',
    status: 'win',
    amount: 32.03,
    unit: 'ETH',
    date: new Date(),
  },
];

export default function History() {
  const [selected, setSelected] = useState<HistoryType|null>(null);
  const [isModal, setIsModal] = useState(false);
  const { contentAreaHeight } = useLayoutConfig();
  return (
    <>
    <HistoryModal {...selected} open={isModal} onClose={() => setIsModal(false)}/>
    <ContentWrapper padding="24px" maxHeight={contentAreaHeight} overflow="scroll">
      <Box height="fit-content">
        {history.map((data, i) => (
          <Box
            key={`history ${i}`}
            onClick={() => {
              setSelected(data);
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
                color={data.status === 'win' ? '#6CD3FF' : '#FF7171'}
              >
                You {data.status === 'win' ? 'got' : 'lost'}
              </Text>
              <Text
                mt="4px"
                fontWeight={700} 
                fontSize="20px" 
                lineHeight="26px" 
                letterSpacing="0.2%" 
              >
                {data.amount} {data.unit}
              </Text>
              <Text mt="6px" fontWeight={500} fontSize="14px" lineHeight="18px">
                {dayjs(data.date).format('YYYY.MM.DD')}
              </Text>
            </Box>
            <Image
              alt={`history-image-${data.status}`}
              src={`/imgs/img_result_${data.status}_sm.svg`}
              width={120}
              height={118}
            />
          </Box>
        ))}
      </Box>
    </ContentWrapper>
    </>
  );
};
