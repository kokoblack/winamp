const VideoIsLoading = () => {
	return (
		<div className="w-full flex justify-center items-center flex-wrap gap-[2%]">
			{[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((e, i) => (
				<div key={i} className="w-[23.5%] flex justify-start items-start flex-col animate-pulse mb-[3%] max-lap:w-[32%] max-tablet:w-[48%]">
					<div className=" w-full h-[8rem] bg-dark_grey rounded-xl mb-1"></div>
					<div className="bg-dark_grey w-[45%] h-[.5rem] mb-1"></div>
					<div className="bg-dark_grey w-[20%] h-[.5rem]"></div>
				</div>
			))}
		</div>
	);
};

export default VideoIsLoading