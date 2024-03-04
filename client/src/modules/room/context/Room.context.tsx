import { MotionValue, useMotionValue } from "framer-motion";
import { ReactNode, createContext, useEffect } from "react";
import { socket } from "../../../utils/socket";
import { useSetRoom, useSetUsers } from "../../../recoil/room/room.hooks";
import { Move, User } from "../../../types";
import { COLORS_ARRAY } from "../../../utils/constants/colors";

const roomContext = createContext<{
  x: MotionValue<number>;
  y: MotionValue<number>;
}>(null!); // TODO: fix this null assertion

const RoomContextProvider = ({ children }: { children: ReactNode }) => {
  const setRoom = useSetRoom();
  const { handleAddUser, handleRemoveUser } = useSetUsers();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    socket.on("room", (room, usersMovesToParse, usersToParse) => {
      const usersMoves = new Map<string, Move[]>(JSON.parse(usersMovesToParse));
      const usersParsed = new Map<string, string>(JSON.parse(usersToParse));

      const users = new Map<string, User>();

      usersParsed.forEach((name, id) => {
        if (id == socket.id) return;
        const index = [...usersParsed.keys()].indexOf(id);
        const color = COLORS_ARRAY[index % COLORS_ARRAY.length];
        users.set(id, {
          name,
          color,
        });
      });

      setRoom((prev) => ({
        ...prev,
        users,
        usersMoves,
        movesWithoutUser: room.drawed,
      }));
    });

    socket.on("new_user", (userId, username) => {
      handleAddUser(userId, username);
    });

    socket.on("user_disconnected", (user) => {
      handleRemoveUser(user);
    });
    return () => {
      socket.off("room");
      socket.off("new_user");
      socket.off("user_disconnected");
    };
  }, [handleAddUser, handleRemoveUser, setRoom]);

  return (
    <roomContext.Provider value={{ x, y }}> {children}</roomContext.Provider>
  );
};

export default RoomContextProvider;
export { roomContext };
