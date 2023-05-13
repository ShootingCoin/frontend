import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { throttle } from "lodash";
import { color } from "@comps/styles/common.style";
import { nftData } from "src/dummy";

const width = 230;

export default function NFTCarousel({ initialShow }: { initialShow?: number }) {
  const [current, setCurrent] = useState(initialShow || 0);

  
  useEffect(() => {
    let idx = current;
    let isScrolling = false;
    let carousel = document.getElementById('nft-carousel');
    const margin = document.body.clientWidth < 500 ?  (3 * width - document.body.clientWidth) / 2 : (3 * width - 500) / 2;
    carousel.scrollLeft = idx * width + margin;

    const onScroll = throttle((e) => {
      e.preventDefault();
      if (!isScrolling) {
        idx = Math.round(carousel.scrollLeft / width);
        if (idx >= nftData.length) {
          idx = nftData.length - 1;
        }
        setCurrent(nftData[idx].id);
        carousel.scrollLeft = idx * width + margin;
        isScrolling = true;
      }
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }, 1000);

    carousel.addEventListener('scroll', onScroll);
    return () => {
      carousel.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <Box 
      id="nft-carousel"
      py="20px" 
      display="flex"
      overflowX="scroll"
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none'
        },
      }}
    >
      <Box pr={`${width}px`} />
      {nftData.map(nft => (
        <Box
          key={`${nft.name}_${nft.id}`}
          position="relative"
          bg="#6f6f6f"
          borderRadius="13px"
          w={`${width}px`}
          transition="0.5s"
          {...current === nft.id ? {
            boxShadow: '0px 0px 12.4793px 3.3278px rgba(113, 204, 255, 0.5)'
          } : {
            transform: 'perspective(600px) translateZ(-100px)'
          }}
        >
          <Box
            bg={`url(${nft.image})`}
            backgroundPosition="center"
            backgroundSize="cover"
            w={`${width}px`}
            h={`${width}px`}
            borderTopLeftRadius="13px"
            borderTopRightRadius="13px"
          />

          <Box 
            mt="-16px"
            p="13px 12px" 
            color={color.text.primary}
            background="linear-gradient(180deg, rgba(148, 148, 148, 0) -24.61%, rgba(78, 77, 77, 0.418919) 10.38%, #434343 100%)"
            backdropFilter="blur(16px)"
            borderBottomLeftRadius="13px"
            borderBottomRightRadius="13px"
          >
            <Text
              fontWeight="700"
              fontSize="16px"
              lineHeight="22px"
            >
              {nft.name} {nft.code}
            </Text>
            <Text
              mt="2px"
              fontWeight="500"
              fontSize="14px"
              lineHeight="17px"
            >
              {nft.effect}
            </Text>
          </Box>

          <Box
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            {...current !== nft.id && {
              backdropFilter: 'blur(2.5px)'
            }}
            borderRadius="13px"
          />
        </Box>
      ))}
      <Box pr={`${width}px`} />
    </Box>
  );
};
