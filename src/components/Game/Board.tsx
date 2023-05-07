import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";

const fullW = 500;
const fullH = 500;

export default function Board() {
  const [boardSize, setBoardSize] = useState<number>(1 - 40 / 500);

  useEffect(() => {
    if (document.body 
      && document.body.clientWidth
      && document.body.clientWidth <= fullW
    ) {
      setBoardSize((document.body.clientWidth - 40) / fullW);
    }
  }, []);

  useEffect(() => {
    /* Canvas Setting */
    let c = document.getElementById("board");
    let ctx = (c as HTMLCanvasElement).getContext("2d");
    let width = fullW * boardSize;
    let height = fullH * boardSize;

    // initialize width
    ctx.canvas.width = width;
    ctx.canvas.width = height;

    // Board Line distance (horizontal, vertical)
    let blank = fullW / 50 * boardSize;

    // board fill color
    ctx.fillStyle="#090727";
    ctx.fillRect(0, 0, width, height);

    // board draw line
    ctx.strokeStyle="#7EC6FF8A";
    ctx.fillStyle="#7EC6FF8A";
    ctx.lineWidth = 0.8;

    for (let i = 0; i < 19; i++) { 
      if (i !== 0 && i !== 18) {
        // horizontal line draw
        ctx.beginPath();
        ctx.moveTo(blank + i * 4 / 75 * fullW * boardSize, blank);
        ctx.lineTo(blank + i * 4 / 75 * fullW * boardSize, height - blank);
        ctx.stroke();

        // vertical line draw
        ctx.beginPath();
        ctx.moveTo(blank, blank + i * 4 / 75 * fullW * boardSize);
        ctx.lineTo(height - blank, blank + i * 4 / 75 * fullW * boardSize);
        ctx.stroke();
      }
    }
  }, [boardSize]);
  return (
    <Box
      position="absolute"
      top="0"
      left="0"
      p="1px"
      boxSizing="border-box"
      w="fit-content"
      height="fit-content"
      background="linear-gradient(168deg, #8BCEFF 0%, #2C73FF 20%, #C5FFFF 40%, #BFE8FF 60%,#96ADFF 80%, #00A3FF 100%)"
      borderRadius="9px"
      sx={{
        '& canvas': {
          borderRadius: '9px'
        }
      }}
    >
      <canvas 
        id="board" 
        width={`${fullW * boardSize}`} 
        height={`${fullH * boardSize}`}
      />
    </Box>
  );
};
