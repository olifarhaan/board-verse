import {Outlet } from "react-router-dom";

const PrivateRoute = ({isLogin}: {isLogin:boolean} ) => {

  return (isLogin? <Outlet/> : null)
};

export default PrivateRoute;