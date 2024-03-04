import { FaEraser } from "react-icons/fa";
import { useOptions } from "../../../../recoil/options";

const Eraser = () => {

    const [options, setOptions]=useOptions()
  return <button className={`btn btn-lg text-white ${options.erase && "bg-success" }`}
  onClick={()=>{
    setOptions((prev)=> ({...prev, erase: !prev.erase}))
  }}
  >
    <FaEraser/>
  </button>
};

export default Eraser;
 