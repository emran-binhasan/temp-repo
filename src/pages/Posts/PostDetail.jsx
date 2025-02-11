import React from "react";
import { useLocation } from "react-router-dom";
import Markdown from "../../utils/Markdown";
import useScrollToTop from "../../utils/useScrollToTop";
import useTitle from "../../utils/useTitle";
import BackBtn from "../../utils/BackBtn";
import { MdError } from "react-icons/md";
import Button from "../../utils/Button";

const PostDetail = () => {
	const location = useLocation(); // Get the location object
	const { post } = location.state || {}; // Extract the post data from location.state
	const [error, setError] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);

	useScrollToTop();
	useTitle(post?.title || "Loading...");

	if (!post) {
		setError(true); // If no post data is passed, set an error state
	}

	return (
		<>
			{isLoading && (
				<div className="h-screen bg-white fixed inset-0 z-[9999] w-screen flex justify-center items-center">
					<div className="font-anton w-[200px] md:w-[230px] text-white bg-nill py-2 shadow-xl shadow-black/40 rounded-lg flex flex-col justify-center items-center text-justify">
						<h1 className="mb-1 text-5xl border-b-2 border-white md:text-6xl">Loading...</h1>
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
						<Button
							content="Go to Home"
							handleClick={() => window.location.href = "/"}
							classStyle="mt-8"
						/>
					</div>
				</div>
			)}
			{!error && post && (
				<div className="pt-28 px-2 lg:px-[10rem]">
					<Markdown classStyle="mb-8 text-3xl font-medium" content={post?.blog_title} />
					<img src={post?.image_url} alt={post?.blog_title} className="w-full mb-8" />
					<Markdown content={post?.blog_body} />
					<div className="mt-4">
					<BackBtn />
					</div>
				</div>
			)}
		</>
	);
};

export default PostDetail;
