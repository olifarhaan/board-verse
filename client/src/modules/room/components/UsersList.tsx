import { useRoom } from "../../../recoil/room";

const UsersList = () => {
  const { users } = useRoom();

  return (
    <div className="pe-none  position-absolute d-flex p-2"
    style={{zIndex:30}}
    >
      {[...users.keys()].map((userId, index) => {
        return (
          <div
            key={userId}
            className="d-flex select-none align-items-center justify-content-center rounded-circle text-sm text-light px-3 py-2"
            style={{
              backgroundColor: users.get(userId)?.color || "black",
              marginLeft: index !== 0 ? "-1rem" : 0,
            }}
          >
            {users.get(userId)?.name.split("")[0].toUpperCase() || "A"}
          </div>
        );
      })}
    </div>
  );
};

export default UsersList;
