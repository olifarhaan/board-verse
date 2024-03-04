import { useMotionValue } from "framer-motion";
import { Dispatch, SetStateAction, forwardRef, useEffect, useRef } from "react";
import { useViewportSize } from "../../../../hooks/useViewportSize";
import { CANVAS_SIZE } from "../../../../utils/constants/canvasSize";
import { motion } from "framer-motion";
import { useBoardPosition } from "../../hooks/useBoardPosition";

const MiniMap = forwardRef<
  HTMLCanvasElement,
  {
    dragging: boolean;
    setMovedMinimap: Dispatch<SetStateAction<boolean>>;
  }
>(({ dragging, setMovedMinimap }, ref) => {
  const { x, y } = useBoardPosition();
  const containerRef = useRef<HTMLDivElement>(null);
  const { width, height } = useViewportSize();
  const miniX = useMotionValue(0);
  const miniY = useMotionValue(0);

  useEffect(() => {
    miniX.on("change", (newX) => (!dragging ? x.set(-newX * 15) : void 0));
    miniY.on("change", (newY) => (!dragging ? y.set(-newY * 15) : void 0));
    return () => {
      miniX.clearListeners();
      miniY.clearListeners();
    };
  }, [dragging, miniX, miniY, x, y]);

  return (
    <div
      className="position-absolute top-0 end-0 m-2 grayColor rounded-2  overflow-hidden "
      ref={containerRef}
      style={{
        width: CANVAS_SIZE.width / 15,
        height: CANVAS_SIZE.height / 15,
        zIndex:30
      }}
    >
      <canvas
        ref={ref}
        width={CANVAS_SIZE.width}
        height={CANVAS_SIZE.height}
        className="w-100 h-100"
      />
      <motion.div
        drag
        dragConstraints={containerRef}
        dragElastic={0}
        dragTransition={{ power: 0, timeConstant: 0 }}
        onDragStart={() => setMovedMinimap((prev) => !prev)}
        onDragEnd={() => setMovedMinimap((prev: boolean) => !prev)}
        className="position-absolute top-0 start-0 border border-2 border-primary rounded-2"
        style={{
          width: width / 15,
          height: height / 15,
          x: miniX,
          y: miniY,
          cursor: "grab",
        }}
        animate={{ x: -x.get() / 15, y: -y.get() / 15 }}
        transition={{ duration: 0.1 }}
      ></motion.div>
    </div>
  );
});

MiniMap.displayName = "MiniMap";
export default MiniMap;
