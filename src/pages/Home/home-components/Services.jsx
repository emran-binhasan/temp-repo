import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";
import img1 from "../../../assets/images/tabs/1.jpeg";
import img2 from "../../../assets/images/tabs/2.jpeg";
import img3 from "../../../assets/images/tabs/3.jpeg";
import img4 from "../../../assets/images/tabs/4.jpeg";
import Markdown from "../../../utils/Markdown";

const tabsData = [
	{
		id: 1,
		label: "Brokerage Service",
		image: img1,
		para: `A. K. Khan Securities Limited is dedicated to delivering excellence in brokerage services, offering exciting prospects to both individual and institutional investors. Regardless of your trading frequency or the size of your account, entrusting us with your investments ensures you receive the utmost care and attention. We are committed to providing unparalleled service and opportunities that align with your financial aspirations.With A. K. Khan Securities, your investment journey is in safe hands.`,
	},
	{
		id: 2,
		label: "IPO Application",
		image: img2,
		para: `Embark on an investment journey in the flourishing stock market of Bangladesh with IPO Application - your ultimate gateway to accessing and applying for exciting Initial Public Offerings.Our intuitive platform allows you to effortlessly explore the latest IPOs, analyze company profiles, and submit applications seamlessly. Don't let this chance slip away to be a part of Bangladesh's thriving investment landscape.Join IPO Application now and confidently build your portfolio for a prosperous future.`,
	},
	{
		id: 3,
		label: "DP Service",
		image: img3,
		para: `
### Best Approach to Security Consultancy
Join thousands of satisfied investors who trust DP Service to navigate the complex world of stocks with ease. Don't miss out on lucrative opportunities - start your journey toward financial freedom today with DP Service.

### Financial Analysis
Financial analysis plays a vital role in driving strategic decisions and ensuring sustainable growth. If you need insights, tools, or specific methodologies to enhance your work, feel free to ask!
    `,
	},
	{
		id: 4,
		label: "Margin Loan Facilities",
		image: img4,
		para: `Unlock the potential of your stock market investments with our cutting-edge Margin Loan Facilities tailored for the dynamic stock market in Bangladesh.Empower yourself to seize profitable opportunities and maximize returns. With flexible terms and competitive interest rates, leverage your existing portfolio to amplify your investment power.Don’t let financial constraints hold you back – capitalize on the market’s potential with our Margin Loan Facilities and elevate your investment journey to new heights. Contact us today to get started.`,
	},
];

const Services = () => {
	return (
		<div className="flex flex-col mx-4 mt-24 lg:mx-32">
			<div className="flex flex-col items-center justify-between my-20 lg:flex-row gap-x-8">
				<h1 className="text-[2.2rem] text-center w-full whitespace-nowrap text-black mb-8">
					<span className="font-semibold">About</span>{" "}
					<span className="italic font-semibold">Us</span>
				</h1>
				<p className="text-justify max-w-prose text-black text-[15px] leading-[1.60rem] [word-spacing:5px]">
					A K Khan is the sole owner of the information collected on this site. We will not sell,
					share, or rent this information to others in ways different from what is disclosed in this
					policy.
					<br />
					<br />
					At A K Khan, we do not collect any personal information unless you choose to share such
					information.
					<br />
					<br />
					If you do choose to share personal information via some form of correspondence, such
					information will not be shared, sold, or rented to others whatsoever.
				</p>
			</div>
			{/* tab section */}
			<div className="flex flex-col items-center justify-center">
				<h2 className="text-[2.2rem] font-semibold text-black mb-8">Our Services</h2>
				<div>
					<AnimatedTabs tabs={tabsData} />
				</div>
			</div>
		</div>
	);
};

const AnimatedTabs = ({ tabs }) => {
	const [activeTab, setActiveTab] = useState(0);
	const [sliderStyle, setSliderStyle] = useState({});
	const tabRefs = useRef([]);

	useEffect(() => {
		// Set initial slider position
		if (tabRefs.current[activeTab]) {
			const tabElement = tabRefs.current[activeTab];
			setSliderStyle({
				width: `${tabElement.offsetWidth}px`,
				left: `${tabElement.offsetLeft}px`,
			});
		}
	}, []);

	const handleTabClick = (index) => {
		if (index !== activeTab) {
			const tabElement = tabRefs.current[index];
			setSliderStyle({
				width: `${tabElement.offsetWidth}px`,
				left: `${tabElement.offsetLeft}px`,
			});
			setActiveTab(index);
		}
	};

	return (
		<div className="w-full mx-auto">
			<div className="relative mb-4">
				{/* Button grid */}
				<div className="grid grid-cols-2 gap-y-2 lg:grid-cols-4">
					{tabs.map((tab, index) => (
						<button
							key={index}
							ref={(el) => (tabRefs.current[index] = el)}
							className={`px-0 lg:px-4 rounded-full hover:text-white duration-300 hover:bg-nill relative z-20 whitespace-nowrap focus:outline-0 py-2 lg:py-5 text-sm lg:text-lg font-semibold ${
								activeTab === index ? "text-[#ffffff] bg-nill" : "text-black"
							}`}
							onClick={() => handleTabClick(index)} // Ensures tab stays active
						>
							<span>{tab.label}</span>
						</button>
					))}
				</div>

				{/* Slider */}
				<div
					className="absolute bottom-0 z-10 transition-all duration-300 rounded-full h-fit lg:h-full bg-nill"
					style={sliderStyle}
				/>
			</div>

			<div className="mt-8">
				{tabs.map((tab, index) => (
					<div
						key={index}
						className={`transition-opacity duration-300 ${
							activeTab === index ? "opacity-100 text-black" : "opacity-0 hidden"
						}`}
					>
						<Fade triggerOnce>
							<div className="grid grid-cols-1 gap-4 lg:grid-cols-4 ">
								<div className="w-full col-span-1">
									<img
										src={tab.image}
										alt="tab image"
										className="w-full"
									/>
								</div>
								<div className="col-span-3">
									<h4 className="block my-2 text-xl font-semibold text-center md:hidden">
										{tab.label}
									</h4>
									<Markdown
										classStyle={"leading-[1.60rem] text-[15px]"}
										content={tab.para}
									/>
								</div>
							</div>
						</Fade>
					</div>
				))}
			</div>
		</div>
	);
};

export default Services;
