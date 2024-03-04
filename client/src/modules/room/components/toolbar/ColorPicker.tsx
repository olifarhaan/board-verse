import { useRef, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import { HexColorPicker } from "react-colorful";
import { useClickAway } from "react-use";
import { useOptions } from "../../../../recoil/options";
import { EntryAnimation } from "../../../../utils/animations/EntryAnimations";

const ColorPicker = () => {
  const [options, setOptions] = useOptions();

  const ref = useRef<HTMLDivElement>(null);

  const [opened, setOpened] = useState(false);

  useClickAway(ref, () => setOpened(false));

  return (
    <div className="position-relative d-flex align-items-center pt-2" ref={ref}>
      <button
        className="d-flex rounded-circle border-2 border-white text-white p-2 align-content-center justify-content-center"
        style={{
          backgroundColor: options.lineColor,
          transform: "translateX(80%",
          color: "#ffffff",
        }}
        onClick={() => setOpened(!opened)}
        // disabled={options.mode === "select"}
      >
        {/* <BsPaletteFill /> */}
      </button>
      <AnimatePresence>
        {opened && (
          <motion.div
            className="position-absolute top-0 ms-5 ps-4"
            variants={EntryAnimation}
            initial="from"
            animate="to"
            exit="from"
          >
            {/* <h2 className="ml-3 font-semibold text-black dark:text-white text-sm-center">
              Line color
            </h2> */}
            <HexColorPicker
              color={options.lineColor}
              onChange={(e) => {
                setOptions({
                  ...options,
                  lineColor: e,
                });
              }}
              className="mb-5"
            />
            {/* <h2 className="ml-3 font-semibold text-black dark:text-white">
              Fill color
            </h2>
            <RgbaColorPicker
              color={options.fillColor}
              onChange={(e) => {
                setOptions({
                  ...options,
                  fillColor: e,
                });
              }}
            /> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorPicker;
