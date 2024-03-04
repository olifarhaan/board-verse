import { Message } from "../../../../types";
import { socket } from "../../../../utils/socket";

const MessageComp = ({ userId, msg, username, color }: Message) => {
  const me = socket.id === userId;

  return (
    <div
      className={`my-2 d-flex gap-2 ${
        me && "justify-content-end text-align text-right"
      }`}
    >
      {!me && (
        <h5 style={{ color }} className="fw-bold">
          {username}
        </h5>
      )}
      <p style={{ wordBreak: "break-all" }}> {msg}</p>
    </div>
  );
};

export default MessageComp;
