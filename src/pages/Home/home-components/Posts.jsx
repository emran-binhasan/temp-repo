import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Markdown from "../../../utils/Markdown";

const Posts = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			fetch(`${import.meta.env.VITE_API_URL}/blogs`)
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
		</div>
	);
};

export default Posts;
