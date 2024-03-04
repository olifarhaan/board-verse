import express, { NextFunction, Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import verifyToken from "./middlewares/verifyToken";
import { Server } from "socket.io";
import { createServer } from "http";
import {} from "./types/global";
import { uuid } from "./utils/uuid";

const app = express();
export const server = createServer(app);

const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL as string;

const corsOptions = {
  origin: FRONTEND_BASE_URL,
  credentials: true,
};

app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(cors(corsOptions));
// app.use(verifyToken);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "Server is running... with authentication",
  });
});

app.get("/healthy", async (req: Request, res: Response) => {
  res.status(200).json({ success: true, messsage: "Healthy" });
});

const port = parseInt(process.env.PORT || "3000", 10);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(server, {
  cors: {
    origin: FRONTEND_BASE_URL,
  },
});

const rooms = new Map<string, Room>();
const addMove = (roomId: string, socketId: string, move: Move) => {
  const room = rooms.get(roomId)!;

  if (room) {
    if (!room.users.has(socketId)) {
      room.usersMoves.set(socketId, [move]);
    }
    room.usersMoves.get(socketId)?.push(move);
  }
};

const undoMove = (roomId: string, socketId: string) => {
  const room = rooms.get(roomId)!;
  if (room) {
    room.usersMoves.get(socketId)!.pop();
  }
};

const leaveRoom = (roomId: string, socketId: string) => {
  const room = rooms.get(roomId);
  if (room) {
    const userMoves = room.usersMoves.get(socketId);
    room.drawed.push(...userMoves!);
    room.users.delete(socketId);
  }
};

io.on("connection", (socket) => {
  const getRoomId = () => {
    const joinedRoom = [...socket.rooms].find((room) => room !== socket.id);
    if (!joinedRoom) return socket.id;
    else return joinedRoom;
  };

  socket.on("create_room", (username) => {
    let roomId: string;
    do {
      roomId = uuid();
    } while (rooms.has(roomId));

    socket.join(roomId);
    rooms.set(roomId, {
      users: new Map([[socket.id, username]]),
      drawed: [],
      usersMoves: new Map([[socket.id, []]]),
    });
    io.to(socket.id).emit("created", roomId);
  });

  socket.on("check_room", (roomId) => {
    if (rooms.has(roomId)) socket.emit("room_exists", true);
    else socket.emit("room_exists", false);
  });

  socket.on("join_room", (roomId, username) => {
    const room = rooms.get(roomId);
    if (room) {
      socket.join(roomId);

      room.users.set(socket.id, username);
      room.usersMoves.set(socket.id, []);

      io.to(socket.id).emit("joined", roomId);
    } else {
      io.to(socket.id).emit("joined", "", true);
    }
  });

  socket.on("joined_room", () => {
    const roomId = getRoomId();
    const room = rooms.get(roomId);
    if (room) {
      io.to(socket.id).emit(
        "room",
        room,
        JSON.stringify([...room.usersMoves]),
        JSON.stringify([...room.users])
      );
      socket.broadcast
        .to(roomId)
        .emit("new_user", socket.id, room.users.get(socket.id) || "Anonymous");
    }
  });

  socket.on("send_msg", (msg) => {
    io.to(getRoomId()).emit("new_msg", socket.id, msg);
  });

  socket.on("leave_room", () => {
    const roomId = getRoomId();
    leaveRoom(roomId, socket.id);
    io.to(roomId).emit("user_disconnected", socket.id);
  });

  socket.on("draw", (move) => {
    const roomId = getRoomId();
    const timestamp = Date.now();
    addMove(roomId, socket.id, { ...move, timestamp });
    io.to(socket.id).emit("your_move", { ...move, timestamp });
    socket.broadcast
      .to(roomId)
      .emit("user_draw", { ...move, timestamp }, socket.id);
  });

  socket.on("mouse_move", (x, y) => {
    const roomId = getRoomId();
    socket.broadcast.to(roomId).emit("mouse_moved", x, y, socket.id);
  });

  socket.on("undo", () => {
    const roomId = getRoomId();
    undoMove("global", socket.id);
    socket.broadcast.to(roomId).emit("user_undo", socket.id);
  });

  socket.on("disconnecting", () => {
    const roomId = getRoomId();
    leaveRoom(roomId, socket.id);
    io.to(roomId).emit("user_disconnected", socket.id);
  });
});
