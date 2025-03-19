import { logout } from "@/redux/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  postData: (formData: any) => Promise<void>;
}

const usePost = <T extends object>(url: string): ApiResponse<T> => { 
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const postData = async (formData: any) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData),
      });

         if (response.status === 403) {
                dispatch(logout()); 
                localStorage.removeItem("authToken"); 
                router.push("/");
                return;
              }

      if (response.status==403||response.status==500||response.status==400) {
        const errorData = await response.json(); 
        throw new Error(errorData?.message || "Failed to post data");  
      }

      const result: T = await response.json();
      setData(result);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isSuccess, error, postData };
};

export default usePost;
