import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { throttle } from "lodash";
import { color } from "@comps/styles/common.style";
import { Switch } from "@comps/common";

const nftList = [
  {
    id: 0,
    name: 'Blue Jewel #2652',
    image: 'https://upload.wikimedia.org/wikipedia/en/2/26/Paul_Rudish_Mickey_Mouse.png',
    price: 0.043,
    unit: 'APT',
    effect: '10% Speed / 0.3% Size',
  },
  {
    id: 1,
    name: 'Blue Jewel #4444',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Mickey_Mouse_head_and_ears.svg/440px-Mickey_Mouse_head_and_ears.svg.png',
    price: 0.043,
    unit: 'APT',
    effect: '10% Speed / 0.3% Size',
  },
  {
    id: 2,
    name: 'Blue Jewel #4444',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Walt_disney_portrait.jpg/440px-Walt_disney_portrait.jpg',
    price: 0.043,
    unit: 'APT',
    effect: '10% Speed / 0.3% Size',
  },
  {
    id: 3,
    name: 'Blue Jewel #4444',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Mickey_Mouse_head_and_ears.svg/440px-Mickey_Mouse_head_and_ears.svg.png',
    price: 0.043,
    unit: 'APT',
    effect: '10% Speed / 0.3% Size',
  },
  {
    id: 4,
    name: 'Blue Jewel #4444',
    image: 'https://upload.wikimedia.org/wikipedia/en/2/26/Paul_Rudish_Mickey_Mouse.png',
    price: 0.043,
    unit: 'APT',
    effect: '10% Speed / 0.3% Size',
  }
];

const width = 169;

export default function NFTCarousel() {
  const [isShow, setIsShow] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let idx = current;
    let isScrolling = false;
    let carousel = document.getElementById('nft-carousel');
    const margin = document.body.clientWidth < 500 ?  (3 * width - document.body.clientWidth) / 2 : (3 * width - 500) / 2;
    carousel.scrollLeft = margin;

    const onScroll = throttle((e) => {
      e.preventDefault();
      if (!isScrolling) {
        idx = Math.round(carousel.scrollLeft / width);
        if (idx >= nftList.length) {
          idx = nftList.length - 1;
        }
        setCurrent(nftList[idx].id);
        carousel.scrollLeft = idx * width + margin;
        isScrolling = true;
      }
      setTimeout(() => {
        isScrolling = false;
      }, 500);
    }, 500);

    carousel.addEventListener('scroll', onScroll);
    return () => {
      carousel.removeEventListener('scroll', onScroll);
    }
  }, []);

  return (
    <>
      <Box mt="48px" mx="20px" display="flex" alignItems="center">
        <Text mr="auto" color="#fff" fontWeight="700" fontSize="20px" lineHeight="26px">
          Select NFTSkin
        </Text>
        <Switch
          onChange={(e) => setIsShow(e.target.checked)}
        />
      </Box>

      <Box 
        id="nft-carousel"
        py="19px" 
        display="flex"
        overflowX="scroll"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
        {...!isShow && {
          opacity: '0',
          pointerEvents: 'none'
        }}
      >
        <Box pr={`${width}px`} />
        {nftList.map(nft => (
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
              background="rgba(0, 0, 0, 0.27)"
              backdropFilter="blur(16px)"
              borderBottomLeftRadius="13px"
              borderBottomRightRadius="13px"
            >
              <Text
                fontWeight="700"
                fontSize="16px"
                lineHeight="22px"
              >
                {nft.name}
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
    </>
  );
};
