import { logout, persistor } from "@/redux/store";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

const useGet = <T>(url: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem("authToken");
      console.log(token);
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        // if (response.status === 403) {
        //   dispatch(logout());
        //   localStorage.removeItem("authToken");
        //   persistor.pause();
        //   await persistor.flush();
        //   persistor.purge();
        //   document.cookie =
        //     "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        //   router.push("/");
        //   return;
        // }
        if (!response.ok) throw new Error("Failed to fetch data");

        const result: T = await response.json();
        setData(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useGet;
