import { useEffect, useState } from "react";

export const apiDataCall = (query, token) => {
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/${query}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [token, query]);

  return data
}
