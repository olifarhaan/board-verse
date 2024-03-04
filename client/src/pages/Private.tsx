import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Private = ({ token }: { token: string | null }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL as string;
  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const isRun = useRef(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    const fetchData = async () => {
      const res = await fetch(`${BASE_URL}/test`, {
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      const responseJSON = await res.json();

      if (!res.ok || !responseJSON.success) {
        setErrorMessage(responseJSON.message);
      } else {
        setData(responseJSON.message);
      }
    };
    try {
      if (token !== null) fetchData();
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      Private
      <Link to={"/public"}>Go To Public</Link>
      {loading ? (
        <p>Loading...</p>
      ) : errorMessage ? (
        <p>{errorMessage}</p>
      ) : (
        data && <ul>{data}</ul>
      )}
    </div>
  );
};

export default Private;
