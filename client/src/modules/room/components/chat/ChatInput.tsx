import { FormEvent, useState } from "react";
import { socket } from "../../../../utils/socket";
import { AiOutlineSend } from "react-icons/ai";

const ChatInput = () => {
  const [msg, setMsg] = useState("");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("send_msg", msg);
    setMsg("");
  };
  return (
    <form className="form col-md-12" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your message..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
      </div>
      <button type="submit" className="mt-4 btn btn-dark form-control">
        <AiOutlineSend/>
      </button>
    </form>
  );
};

export default ChatInput;
