import React from "react";
import img1 from "../../../assets/images/marquee/1.jpeg";
import img2 from "../../../assets/images/marquee/2.jpeg";
import img3 from "../../../assets/images/marquee/3.jpeg";
import img4 from "../../../assets/images/marquee/4.jpeg";
import banner from "../../../assets/images/banners/ipo.jpg";
import useScroll from "../../../utils/useScroll";
import Markdown from "../../../utils/Markdown";
import Cursor from "../../../components/Cursor";

/* ------ TODO: delete this code when you ar fetching data from server ------ */
const data = [
	{
		id: 1,
		title: "Brokerage Service",
		image: img1,
		body: "A. K. Khan Securities Limited is dedicated to delivering excellence in brokerage services, offering exciting prospects to both individual and institutional investors. Regardless of your trading frequency or the size of your account, entrusting us with your investments ensures you receive the utmost care and attention. We are committed to providing unparalleled service and opportunities that align with your financial aspirations.With A. K. Khan Securities, your investment journey is in safe hands.",
	},
	{
		id: 2,
		title: "IPO Application",
		image: img2,
		body: "Embark on an investment journey in the flourishing stock market of Bangladesh with IPO Application - your ultimate gateway to accessing and applying for exciting Initial Public Offerings.Our intuitive platform allows you to effortlessly explore the latest IPOs, analyze company profiles, and submit applications seamlessly. Don't let this chance slip away to be a part of Bangladesh's thriving investment landscape.Join IPO Application now and confidently build your portfolio for a prosperous future.",
	},
	{
		id: 3,
		title: "DP Service",
		image: img3,
		body: `Best Approach to Security Consultancy Join thousands of satisfied investors who trust DP Service to navigate the complex world of stocks with ease. Don’t miss out on lucrative opportunities – start your journey toward financial freedom today with DP Service. Financial Analysis Financial analysis plays a vital role in driving strategic decisions and ensuring sustainable growth. If you need insights, tools, or specific methodologies to enhance your work, feel free to ask!`,
	},
	{
		id: 4,
		title: "Margin Loan Facilities",
		image: img4,
		body: "Unlock the potential of your stock market investments with our cutting-edge Margin Loan Facilities tailored for the dynamic stock market in Bangladesh.Empower yourself to seize profitable opportunities and maximize returns. With flexible terms and competitive interest rates, leverage your existing portfolio to amplify your investment power.Don’t let financial constraints hold you back – capitalize on the market’s potential with our Margin Loan Facilities and elevate your investment journey to new heights. Contact us today to get started.",
	},
];

const Service = () => {
	const isScrolled = useScroll("top-navbar");

	return (
		<>
		<Cursor/>
			<div className={`h-72 w-full overflow-hidden`}>
				<img
					src={banner}
					alt="banner"
					className={`object-cover w-full h-full duration-700
                        ${isScrolled ? "scale-105" : "scale-100"}`}
				/>
			</div>
			<div className="flex flex-col mx-4 md:mx-6 lg:mx-32 gap-y-28">
				<h1 className="text-[1.63rem] uppercase mt-4 text-center lg:text-[2.2rem] font-semibold w-full whitespace-nowrap text-black">
					Services
				</h1>
				{data.map((tab) => (
					<div
						key={tab.id}
						className="flex flex-col gap-y-4 lg:flex-row gap-x-16"
					>
						<img
							src={tab.image}
							alt=""
							className="lg:w-[60%] w-[100%] aspect-square object-cover"
						/>
						<div className="flex flex-col items-start justify-center lg:w-2/3 gap-y-4">
							<h2 className="text-[1.63rem] lg:text-[2.2rem] font-semibold w-full whitespace-nowrap text-black">
								{tab.title}
							</h2>
							{/* Body rendered as Markdown */}
							<Markdown content={tab.body} />
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default Service;
