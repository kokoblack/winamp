import axios from "axios";

const GetArtistData = (token, setLoading, setArtist) => {
  axios
    .get(
      "https://api.spotify.com/v1/artists?ids=3tVQdUvClmAT7URs9V3rsp,687cZJR45JO7jhk1LHIbgq,0Y3agQaa6g2r0YmHPOO9rh,3wcj11K77LjEY1PkEazffa,3zaDigUwjHvjOkSn0NDf9x,6LuN9FCkKOj5PcnpouEgny,66CXWjxzNUsdJxJ2JdwvnR,0hCNtLu0JehylgoiP8L4Gh,7tYKF4w9nC0nq9CsPZTHyP,5ZS223C6JyBfXasXxrRqOk,2gzWmhOZhDN6gXL49JW9qj,2gzWmhOZhDN6gXL49JW9qj,6qqNVTkY8uBg9cP3Jd7DAH,0du5cEVh5yTK9QJze8zA0C,6vWDO969PvNqNYHIOW5v0m,2YZyLoL8N0Wb9xBt1NhZWg,7dGJo4pcD2V6oG8kP0tJRR,3ZpEKRjHaHANcpk10u6Ntq,687cZJR45JO7jhk1LHIbgq,5yOvAmpIR7hVxiS6Ls5DPO,75VKfyoBlkmrJFDqo1o2VY,3TVXtAsR1Inumwj472S9r4,6eUKZXaKkcviH0Ku9w2n3V,1Xyo4u8uXC1ZmMpatF05PJ,4dpARuHxo51G3z768sgnrY,5WUlDfRSoLAfcVSX1WnrxN,0X2BH1fck6amBIoJhDVmmJ,2wUjUUtkb5lvLKcGKsKqsR,4nDoRrQiYLoBzwC5BhVJzF,0ZED1XzwlLHW4ZaG4lOT6m,0C8ZW7ezQVs4URX5aX7Kqx,26VFTg2z8YR0cCuwLzESi2,2wY79sveU1sp5g7SokKOiI,1uNFoZAHBGtllmzznpCI3s,5K4W6rqBFWDnAN6FQUkS6x,4kYGAK2zu9EAomwj3hXkXy,7bXgB6jMjp9ATFy66eO08Z,6l3HvQ5sa6mXTsMTB19rO5,5pKCCKE2ajJHZ9KAiaK11H",
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    )
    .then((res) => {
      const artist = res.data.artists.map((e) => {
        return {
          id: e.id,
          name: e.name,
          image: e.images[0].url,
          followers: e.followers,
        };
      });

      const jsonObject = artist.map(JSON.stringify);
      const uniqueSet = new Set(jsonObject);
      const removeDuplicate = Array.from(uniqueSet).map(JSON.parse);

      const uniqueData = [];
      removeDuplicate.forEach((e) => {
        if (e.url === null) {
          null;
        } else {
          uniqueData.push(e);
        }
      });
      setArtist(uniqueData);
      setLoading(false);
    })
    .catch((err) => console.log(err));
};

export default GetArtistData