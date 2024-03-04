import { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const client = new Keycloak({
  url: "http://localhost:8080",
  realm: "whiteboard-realm-react",
  clientId: "whiteboard-client-react",
});

const useAuth = () => {
  const isRun = useRef(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    client
      .init({
        onLoad: "login-required",
      })
      .then((res) => {
        if (client.token !== undefined) {
          setIsLogin(res);
          setToken(client.token);
        }
      });
  }, []);

  return [isLogin, token];
};

export default useAuth;
