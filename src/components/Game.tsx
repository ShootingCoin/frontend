import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Egg from "../interfaces/Egg";
import runPhysics from "../utils/runPhysics";

const fullW = 500;
const fullH = 500;

export default function Game() {
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

    /* Board Setting */

    // Egg's radius
    let radius = fullW * 7 / 300 * boardSize;
    // Board Line distance (horizontal, vertical)
    let blank = fullW / 50 * boardSize;
    // Egg's Array
    let egg_array = new Array();

    function init(){
      // Init Eggs (Spawn)
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          egg_array.push(
            new Egg(
              (0.18 + i * 0.32) * fullW * boardSize, 
              (0.18 + j * 0.32) * fullW * boardSize, 
              0
            )
          );
        }
      }
      // Mouse Event Init
      c.addEventListener("mousedown", mouseDownListener, false);
      c.addEventListener("touchstart", mouseDownListener, false);
    }

    // Canvas Loop
    function updateBoard(){
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

      // Draw Shooting Range
      if (dragging == true) {
        const rotateAngle = drag_x >= 0 ? Math.atan(drag_y / drag_x) : Math.atan(drag_y / drag_x) + Math.PI;
        const startX = egg_array[drag_index].x_pos;
        const startY = egg_array[drag_index].y_pos;
        const destX = startX + drag_x * 1.5 * boardSize;
        const destY = startY + drag_y * 1.5 * boardSize;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(startX, startY, radius * 0.9, startX, startY, radius * 4);
        gradient.addColorStop(0, "#8BF8FFF7");
        gradient.addColorStop(0.5, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(startX - radius * 2, startY - radius * 2, radius * 4, radius * 4);
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = '#8BF8FFF7';
        ctx.moveTo(egg_array[drag_index].x_pos, egg_array[drag_index].y_pos);
        ctx.lineTo(destX, destY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle="#8BF8FFF7"
        ctx.moveTo(
          destX + 10 * Math.cos(rotateAngle - Math.PI / 2) * boardSize, 
          destY + 10 * Math.sin(rotateAngle - Math.PI / 2) * boardSize
        );
        ctx.lineTo(
          destX + 10 * Math.cos(rotateAngle) * boardSize, 
          destY + 10 * Math.sin(rotateAngle) * boardSize
        );
        ctx.lineTo(
          destX + 10 * Math.cos(rotateAngle + Math.PI / 2) * boardSize, 
          destY + 10 * Math.sin(rotateAngle + Math.PI / 2) * boardSize
        );
        ctx.fill();
      }

      // Draw Egg
      for (let i = 0; i < egg_array.length; i++) {
        ctx.beginPath();
        if (egg_array[i].color == 0) {
          ctx.strokeStyle="#4AF5B7";
          ctx.fillStyle="#4AF5B7";
        } else {
          ctx.strokeStyle="#FFFFFF";
          ctx.fillStyle="#FFFFFF";
        }

        ctx.arc(egg_array[i].x_pos, egg_array[i].y_pos, radius, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
      }
    }

    /* Drag and Drop */
    let dragging = false;
    let drag_index;
    let drag_x;
    let drag_y;

    function mouseDownListener(evt) {
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
          drag_x = egg_array[i].x_pos - canvas_x;
          drag_y = egg_array[i].y_pos - canvas_y;
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
      drag_x = egg_array[drag_index].x_pos - canvas_x;
      drag_y = egg_array[drag_index].y_pos - canvas_y;
    }

    function mouseUpListener(evt) {
      window.removeEventListener("mousemove", mouseMoveListener, false);
      window.removeEventListener("mouseup", mouseUpListener, false);
      window.removeEventListener("touchmove", mouseMoveListener, false);
      window.removeEventListener("touchend", mouseUpListener, false);

      dragging = false;
      let distance = Math.sqrt(drag_x * drag_x + drag_y * drag_y);
      let x_dir = drag_x / distance;
      let y_dir = drag_y / distance;
      if (distance > 3 * radius) {
        // push using addForce
        egg_array[drag_index].addForce(x_dir, y_dir, distance / 5 * 2);

        distance = 0;
        // when push call runPhysics
        runPhysics(egg_array, radius);
      }
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
    <Box
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
