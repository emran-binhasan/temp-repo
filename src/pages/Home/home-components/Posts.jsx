import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Markdown from "../../../utils/Markdown";

const Posts = () => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		const fetchData = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/blogs`);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setData(data.data);
				setIsLoading(false);
				setError(false);
			} catch (error) {
				setError(true);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	return (
		<div className="container px-6 pt-6 mx-auto ">
			<h2 className="text-[2.2rem] leading-[2.8rem] font-semibold text-black mb-4">Latest Posts</h2>
			<div className="grid grid-cols-1 space-y-6 lg:grid-cols-3 gap-x-8 sm:space-y-0">
				{data.map((item) => (
					<Link
						to={`/post/${item.id}`}
						key={item.id}
						className="relative group"
					>
						<div className="overflow-hidden">
							<img
								className="transition-transform duration-[2000ms] transform group-hover:scale-110"
								src={item.image_url}
								alt=""
							/>
						</div>
						<Markdown content={item.blog_title} />
					</Link>
				))}
			</div>
			{error && (
				<div className="flex items-center justify-center">
					<div className="flex flex-col items-center justify-center text-black gap-y-2">
						<h3 className="text-xl font-medium">Error fetching data</h3>
						<p>Please refresh the page</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default Posts;
