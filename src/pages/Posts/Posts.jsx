import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "../../utils/Markdown";
import FloatingButton from "../../utils/FloatingButton";
import { IoIosArrowBack } from "react-icons/io";
import useScrollToTop from "../../utils/useScrollToTop";
import useTitle from "../../utils/useTitle";
import BackBtn from "../../utils/BackBtn";

const Posts = () => {
	const { id } = useParams();
	const [post, setPost] = useState([]);
	const navigate = useNavigate();
	useScrollToTop();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	useTitle(`${post.title}`);

	const goBack = () => {
		navigate(-1);
	};

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
				setError(error);
			});
	}, [id]);

	return (
		<>
			{isLoading && (
				<div className="h-screen bg-white fixed inset-0 z-[9999] w-screen flex justify-center items-center">
					<div className="font-anton w-[200px] md:w-[230px] text-white bg-nill py-2 shadow-xl shadow-black/40 rounded-lg flex flex-col justify-center items-center text-justify">
						<h1 className="text-5xl md:text-6xl border-b-2 mb-1 border-white">A.K.Khan</h1>
						<p className="text-lg tracking-[0.2em]">Securities Ltd</p>
					</div>
				</div>
			)}
			{error && (
				<div className="flex justify-center items-center h-[50vh]">
					<p className="text-red-500">{error.message}</p>
				</div>
			)}
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
		</>
	);
};

export default Posts;
