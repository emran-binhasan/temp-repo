import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Markdown from "../../utils/Markdown";
import useScrollToTop from "../../utils/useScrollToTop";
import useTitle from "../../utils/useTitle";
import BackBtn from "../../utils/BackBtn";
import { MdError } from "react-icons/md";
import Button from "../../utils/Button";

const Posts = () => {
	const { id } = useParams();
	const [post, setPost] = useState([]);
	useScrollToTop();
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	useTitle(`${post.title}`);

	useEffect(() => {
		setIsLoading(true);
		fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				setIsLoading(false);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				return response.json();
			})
			.then((data) => {
				const post = data.data.find((item) => item.id === parseInt(id));
				setPost(post);
			})
			.catch((error) => {
				setIsLoading(false);
				setError(true);
			});
	}, [id]);

	return (
		<>
			{isLoading && (
				<div className="h-screen bg-white fixed inset-0 z-[9999] w-screen flex justify-center items-center">
					<div className="font-anton w-[200px] md:w-[230px] text-white bg-nill py-2 shadow-xl shadow-black/40 rounded-lg flex flex-col justify-center items-center text-justify">
						<h1 className="mb-1 text-5xl border-b-2 border-white md:text-6xl">A.K.Khan</h1>
						<p className="text-lg tracking-[0.2em]">Securities Ltd</p>
					</div>
				</div>
			)}
			{error && (
				<div className="w-full h-screen bg-white">
					<div className="flex flex-col items-center justify-center h-full mx-4 lg:mx-32">
						<div className="mb-4 text-red-600">
							<MdError size={80} />
						</div>
						<h1 className="mb-4 text-3xl font-bold">Page not Found</h1>
						<p className="text-center">We’re sorry, the page you requested could not be found</p>
						<p className="text-center">Please go back to the home page.</p>

						<Button
							content={"Go to Home"}
							handleClick={() => (window.location.href = "/")}
							classStyle="mt-8"
						/>
					</div>
				</div>
			)}
			{!error && (
				<div className="pt-28 px-2 lg:px-[10rem]">
					<div>
						{/* <h1 className="mb-2 text-3xl font-bold text-black">{post.title}</h1> */}
						<Markdown
							classStyle={"mb-8"}
							content={post?.title}
						/>
						<img
							src={post?.image}
							alt=""
							className="w-full mb-8"
						/>
						<Markdown content={post?.body} />
						<BackBtn />
					</div>
				</div>
			)}
		</>
	);
};

export default Posts;
