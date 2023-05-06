import { Box, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { throttle } from "lodash";

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
  const ref = useRef(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    let idx = current;
    let isScrolling = false;
    let carousel = document.getElementById('nft-carousel');
    const margin = document.body.clientWidth < 500 ? (500 - document.body.clientWidth) / 2 : 0;
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
      <Text
        mt="48px"
        mx="20px"
        color="#fff"
        fontWeight="500"
        fontSize="16px"
        lineHeight="19px"
      >
        Select NFYSkin
      </Text>

      <Box 
        ref={ref}
        id="nft-carousel"
        mt="19px" 
        display="flex"
        overflowX="scroll"
        transition="1s"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        <Box pr={`${width}px`} />
        {nftList.map(nft => (
          <Box
            key={`${nft.name}_${nft.id}`}
            bg="#393947"
            borderRadius="7px"
            w={`${width}px`}
            transition="0.5s"
            {...(current !== nft.id) && {
              transform: 'perspective(600px) translateZ(-100px)'
            }}
          >
            <Box
              bg={`url(${nft.image})`}
              bgColor="#6f6f6f"
              backgroundPosition="center"
              backgroundSize="cover"
              w={`${width}px`}
              h={`${width}px`}
              borderTopRadius="7px"
            />
            <Box p="13px 12px">
              <Text
                fontWeight="500"
                fontSize="14px"
                lineHeight="17px"
                color="#A2A2A2"
              >
                {nft.name}
              </Text>
              <Text
                mt="3px"
                fontWeight="700"
                fontSize="17px"
                lineHeight="20px"
                color="#fff"
              >
                {nft.price} {nft.unit}
              </Text>
              <Text
                mt="5px"
                fontWeight="300"
                fontSize="13px"
                lineHeight="15px"
                color="#8BF8FF"
              >
                {nft.effect}
              </Text>
            </Box>
          </Box>
        ))}
        <Box pr={`${width}px`} />
      </Box>
    </>
  );
};
