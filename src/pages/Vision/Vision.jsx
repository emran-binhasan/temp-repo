import { useScroll } from "framer-motion";
import React from "react";
import useScrollToTop from "../../utils/useScrollToTop";
import banner from "../../assets/images/banners/vision.jpg";
import bg from "../../assets/images/banners/vision_bg.jpg";
import Markdown from "../../utils/Markdown";
import useTitle from "../../utils/useTitle";

/* ------ TODO: delete this code when you ar fetching data from server ------ */
const data = [
	{
		id: 1,
		title: "Background",
		body: "Bangladesh is a young and developing nation with long history and culture. Over the last 20 years, Bangladesh has seen consistent GDP growth of above 5%. It is projected to become a middle income country by the year 2021. Today, Bangladesh is the 44th largest economy in the world. Goldman Sachs, a leading Investment Bank, has included Bangladesh in the next 11 countries known as the N-11 as one of the emerging economies of the world after the BRIC nations of Brazil, Russia, India and China. Similarly, Price Waterhouse Coopers (PWC) has added Bangladesh in PWC30 list as one of the long term potential growth economy of the World by 2050.\n Its youthful 160 million people are extremely resilient and prepared to take on many challenges of life. Living in fertile riverine land, Bangladeshis are also natural entrepreneurs and traders. The story of one of Bangladesh’s oldest industrial groups, A.K. Khan & Company Ltd, is intimately woven into the nation’s past, present and future.",
	},
	{
		id: 2,
		title: "About Us",
		body: `### Best Approach to Financial Consultancy \n Its youthful 160 million people are extremely resilient and prepared to take on many challenges of life. Living in fertile riverine land, Bangladeshis are also natural entrepreneurs and traders. The story of one of Bangladesh’s oldest industrial groups, A.K. Khan & Company Ltd, is intimately woven into the nation’s past, present and future.`,
	},
	{
		id: 3,
		title: "Our Vision",
		body: `To strive for business excellence through Joint Ventures to match the state of the art technologies and R&D of our foreign partners coupled with the expertise and extensive industrial experience of our group to compete in the global economy. \n To strive for business excellence through Joint Ventures to match the state of the art technologies and R&D of our foreign partners coupled with the expertise and extensive industrial experience of our group to compete in the global economy. \n To strive for business excellence through Joint Ventures to match the state of the art technologies and R&D of our`,
	},
	{
		id: 4,
		title: "Our Mission",
		body: `
- To create optimum value for all our stakeholders by adhering to the highest ethical standards.
- To pursue customer satisfaction relentlessly through deliverance of high quality products and services.
- To strive for providing employment opportunity to reduce unemployment.
- To create centers of excellence in industrial and service sectors through Joint Ventures.
- To contribute to the well being of the society by acting as a responsible corporate citizen through valuable CSR activities.`,
	},
];

const Vision = () => {
	const isScrolled = useScroll("top-navbar");
	useScrollToTop();
	useTitle("Vision & Mission");

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
			<div className="flex flex-col mx-4 lg:mx-16 gap-y-10 lg:gap-y-28">
				<h1 className="text-[1.63rem] uppercase mt-4 text-center lg:text-[2.63rem] font-semibold w-full whitespace-nowrap text-black">
					Vision & Mission
				</h1>
				{data.map((tab) => (
					<div
						key={tab.id}
						className="flex flex-col p-4"
						style={{
							backgroundImage: `url(${bg})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
						}}
					>
						<p className="text-[1.63rem] mb-6 leading-[2.2rem] md:leading-[2.7rem] lg:text-[2.63rem] font-semibold w-full whitespace-nowrap text-black">
							{tab.title}
						</p>
						<Markdown content={tab.body} />
					</div>
				))}
			</div>
		</div>
	);
};

export default Vision;
