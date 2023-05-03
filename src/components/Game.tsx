import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Egg from "../interfaces/Egg";
import runPhysics from "../utils/runPhysics";

export default function Game() {
  const [boardSize, setBoardSize] = useState<number>(1);

  useEffect(() => {
    if (document.body 
      && document.body.clientWidth
      && document.body.clientWidth <= 600
    ) {
      setBoardSize(document.body.clientWidth / 600);
    }
  }, []);

  useEffect(() => {
    /* Canvas Setting */
    let c = document.getElementById("board");
    let ctx = (c as HTMLCanvasElement).getContext("2d");
    let width = 600 * boardSize;
    let height = 600 * boardSize;

    // initialize width
    ctx.canvas.width = width;
    ctx.canvas.width = height;

    /* Board Setting */

    // Egg's radius
    let radius = 14 * boardSize;
    // Board Line distance (horizontal, vertical)
    let blank = 12 * boardSize;
    // Egg's Array
    let egg_array = new Array();

    function init(){
      // Init Eggs (Spawn)
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          egg_array.push(new Egg((108 + i * 6 * 32) * boardSize, (108 + j * 6 * 32) * boardSize, 0));
        }
      }
      // Mouse Event Init
      c.addEventListener("mousedown", mouseDownListener, false);
      c.addEventListener("touchstart", mouseDownListener, false);
    }

    // Canvas Loop
    function updateBoard(){
      // board fill color
      ctx.fillStyle="#48466D";
      ctx.fillRect(0, 0, width, height);

      // board draw line
      ctx.strokeStyle="#DDFFF5";
      ctx.fillStyle="#DDFFF5";

      const borderPaths = [
        { x: 0, y: 0 },
        { x: 0, y: height },
        { x: width, y: height },
        { x: width, y: 0 },
      ];

      // border
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(borderPaths[i].x, borderPaths[i].y);
        ctx.lineTo(borderPaths[(i + 1) % 4].x, borderPaths[(i + 1) % 4].y);
        ctx.stroke();
      }

      for (let i = 0; i < 19; i++) { 
        // horizontal line draw
        ctx.beginPath();
        ctx.moveTo(blank + i * 32 * boardSize, blank);
        ctx.lineTo(blank + i * 32 * boardSize, height - blank);
        ctx.stroke();

        // vertical line draw
        ctx.beginPath();
        ctx.moveTo(blank, blank + i * 32 * boardSize);
        ctx.lineTo(height - blank, blank + i * 32 * boardSize);
        ctx.stroke();
      }

      // board draw point
      let circle_radius = 3 * boardSize;
      for (let i = 0; i < 3; i++) { 
        for (let j = 0; j < 3; j++) { 
          // board circle draw
          ctx.beginPath();
          ctx.arc(blank + (3 * 32 + i * 6 * 32) * boardSize, blank + (3 * 32  + j * 6 * 32) * boardSize, circle_radius, 0, 2*Math.PI);
          ctx.fill();
          ctx.stroke();
        }
      }

      // Draw Shooting Range
      if (dragging == true) {
        const rotateAngle = drag_x >= 0 ? Math.atan(drag_y / drag_x) : Math.atan(drag_y / drag_x) + Math.PI;
        const destX = egg_array[drag_index].x_pos + drag_x * 1.5 * boardSize;
        const destY = egg_array[drag_index].y_pos + drag_y * 1.5 * boardSize;

        ctx.beginPath();
        ctx.strokeStyle="#4AF5B7CC"
        ctx.fillStyle="#4AF5B777"
        ctx.arc(egg_array[drag_index].x_pos, egg_array[drag_index].y_pos, radius * 3, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(egg_array[drag_index].x_pos, egg_array[drag_index].y_pos);
        ctx.lineTo(destX, destY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle="#4AF5B7CC"
        ctx.moveTo(
          destX + 5 * Math.cos(rotateAngle - Math.PI / 2), 
          destY + 5 * Math.sin(rotateAngle - Math.PI / 2)
        );
        ctx.lineTo(
          destX + 15 * Math.cos(rotateAngle), 
          destY + 15 * Math.sin(rotateAngle)
        );
        ctx.lineTo(
          destX + 5 * Math.cos(rotateAngle + Math.PI / 2), 
          destY + 5 * Math.sin(rotateAngle + Math.PI / 2)
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
    <Box minWidth="fit-content">
      <canvas 
        id="board" 
        width={`${600 * boardSize}`} 
        height={`${600 * boardSize}`}
      />
    </Box>
  );
};
