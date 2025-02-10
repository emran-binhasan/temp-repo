import useScrollToTop from "../../utils/useScrollToTop";
import useScroll from "../../utils/useScroll";
import banner from "../../assets/images/banners/management.jpg";
import profile from "../../assets/images/banners/management-team.png";
import useTitle from "../../utils/useTitle";
import Markdown from "../../utils/Markdown";
import { useState, useEffect } from "react";

const Management = () => {
	const isScrolled = useScroll("top-navbar");
	useScrollToTop();
	useTitle("Management Team");

	const [data, setData] = useState([]);
	const [error, setError] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		const fetchData = async () => {
			try {
				const response = await fetch(`${import.meta.env.VITE_API_URL}/management`);

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
				<h1 className="text-[1.63rem] lg:text-[2.2rem] mt-8 font-medium uppercase text-center w-full whitespace-nowrap text-black mb-8">
					Management Team
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
						<Markdown content={tab.designation} />
						<Markdown content={tab.description} />
					</div>
				))}
				{error && (
					<div className="flex flex-col items-center justify-center h-[20vh]">
						<h2 className="text-2xl font-medium text-black">Something went wrong</h2>
						<p className="mt-4 text-lg text-dhusor">Please refresh the page.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default Management;
