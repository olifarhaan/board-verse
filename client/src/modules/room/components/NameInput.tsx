import { FormEvent, useEffect, useState } from "react";
import { useSetRoomId } from "../../../recoil/room";
import { useNavigate, useParams } from "react-router-dom";
import { socket } from "../../../utils/socket";

const NameInput = () => {
  const setRoomId = useSetRoomId();
  const [name, setName] = useState("");
  const params = useParams();
  const roomId = params.roomId;
  const navigate = useNavigate();
  useEffect(() => {
    if (!roomId) return;
    socket.emit("check_room", roomId);
    socket.on("room_exists", (exists) => {
      if (!exists) {
        navigate("/");
      }
    });
    return () => {
      socket.off("room_exists");
    };
  }, [roomId, navigate]);

  useEffect(() => {
    const handleJoined = (roomIdFromServer: string, failed?: boolean) => {
      if (failed) {
        navigate("/");
      } else setRoomId(roomIdFromServer);
    };
    socket.on("joined", handleJoined);
    return () => {
      socket.off("joined", handleJoined);
    };
  }, [navigate, setRoomId]);

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("join_room", roomId as string, name);
  };

  return (
    <div className="py-5 d-flex flex-column  gap-5 ">
      <div className="col-lg-4 p-5 border border-dark rounded-2 mx-auto d-flex flex-column align-items-center">
        <h1 className="text-dark fw-bold">Board Verse</h1>
        <h3 className="text-dark fw-bold">Join this Room</h3>
        <form className="form col-md-12" onSubmit={handleJoinRoom}>
          <div className="form-group">
            <input
              type="text"
              className="form-control my-2"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit" className="mt-4 btn btn-dark form-control">
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInput;
