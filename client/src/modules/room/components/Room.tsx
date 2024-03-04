import { useRoom } from "../../../recoil/room";
import RoomContextProvider from "../context/Room.context";
import NameInput from "./NameInput";
import UsersList from "./UsersList";
import { useRef } from "react";
import Chat from "./chat/Chat";
import ToolBar from "./toolbar/ToolBar";
import Canvas from "./board/Canvas";
import MousePosition from "./board/MousePosition";
import MouseRenderer from "./board/MouseRenderer";

const Room = () => {
  const room = useRoom();
  const undoRef = useRef<HTMLButtonElement>(null);

  if (!room.id) return <NameInput />;
  return (
    <RoomContextProvider>
      <div className="position-relative vh-100 vw-100 overflow-hidden">
        <UsersList />
        <ToolBar undoRef={undoRef} />
        <Canvas undoRef={undoRef} />
        <MousePosition />
        <MouseRenderer />
        <Chat/>
      </div>
    </RoomContextProvider>
  );
};

export default Room;
