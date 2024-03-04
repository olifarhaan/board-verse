import { FormEvent, useEffect, useState } from "react";
import { socket } from "../../../utils/socket";
import { useNavigate } from "react-router-dom";
import { useSetRoomId } from "../../../recoil/room";
import { toast } from "react-toastify";

const Home = () => {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const setAtomRoomId = useSetRoomId();
  const navigate = useNavigate();

  useEffect(() => {
    socket.on("created", (roomIdFromServer: string) => {
      setAtomRoomId(roomIdFromServer);
      navigate(`/${roomIdFromServer}`);
    });
    const handleJoinedRoom = (roomIdFromServer: string, failed?: boolean) => {
      if (!failed) {
        setAtomRoomId(roomIdFromServer);
        navigate(`/${roomIdFromServer}`);
      } else {
        console.error("error encountered while joining");
        toast.error("Room does not exist");
      }
    };

    socket.on("joined", handleJoinedRoom);

    return () => {
      socket.off("created");
      socket.off("joined", handleJoinedRoom);
    };
  }, [navigate, setAtomRoomId]);

  const handleCreateRoom = () => {
    socket.emit("create_room", username);
  };

  const handleJoinRoom = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit("join_room", roomId, username);
  };

  return (
    <div className="py-5 d-flex flex-column  gap-5 ">
      <h1 className="text-center fw-bold" style={{fontSize:"45px"}}>Board Verse</h1>
      <div className="col-lg-4 p-5 border border-dark rounded-2 mx-auto d-flex flex-column align-items-center">
        <h2 className="text-dark fw-bold">Create Room</h2>
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={handleCreateRoom}
          className="mt-4 btn btn-dark btn-block form-control"
        >
          Generate Room
        </button>
      </div>
      <div className="col-lg-4 mx-auto diverText">
        <span className="position-relative ">OR</span>
      </div>
      <div className="col-lg-4 p-5 border border-dark rounded-2 mx-auto d-flex flex-column align-items-center">
        <h1 className="text-dark fw-bold">Join Room</h1>
        <form className="form col-md-12" onSubmit={handleJoinRoom}>
          <div className="form-group">
            <input
              type="text"
              className="form-control my-2"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control my-2"
              placeholder="Enter room code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
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

export default Home;
