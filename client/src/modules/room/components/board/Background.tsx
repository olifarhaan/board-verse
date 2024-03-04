import { useEffect, useRef } from "react";

import { motion } from "framer-motion";

import { useBoardPosition } from "../../hooks/useBoardPosition";
import { CANVAS_SIZE } from "../../../../utils/constants/canvasSize";

const Background = () => {
  const { x, y } = useBoardPosition();

  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = ref.current?.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, CANVAS_SIZE.width, CANVAS_SIZE.height);

      ctx.lineWidth = 1;
      ctx.strokeStyle = "#ccc";

      for (let i = 0; i < CANVAS_SIZE.height; i += 25) {
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(ctx.canvas.width, i);
        ctx.stroke();
      }
      for (let i = 0; i < CANVAS_SIZE.width; i += 25) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, ctx.canvas.height);
        ctx.stroke();
      }

      //   document.body.style.backgroundColor =
      //     bg.mode === "dark" ? "#222" : "#fff";

      //   if (bg.lines) {
      //     ctx.lineWidth = 1;
      //     ctx.strokeStyle = bg.mode === "dark" ? "#444" : "#ddd";
      //     for (let i = 0; i < CANVAS_SIZE.height; i += 25) {
      //       ctx.beginPath();
      //       ctx.moveTo(0, i);
      //       ctx.lineTo(ctx.canvas.width, i);
      //       ctx.stroke();
      //     }

      //     for (let i = 0; i < CANVAS_SIZE.width; i += 25) {
      //       ctx.beginPath();
      //       ctx.moveTo(i, 0);
      //       ctx.lineTo(i, ctx.canvas.height);
      //       ctx.stroke();
      //     }
    }
  }, []);

  return (
    <motion.canvas
      ref={ref}
      width={CANVAS_SIZE.width}
      height={CANVAS_SIZE.height}
      className="position-absolute top-0 bg-light"
      style={{ x, y }}
    />
  );
};

export default Background;
