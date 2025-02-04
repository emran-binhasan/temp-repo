import React, { useEffect, useState } from "react";
import useScrollToTop from "../../utils/useScrollToTop";
import useScroll from "../../utils/useScroll";
import banner from "../../assets/images/banners/director.jpg";
import useTitle from "../../utils/useTitle";

import Markdown from "../../utils/Markdown";

const Directors = () => {
	const isScrolled = useScroll("top-navbar");
	useScrollToTop();
	useTitle("Board of Directors");
	const [data, setData] = useState([]);
	console.log("data: ", data);

	//
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			fetch(`${import.meta.env.VITE_API_URL}/board-of-directors`)
				.then((res) => res.json())
				.then((data) => {
					setData(data.data);
					setIsLoading(false);
				});
		} catch (error) {
			console.log("error: ", error.message);
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="">
			<div className={`h-72 w-full overflow-hidden ${isScrolled ? "" : ""}`}>
				<img
					src={banner}
					alt="banner"
					className={`object-cover w-full h-full duration-700
                        ${isScrolled ? "scale-105" : "scale-100"}`}
				/>
			</div>
			<div className="flex flex-col px-4 lg:mx-32 gap-y-28">
				<h1 className="text-[1.63rem] lg:text-[2.63rem] mt-8 font-medium uppercase text-center w-full whitespace-nowrap text-black mb-8">
					Board of Directors
				</h1>
				{data.map((tab) => (
					<div
						key={tab.id}
						className="flex flex-col lg:flex-row gap-x-16 gap-y-4"
					>
						<img
							src={tab.image_url}
							className="h-auto block lg:mx-0 mx-auto w-auto max-w-[200px] max-h-[200px] object-cover"
						/>
						<div className="flex flex-col justify-start gap-y-4">
							<h2 className="mb-2 text-3xl font-bold text-black">{tab.name}</h2>
							{/* <Markdown content={tab.description} /> */}
							<p className="whitespace-pre-line">{tab.description}</p>
							<p className="whitespace-pre-line">{tab.designation}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Directors;
