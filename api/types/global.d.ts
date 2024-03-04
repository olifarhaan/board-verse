export declare global {
  interface CtxOptions {
    lineWidth: number;
    lineColor: string;
    erase: boolean;
  }

  interface Move {
    path: [number, number][];
    options: CtxOptions;
    eraser: boolean;
    timestamp: number;
  }

  type Room = {
    usersMoves: Map<string, Move[]>;
    drawed: Move[];
    users: Map<string, string>;
  };

  interface ServerToClientEvents {
    room: (room: Room, usersMovesToParse: string, usersToParse: string) => void;
    created: (roomId: string) => void;
    user_draw: (move: Move, userId: string) => void;
    mouse_moved: (x: number, y: number, userId: string) => void;
    room_exists: (exists: boolean) => void;
    joined: (room: string, failed?: boolean) => void;
    your_move: (move: Move) => void;
    user_undo(userId: string): void;
    new_user: (userId: string, username: string) => void;
    user_disconnected: (userId: string) => void;
    new_msg: (userId: string, msg: string) => void;
  }

  interface ClientToServerEvents {
    draw: (move: Move) => void;
    mouse_move: (x: number, y: number) => void;
    check_room: (roomId: string) => void;
    undo: () => void;
    create_room: (username: string) => void;
    join_room: (room: string, username: string) => void;
    joined_room: () => void;
    leave_room: () => void;
    send_msg: (msg: string) => void;
  }

  interface RoomData {
    name: string;
    userId: string;
    roomId: string;
    host: boolean;
    presenter: boolean;
  }

  type Shape = "line" | "circle" | "rect" | "image";
  type CtxMode = "eraser" | "draw" | "select";

  interface User {
    name: string;
    color: string;
  }

  interface ClientRoom {
    id: string;
    usersMoves: Map<string, Move[]>;
    movesWithoutUser: Move[];
    myMoves: Move[];
    users: Map<string, User>;
  }

  interface Message {
    userId: string;
    username: string;
    color: string;
    msg: string;
    id: number;
  }
}
