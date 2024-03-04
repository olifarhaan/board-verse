import { Routes, Route } from "react-router-dom";
import Home from "./pages/HomePage.tsx";
import useAuth from "./hooks/useAuth.tsx";
import RoomPage from "./pages/RoomPage.tsx";
import "./index.css";
import PrivateRoute from "./components/PrivateRoute.tsx";

function App() {
  const [isLogin]: any = useAuth();
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute isLogin={isLogin} />}>
        <Route path="/" element={<Home />} />
        <Route path="/:roomId" element={<RoomPage />} />
      </Route>
    </Routes>
  );
}

export default App;
