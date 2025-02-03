import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "../../utils/Markdown";
import FloatingButton from "../../utils/FloatingButton";
import { IoIosArrowBack } from "react-icons/io";
import useScrollToTop from "../../utils/useScrollToTop";
import useTitle from "../../utils/useTitle";
import axios from "axios";

const Posts = () => {
	const { id } = useParams();
	const [post, setPost] = useState([]);
	const navigate = useNavigate();
	useScrollToTop();
	useTitle(`${post.title}`);

	const goBack = () => {
		navigate(-1);
	};

	useEffect(async () => {
		// fetch(`${import.meta.env.VITE_API_URL}/blogs/?id=${id}`)
		// 	.then((response) => response.json())
		// 	.then((data) => {
		// 		console.log("data: ", data);
		// 		const post = data.find((item) => item.id === parseInt(id));
		// 		setPost(post);
		// 	})
		// 	.catch((error) => console.log(error));
		try {
			const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
			const data = response.data;
			console.log("data: ", data);
			const post = data.find((item) => item.id === parseInt(id));
		} catch (error) {
			console.log("error: ", error);
		}
	}, [id]);

	return (
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
				<FloatingButton
					icon={IoIosArrowBack}
					borderColor="white"
					iconSize={20}
					hoverRadius={25}
					buttonSpeed={0.3}
					iconSpeed={0.9}
					classStyle={"border mt-10 border-black h-[2.580rem] w-[7.580rem]"}
					handleClick={goBack}
				/>
			</div>
		</div>
	);
};

export default Posts;
