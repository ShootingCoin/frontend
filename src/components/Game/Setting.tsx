import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Egg from "../../interfaces/Egg";
import Board from "./Board";

const fullW = 500;
const fullH = 500;

export default function Setting() {
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
    let c = document.getElementById("game-setting");
    let ctx = (c as HTMLCanvasElement).getContext("2d");
    let width = fullW * boardSize;
    let height = fullH * boardSize;

    // initialize width
    ctx.canvas.width = width;
    ctx.canvas.width = height;

    /* Board Setting */

    // Egg's radius
    let radius = fullW * 14 / 300 * boardSize;
    // Board Line distance (horizontal, vertical)
    let blank = fullW / 50 * boardSize;
    // Egg's Array
    let egg_array = new Array();

    function init(){
      // Init Eggs (Spawn)
      for (let i = 0; i < 5; i++) {
        egg_array.push(
          new Egg(
            (0.14 + i * 0.18) * fullW * boardSize, 
            (0.18 + 0.64 * 5 / 6) * fullW * boardSize, 
            0
          )
        );
      }
      // Mouse Event Init
      c.addEventListener("mousedown", mouseDownListener, false);
      c.addEventListener("touchstart", mouseDownListener, false);
    }

    // Canvas Loop
    function updateBoard(){
      // Initialize
      ctx.clearRect(0, 0, width, height);

      // backdrop
      ctx.fillStyle="#71CCFF29";
      ctx.fillRect(0, height / 2, width, height);

      // Draw Egg
      for (let i = 0; i < egg_array.length; i++) {
        ctx.beginPath();
        let image = new Image();
        image.src = '/imgs/chips/chip_aptos.svg';

        ctx.drawImage(image, egg_array[i].x_pos - radius, egg_array[i].y_pos - radius, radius * 2, radius * 2);
      }
    }

    /* Drag and Drop */
    let dragging = false;
    let drag_index;

    function mouseDownListener(evt) {
      evt.preventDefault();
      
      let clientX = evt.clientX;
      let clientY = evt.clientY;

      if (evt.type === 'touchstart') {
        clientX = evt.touches[0].clientX;
        clientY = evt.touches[0].clientY;
      }

      let canvas_blank = c.getBoundingClientRect();
      let canvas_x = (clientX - canvas_blank.left) * ((c as HTMLCanvasElement).width / canvas_blank.width);
      let canvas_y = (clientY - canvas_blank.top) * ((c as HTMLCanvasElement).height / canvas_blank.height);
      let i;

      for (i = 0; i < egg_array.length; i++) {
        if (egg_array[i].HitTest(canvas_x, canvas_y, radius)) {
          dragging = true;
          egg_array[i].x_pos = canvas_x;
          egg_array[i].y_pos = canvas_y;
          drag_index = i;
        }
      }
      if (dragging) {
        window.addEventListener("mousemove", mouseMoveListener, false);
        window.addEventListener("mouseup", mouseUpListener, false);
        window.addEventListener("touchmove", mouseMoveListener, false);
        window.addEventListener("touchend", mouseUpListener, false);
      }
    }

    function mouseMoveListener(evt) {
      let clientX = evt.clientX;
      let clientY = evt.clientY;

      if (evt.type === 'touchmove') {
        clientX = evt.touches[0].clientX;
        clientY = evt.touches[0].clientY;
      }

      let canvas_blank = c.getBoundingClientRect();
      let canvas_x = (clientX - canvas_blank.left) * ((c as HTMLCanvasElement).width / canvas_blank.width);
      let canvas_y = (clientY - canvas_blank.top) * ((c as HTMLCanvasElement).height / canvas_blank.height);

      let pos_x = canvas_x;
      let pos_y = canvas_y

      // 범위 넘어가는 위치에 놓을 수 없도록 제한
      if (canvas_x < radius) {
        pos_x = radius; 
      } else if (canvas_x + radius > width) {
        pos_x = width - radius;
      }
      if (canvas_y - radius < width / 2) {
        pos_y = radius + width / 2; 
      } else if (canvas_y + radius > width) {
        pos_y = width - radius;
      }

      // 서로 겹치는 위치에 코인이 있지 않도록 수정
      let i = 0;
      for (i = 0; i < egg_array.length; i++) {
        if (i !== drag_index && egg_array[i].HitTest(canvas_x, canvas_y, radius * 2)) {
          const dir_x = pos_x - egg_array[i].x_pos;
          const dir_y = pos_y - egg_array[i].y_pos;
          const r = Math.sqrt(dir_x * dir_x + dir_y * dir_y);
          const cos = dir_x / r;
          const sin = dir_y / r;
          
          pos_x = egg_array[i].x_pos + radius * 2 * cos;
          pos_y = egg_array[i].y_pos + radius * 2 * sin;
        }
      }

      egg_array[drag_index].x_pos = pos_x;
      egg_array[drag_index].y_pos = pos_y;
    }

    function mouseUpListener(evt) {
      window.removeEventListener("mousemove", mouseMoveListener, false);
      window.removeEventListener("mouseup", mouseUpListener, false);
      window.removeEventListener("touchmove", mouseMoveListener, false);
      window.removeEventListener("touchend", mouseUpListener, false);
    }
    /* Drag and Drop End */

    init();
    const updateBoardInterval = setInterval(updateBoard, 20);
    
    return () => {
      clearInterval(updateBoardInterval);
      c.removeEventListener("mousedown", mouseDownListener, false);
      c.removeEventListener("touchstart", mouseDownListener, false);
    }
  }, [boardSize]);
  return (
    <Box position="relative">
      <canvas
        id="game-setting" 
        width={`${fullW * boardSize}`} 
        height={`${fullH * boardSize}`}
        style={{ position: 'relative', zIndex: 2 }}
      />
      <Board/>
    </Box>
  );
};
