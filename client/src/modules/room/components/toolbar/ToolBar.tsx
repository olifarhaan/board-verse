import { BsFillImageFill, BsThreeDots } from "react-icons/bs";
import ColorPicker from "./ColorPicker";
import LineWidthPicker from "./lineWidthPicker";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import Eraser from "./Eraser";
import { RefObject } from "react";
import { FaUndo } from "react-icons/fa";

const ToolBar = ({ undoRef }: { undoRef: RefObject<HTMLButtonElement> }) => {
  return (
    <div
      className="position-absolute top-50 rounded-start-3 ms-3  d-flex flex-column bg-dark rounded shadow p-1 text-bg-light "
      style={{ transform: "translateY(-50%)", color: "#ffffff", zIndex: 50 }}
    >
      <button className="btn btn-lg text-light" ref={undoRef}>
        <FaUndo />
      </button>
      <ColorPicker />
      <LineWidthPicker />
      <Eraser />
      <button className="btn btn-lg text-light">
        <BsFillImageFill />
      </button>
      <button className="btn btn-lg text-light">
        <BsThreeDots />
      </button>

      <button className="btn btn-lg text-light">
        <HiOutlineDocumentDownload />
      </button>
    </div>
  );
};

export default ToolBar;
