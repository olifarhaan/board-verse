import { useEffect } from "react";
import { socket } from "../../../utils/socket";
import { Move } from "../../../types";
import { useSetUsers } from "../../../recoil/room";

export const useSocketDraw = (
  ctx: CanvasRenderingContext2D | undefined,
  drawing: boolean
) => {
  const { handleAddMoveToUser, handleRemoveMoveFromUser } = useSetUsers();

  useEffect(() => {
    let moveToDrawLater: Move | undefined;
    let userIdLater = "";
    socket.on("user_draw", (move, userId) => {
      if (ctx && !drawing) {
        handleAddMoveToUser(userId, move);
      } else {
        moveToDrawLater = move;
        userIdLater = userId;
      }
    });

    return () => {
      socket.off("user_draw");
      if (moveToDrawLater && userIdLater && ctx) {
        handleAddMoveToUser(userIdLater, moveToDrawLater);
      }
    };
  }, [ctx, drawing]);

  useEffect(() => {
    socket.on("user_undo", (userId) => {
      handleRemoveMoveFromUser(userId);
    });
    return () => {
      socket.off("user_undo");
    };
  }, [ctx, handleRemoveMoveFromUser]);

  // useEffect(() => {
  //   if (ctx) socket.emit("joined_room");
  // }, []);

  // useEffect(() => {
  //   socket.on("room", (room, usersToParse) => {
  //     if (!ctx) return;
  //     const users = new Map<string, Move[]>(JSON.parse(usersToParse));

  //     room.drawed.forEach((move) => {
  //       handleMove(move, ctx);
  //       movesWithoutUser.push(move);
  //     });

  //     users.forEach((userMoves, userId) => {
  //       userMoves.forEach((move) => handleMove(move, ctx));
  //       setUsers((prevUsers) => ({ ...prevUsers, [userId]: userMoves }));
  //     });
  //     handleEnd();
  //   });

  //   return () => {
  //     socket.off("room");
  //   };
  // }, [ctx, handleEnd, setUsers]);
};
