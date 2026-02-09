import { useState } from "react";
const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  const getData = async (endpoint) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
      });
      const data = await response.json();
      setLoading(false);
       return {
      status: response.status,
      ...data,
    };
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  const postData = async (endpoint, body, optional = false) => {
    setLoading(true);
    setError(null);

    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (!optional) {
        headers["Content-Type"] = "application/json";
      }

      const response = await fetch(`${endpoint}`, {
        method: "POST",
        headers,
        body: optional ? body : JSON.stringify(body),
      });

      const data = await response.json();
      setLoading(false);
      return {
      status: response.status,
      ...data,
    };
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  return {
    getData,
    postData,
    loading,
    error,
  };
};
export default useApi;
