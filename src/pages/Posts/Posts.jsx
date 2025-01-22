import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Markdown from "../../utils/Markdown";
import FloatingButton from "../../utils/FloatingButton";
import { ChevronLeft } from "lucide-react";
import useScrollToTop from "../../utils/useScrollToTop";
import useTitle from "../../utils/useTitle";

const Posts = () => {
	const { id } = useParams();
	const [post, setPost] = useState([]);
	const navigate = useNavigate();
	useScrollToTop();
	useTitle(`${post.title}`);

	const goBack = () => {
		navigate(-1);
	};

	useEffect(() => {
		fetch("/data.json")
			.then((response) => response.json())
			.then((data) => {
				const post = data.find((item) => item.id === parseInt(id));
				setPost(post);
			})
			.catch((error) => console.log(error));
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
					icon={ChevronLeft}
					borderColor="white"
					iconSize={20}
					hoverRadius={25}
					buttonSpeed={0.3}
					iconSpeed={0.9}
					classnames={"border mt-10 border-black h-[2.580rem] w-[7.580rem]"}
					handleClick={goBack}
				/>
			</div>
		</div>
	);
};

export default Posts;
