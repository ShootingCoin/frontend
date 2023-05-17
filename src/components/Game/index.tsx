import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import runPhysics from "src/utils/runPhysics";
import { color } from "@comps/styles/common.style";
import Img from "next/image";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentSituationState, eggsState, isLoadingState, isMyTurnState } from "src/recoil/game";
import { uuidState, webSocketState } from "src/recoil/socket";
import Egg from "src/interfaces/Egg";

const fullW = 500;
const fullH = 500;

export default function Game() {
  const webSocket = useRecoilValue(webSocketState);
  const uuid = useRecoilValue(uuidState);
  const [eggs, setEggs] = useRecoilState(eggsState);
  const [currentSituation, setCurrentSituation] = useRecoilState(currentSituationState);
  const [isMyTurn, setIsMyTurn] = useRecoilState(isMyTurnState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);
  const [boardSize, setBoardSize] = useState<number>(1 - 40 / 500);

  function resize() {
    if (document.body 
      && document.body.clientWidth
      && document.body.clientWidth <= fullW
    ) {
      setBoardSize((document.body.clientWidth - 40) / fullW);
    }
  }
  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    /* Canvas Setting */
    let c = document.getElementById("game");
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
      egg_array = eggs.map(x => new Egg({
        ...x,
        x_pos: x.x_pos * boardSize,
        y_pos: x.y_pos * boardSize,
      }));
      console.log('initialized')

      runPhysics(
        egg_array, 
        radius, 
        width, 
        (val) => {
          setIsLoading(false);
          setCurrentSituation(JSON.parse(JSON.stringify(
            val
          )).map(x => ({
            ...x,
            x_pos: x.x_pos / boardSize,
            y_pos: x.y_pos / boardSize,
          })),)
        },
      );
      // Mouse Event Init
      c.addEventListener("mousedown", mouseDownListener, false);
      c.addEventListener("touchstart", mouseDownListener, false);
    }

    // Canvas Loop
    function updateBoard(){
      ctx.clearRect(0, 0, width, height);

      // Draw Shooting Range
      if (
        dragging == true &&
        // for demo
        egg_array[drag_index].account === uuid
      ) {
        const rotateAngle = drag_x >= 0 ? Math.atan(drag_y / drag_x) : Math.atan(drag_y / drag_x) + Math.PI;
        const startX = egg_array[drag_index].x_pos;
        const startY = egg_array[drag_index].y_pos;
        const destX = startX + drag_x * 1.5 * boardSize;
        const destY = startY + drag_y * 1.5 * boardSize;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(startX, startY, radius * 0.9, startX, startY, radius * 4);
        gradient.addColorStop(0, `${color.primary.main}F7`);
        gradient.addColorStop(0.5, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(startX - radius * 2, startY - radius * 2, radius * 4, radius * 4);
        ctx.fill();

        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = `${color.primary.main}F7`;
        ctx.moveTo(egg_array[drag_index].x_pos, egg_array[drag_index].y_pos);
        ctx.lineTo(destX, destY);
        ctx.stroke();

        ctx.beginPath();
        ctx.fillStyle=`${color.primary.main}F7`;
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
        if (!egg_array[i].isOut) {
          ctx.beginPath();
          let image = new Image();
          image.src = '/imgs/chips/chip_aptos.svg';

          ctx.drawImage(image, egg_array[i].x_pos - radius, egg_array[i].y_pos - radius, radius * 2, radius * 2);
        }
      }
    }

    /* Drag and Drop */
    let dragging = false;
    let drag_index;
    let drag_x;
    let drag_y;

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
          drag_x = egg_array[i].x_pos - canvas_x;
          drag_y = egg_array[i].y_pos - canvas_y;
          let distance = Math.sqrt(drag_x * drag_x + drag_y * drag_y);
          
          if (distance > 150 * boardSize) {
            drag_x *= 150 * boardSize / distance;
            drag_y *= 150 * boardSize / distance;
          }
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

      let distance = Math.sqrt(drag_x * drag_x + drag_y * drag_y);

      if (distance > 150 * boardSize) {
        drag_x *= 150 * boardSize / distance;
        drag_y *= 150 * boardSize / distance;
      }
    }

    function mouseUpListener(evt) {
      window.removeEventListener("mousemove", mouseMoveListener, false);
      window.removeEventListener("mouseup", mouseUpListener, false);
      window.removeEventListener("touchmove", mouseMoveListener, false);
      window.removeEventListener("touchend", mouseUpListener, false);

      dragging = false;
      if (egg_array[drag_index].account !== uuid) return;

      let distance = Math.sqrt(drag_x * drag_x + drag_y * drag_y);
      let x_dir = drag_x / distance;
      let y_dir = drag_y / distance;
      
      // push using addForce
      egg_array[drag_index].addForce(x_dir, y_dir, distance * 0.3);

      webSocket.send(JSON.stringify({
        state: 'action',
        data: JSON.parse(JSON.stringify(
            egg_array
          )).map(x => ({
            ...x,
            x_pos: x.x_pos / boardSize,
            y_pos: x.y_pos / boardSize,
          })),
      }));
      setIsLoading(true);

      distance = 0;
      // when push call runPhysics
      runPhysics(
        egg_array, 
        radius, 
        width, 
        (val) => {
          const newVal = JSON.parse(JSON.stringify(
            val
          )).map(x => ({
            ...x,
            x_pos: x.x_pos / boardSize,
            y_pos: x.y_pos / boardSize,
          }));
          setEggs(newVal);
          setCurrentSituation(newVal);
          setIsMyTurn(false);
        }
      );
    }
    /* Drag and Drop End */

    init();
    const updateBoardInterval = setInterval(updateBoard, 20);
    
    return () => {
      clearInterval(updateBoardInterval);
      c.removeEventListener("mousedown", mouseDownListener, false);
      c.removeEventListener("touchstart", mouseDownListener, false);
    }
  }, [boardSize, eggs]);

  useEffect(() => {
    
  }, []);

  return (
    <Box 
      position="relative"
      sx={{ 
        ...(isLoading || !isMyTurn) && { '& #game': { pointerEvents: 'none' } }
      }}
    >
      <canvas
        id="game" 
        width={`${fullW * boardSize}`} 
        height={`${fullH * boardSize}`}
        style={{ position: 'relative', zIndex: 2 }}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        pt="100%"
        bg="url(/imgs/board/img_game_board.png)"
        bgSize="contain"
        backgroundRepeat="no-repeat"
      >
        <Img 
          alt="board-image"
          src="/imgs/board/img_board_layer.png"
          layout="fill"
        />
      </Box>
    </Box>
  );
};
