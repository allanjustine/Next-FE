import { useState, useEffect } from "react";
import api from "../../lib/axiosCall";

const useFetch = (url: any, isRefresh: boolean) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!url) return;
    setError(null);
    setIsOpen(true);
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
        setIsOpen(false);
      }
    };

    fetchData();
  }, [url, isRefresh]);

  return { data, loading, error, isOpen };
};

export default useFetch;
