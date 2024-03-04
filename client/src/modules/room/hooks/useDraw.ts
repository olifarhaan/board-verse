import { useCallback, useEffect, useState } from "react";
import { useMyMoves } from "../../../recoil/room";
import { useOptionsValue } from "../../../recoil/options";
import { useBoardPosition } from "./useBoardPosition";
import { socket } from "../../../utils/socket";
import { Move } from "../../../types";
import { getPos } from "../../../utils/getPos";

let tempMoves: [number, number][] = [];

export const useDraw = (
  ctx: CanvasRenderingContext2D | undefined,
  blocked: boolean
) => {
  const { handleAddMyMove, handleRemoveMyMove } = useMyMoves();
  const options = useOptionsValue();
  const [drawing, setDrawing] = useState(false);
  // const boardPosition = useBoardPosition();
  const { x: movedX, y: movedY } = useBoardPosition();
  // const movedX = boardPosition.x;
  // const movedY = boardPosition.y;

  //   const savedMoves: Move[] = [];

  const handleUndo = useCallback(() => {
    if (ctx) {
      handleRemoveMyMove();
      socket.emit("undo");
    }
  }, [ctx, handleRemoveMyMove]);

  const handleStartDrawing = (x: number, y: number) => {
    if (!ctx || blocked) return;

    setDrawing(true);
    ctx.beginPath();
    ctx.lineTo(getPos(x, movedX), getPos(y, movedY));
    ctx.stroke();
    tempMoves.push([getPos(x, movedX), getPos(y, movedY)]);
  };
  const handleEndDrawing = () => {
    if (!ctx || blocked) return;
    setDrawing(false);
    ctx.closePath();

    const move: Move = {
      path: tempMoves,
      options,
      timestamp: 0,
      eraser: options.erase,
    };
    tempMoves = [];
    ctx.globalCompositeOperation = "source-over";
    socket.emit("draw", move);
  };
  const handleDraw = (x: number, y: number) => {
    if (!ctx || !drawing || blocked) {
      return;
    }
    ctx.lineTo(getPos(x, movedX), getPos(y, movedY));
    ctx.stroke();
    tempMoves.push([getPos(x, movedX), getPos(y, movedY)]);
  };

  useEffect(() => {
    if (ctx) {
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.lineWidth = options.lineWidth;
      ctx.strokeStyle = options.lineColor;
      if (options.erase) ctx.globalCompositeOperation = "destination-out";
    }
  });

  useEffect(() => {
    socket.on("your_move", (move) => {
      handleAddMyMove(move);
    });
    return () => {
      socket.off("your_move");
    };
  }, [socket]);

  useEffect(() => {
    const handleUndoKeyboard = (e: KeyboardEvent) => {
      if (e.key === "z" && e.ctrlKey) {
        handleUndo();
      }
    };
    document.addEventListener("keydown", handleUndoKeyboard);
    return () => document.removeEventListener("keydown", handleUndoKeyboard);
  }, [handleUndo]);

  return {
    handleEndDrawing,
    handleStartDrawing,
    handleDraw,
    drawing,
    handleUndo,
  };
};
