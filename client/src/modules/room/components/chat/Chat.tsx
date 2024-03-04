import { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";
import { BsFillChatFill } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useList } from "react-use";

import ChatInput from "./ChatInput";
import { useRoom } from "../../../../recoil/room";
import { socket } from "../../../../utils/socket";
import { DEFAULT_EASE } from "../../../../utils/animations/EntryAnimations";
import MessageComp from "./MessageComp";
import { Message } from "../../../../types";

const Chat = () => {
  const room = useRoom();

  const msgList = useRef<HTMLDivElement>(null);

  const [newMsg, setNewMsg] = useState(false);
  const [opened, setOpened] = useState(false);
  const [msgs, handleMsgs] = useList<Message>([]);

  useEffect(() => {
    const handleNewMsg = (userId: string, msg: string) => {
      const user = room.users.get(userId);

      handleMsgs.push({
        userId,
        msg,
        id: msgs.length + 1,
        username: user?.name || "Anonymous",
        color: user?.color || "#000",
      });

      msgList.current?.scroll({ top: msgList.current?.scrollHeight });

      if (!opened) setNewMsg(true);
    };

    socket.on("new_msg", handleNewMsg);

    return () => {
      socket.off("new_msg", handleNewMsg);
    };
  }, [handleMsgs, msgs, opened, room.users]);

  return (
    <motion.div
      className="position-absolute d-flex ms-5 sm:ms-0 sm:w-100 flex-column overflow-hidden rounded-top-3"
      animate={{ y: opened ? 0 : 260 }}
      transition={{ ease: DEFAULT_EASE, duration: 0.2 }}
      style={{ height: "300px", width: "25rem", zIndex: 50, bottom: "0px" }}
    >
      <button
        className="d-flex w-100 cursor-pointer align-items-center justify-content-between align-content-center  bg-dark py-2 px-10 fw-semibold text-white text-light"
        onClick={() => {
          setOpened((prev) => !prev);
          setNewMsg(false);
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <BsFillChatFill className="" />
          <div className="d-flex gap-2 align-items-center justify-content-center ">
            Chat
            {newMsg && (
              <span
                className="rounded bg-success px-1 text-xs-start font-semibold text-green-900"
                style={{ fontSize: "15px" }}
              >
                New!
              </span>
            )}
          </div>
        </div>

        <motion.div
          animate={{ rotate: opened ? 0 : 180 }}
          transition={{ ease: DEFAULT_EASE, duration: 0.2 }}
        >
          <FaChevronDown />
        </motion.div>
      </button>
      <div className="d-flex flex-grow-1 flex-column justify-content-between bg-light p-3">
        <div
          className=" overflow-y-scroll pr-2"
          ref={msgList}
          style={{ height: "190px" }}
        >
          {msgs.map((msg) => (
            <MessageComp key={msg.id} {...msg} />
          ))}
        </div>
        <ChatInput />
      </div>
    </motion.div>
  );
};

export default Chat;
