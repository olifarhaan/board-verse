import { Link } from "react-router-dom";

const Public = () => {
  return <div>Public
  <Link to={"/private"} >Go To Private</Link>
</div>;
};

export default Public;
