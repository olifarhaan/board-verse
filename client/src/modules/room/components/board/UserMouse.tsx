import { useEffect, useState } from "react";
import { useBoardPosition } from "../../hooks/useBoardPosition";
import { socket } from "../../../../utils/socket";
import { motion } from "framer-motion";
import { BsCursorFill } from "react-icons/bs";
import { useRoom } from "../../../../recoil/room";

const UserMouse = ({ userId }: { userId: string }) => {
  const { users } = useRoom();

  const [msg, setMsg]=useState("")


  const boardPos = useBoardPosition();
  const [x, setX] = useState(boardPos.x.get());
  const [y, setY] = useState(boardPos.x.get());

  const [pos, setPos] = useState({ x: -1, y: -1 });

  useEffect(() => {
    if (userId === "") return;
    socket.on("mouse_moved", (newX, newY, socketIdOfMoves) => {
      if (socketIdOfMoves === userId) {
        setPos({ x: newX, y: newY });
      }
    });
    

    const handleNewMsg=(msgUserId: string, newMsg:string)=>{
      if(msgUserId===userId){
        setMsg(newMsg)
        setTimeout(()=>{
          setMsg('')
        }, 3000)
      }
    }

    socket.on("new_msg", handleNewMsg)

    return () => {
      socket.off("mouse_moved");
      socket.off("new_msg", handleNewMsg)

    };

  }, [userId]);

  

  useEffect(() => {
    const unsubscribe = boardPos.x.on("change", setX);
    return unsubscribe;
  }, [boardPos.x]);
  useEffect(() => {
    const unsubscribe = boardPos.y.on("change", setY);
    return unsubscribe;
  }, [boardPos.y]);

  return (
    <motion.div
      className={`position-absolute  top-0 start-0 text-primary ${
        pos.x === -1 && "visually-hidden"
      } pe-none `}
      animate={{ x: pos.x + x, y: pos.y + y }}
      transition={{ duration: 0.1, ease: "linear" }}
      style={{ color: users.get(userId)?.color, zIndex:20 }}
    >
      <BsCursorFill
        className=""
        style={{ transform: "rotate(-90deg)", color: users.get(userId)?.color }}
      />
      {msg && (
        <p className="position-absolute top-0 start-2 mw-auto ">{msg}</p>
      )}
      <p style={{ color: users.get(userId)?.color }} className="ms-2">
        {users.get(userId)?.name || "Anonymous"}
      </p>
    </motion.div>
  );
};

export default UserMouse;
