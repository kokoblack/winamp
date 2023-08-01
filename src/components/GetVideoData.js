import axios from "axios";
import { convertTimeToSeconds, formatTime } from "../components/GetDuration";

const GetVideoData = (setLoading, setVideos) => {
	axios
		.get(
			"https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&videoCategoryId=10&key=AIzaSyDg1A1tBfPOIL7OHMRFkw7KY3o0H68cDF8&maxResults=50",
			{
				headers: {
					Accept: "application/json",
				},
			}
		)
		.then((res) => {
			const vid = res.data.items.map((e) => {
				const duration = convertTimeToSeconds(
					e.contentDetails.duration
				);
				const time = formatTime(duration);
				return {
					duration: time,
					id: e.id,
					image: e.snippet.thumbnails.medium.url,
					name: e.snippet.localized.title,
					artist: e.snippet.channelTitle,
				};
			});
			console.log(vid);
			setLoading(false);
			setVideos(vid);
		})
		.catch((err) => console.log(err));
};

export default GetVideoData;
