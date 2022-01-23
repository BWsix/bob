import axios from "axios";
import { getAntiCSRFToken, resolver } from "blitz";
import { useEffect, useState } from "react";

export const useAttachment = (id?: string) => {
  const [file, setFile] = useState<Blob>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const antiCSRFToken = getAntiCSRFToken();

    axios({
      url: `/api/download/${id}`,
      headers: { "anti-csrf": antiCSRFToken },
      responseType: "blob",
      method: "get",
    })
      .then((res) => {
        if (res.status !== 200 || !(res.data instanceof Blob)) {
          setError(res.data || "Error");
          setLoading(false);
          return;
        }

        setFile(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error");
        setLoading(false);
      });
  }, [id]);

  return [file, loading, error] as const;
};
