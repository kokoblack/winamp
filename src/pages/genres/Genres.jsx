import React from 'react'

const Genres = () => {

  // useEffect(() => {
  //   axios
  //     .get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       // recentlyPlayedReducer.dispatch({
  //       //   type: "RECENTLY_PLAYED_DATA",
  //       //   payload: res.data.items,
  //       // });
  //       console.log(res.data)
  //     })
  //     .catch((err) => console.log(err));
  // }, [token]);

  return (
    <div>Genres</div>
  )
}

export default Genres