import {Outlet } from "react-router-dom";

const PrivateRoute = ({isLogin}: {isLogin:boolean} ) => {

  console.log(isLogin, "IsloggedIn");

  return (isLogin? <Outlet/> : null)
};

export default PrivateRoute;