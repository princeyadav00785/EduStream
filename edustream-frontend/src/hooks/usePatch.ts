import { useState } from "react";

interface ApiResponse<T> {
  data: T | null;
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
  patchData: (formData: any) => Promise<void>;
}

const usePatch = <T,>(url: string): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const patchData = async (formData: any) => {
    setIsLoading(true);
    setIsSuccess(false);
    setError(null);

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update data");

      const result: T = await response.json();
      setData(result);
      setIsSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isSuccess, error, patchData };
};

export default usePatch;
