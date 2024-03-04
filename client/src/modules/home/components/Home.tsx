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
  const [tab, setTab] = useState("create");

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
    <section>
      <h1 className=" fw-bold mt-5 text-center" style={{ fontSize: "45px" }}>
        Board Verse
      </h1>
      <p className="text-center">
        Your go-to online collaboration and teaching tool 🚀 
      </p>

      <div
        className={`py-5 d-flex flex-column gap-5 ${
          tab === "create" ? "flex-column" : "flex-column-reverse"
        } `}
      >
        <div className="col-lg-4 p-5 border border-dark rounded-2 mx-auto d-flex flex-column align-items-center">
          <div>
            <img src="/vite.svg" alt="Board Verse logo" />
            <h2 className="text-dark fw-bold">Create Room</h2>
          </div>
          <input
            type="text"
            className="form-control my-2"
            placeholder="Enter your display name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={handleCreateRoom}
            className="mt-4 btn btn-dark btn-block form-control"
          >
            Generate Room
          </button>
          <p
            onClick={() => setTab("join")}
            className="link-success"
            style={{
              color: "blue",
              cursor: "pointer",
              marginTop: 5,
              textAlign: "center",
            }}
          >
            Have a room code? Join here
          </p>
        </div>
        <div className="col-lg-4 mx-auto diverText">
          <span className="position-relative ">OR</span>
        </div>
        <div className="col-lg-4 p-5 border border-dark rounded-2 mx-auto d-flex flex-column align-items-center">
          <div>
            <img src="/vite.svg" alt="Board Verse logo" />
            <h2 className="text-dark fw-bold">Join Room</h2>
          </div>
          <form className="form col-md-12" onSubmit={handleJoinRoom}>
            <div className="form-group">
              <input
                type="text"
                className="form-control my-2"
                placeholder="Enter your display name"
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
            <p
              onClick={() => setTab("create")}
              className="link-success"
              style={{
                color: "blue",
                cursor: "pointer",
                marginTop: 5,
                textAlign: "center",
              }}
            >
              Create a new room here!
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Home;
