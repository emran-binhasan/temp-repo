import React, { useEffect, useRef, useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import img1 from "../../../assets/images/tabs/1.jpeg";
import img2 from "../../../assets/images/tabs/2.jpeg";
import img3 from "../../../assets/images/tabs/3.jpeg";
import img4 from "../../../assets/images/tabs/4.jpeg";

const Services = () => {
	const tabsData = [
		{
			id: 1,
			label: <p>Brokerage Service</p>,
			image: img1,
			para: (
				<p>
					A. K. Khan Securities Limited is dedicated to delivering excellence in brokerage services,
					offering exciting prospects to both individual and institutional investors. Regardless of
					your trading frequency or the size of your account, entrusting us with your investments
					ensures you receive the utmost care and attention. We are committed to providing
					unparalleled service and opportunities that align with your financial aspirations.With A.
					K. Khan Securities, your investment journey is in safe hands.
				</p>
			),
		},
		{
			id: 2,
			label: <p>IPO Application</p>,
			image: img2,
			para: (
				<p>
					Embark on an investment journey in the flourishing stock market of Bangladesh with IPO
					Application - your ultimate gateway to accessing and applying for exciting Initial Public
					Offerings.Our intuitive platform allows you to effortlessly explore the latest IPOs,
					analyze company profiles, and submit applications seamlessly. Don't let this chance slip
					away to be a part of Bangladesh's thriving investment landscape.Join IPO Application now
					and confidently build your portfolio for a prosperous future.
				</p>
			),
		},
		{
			id: 3,
			label: <p>DP Service</p>,
			image: img3,
			para: (
				<p>
					Best Approach to Security Consultancy Join thousands of satisfied investors who trust DP
					Service to navigate the complex world of stocks with ease. Don't miss out on lucrative
					opportunities - start your journey toward financial freedom today with DP Service.
					Financial Analysis Financial analysis plays a vital role in driving strategic decisions
					and ensuring sustainable growth. If you need insights, tools, or specific methodologies to
					enhance your work, feel free to ask!
				</p>
			),
		},
		{
			id: 4,
			label: <p>Margin Loan Facilities</p>,
			image: img4,
			para: (
				<p>
					Unlock the potential of your stock market investments with our cutting-edge Margin Loan
					Facilities tailored for the dynamic stock market in Bangladesh.Empower yourself to seize
					profitable opportunities and maximize returns. With flexible terms and competitive
					interest rates, leverage your existing portfolio to amplify your investment power.Don’t
					let financial constraints hold you back – capitalize on the market’s potential with our
					Margin Loan Facilities and elevate your investment journey to new heights. Contact us
					today to get started.
				</p>
			),
		},
	];

	return (
		<div className="flex flex-col mx-4 mt-24 lg:mx-16">
			<div className="flex flex-col items-center justify-between my-20 lg:flex-row gap-x-8">
				<h1 className="text-[2.63rem] text-center w-full whitespace-nowrap text-black mb-8">
					<span className="font-semibold">About</span>{" "}
					<span className="italic font-semibold">Us</span>
				</h1>
				<p className="text-justify max-w-prose text-black text-[17px] leading-6 [word-spacing:5px]">
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
				<h2 className="text-[2.63rem] font-semibold text-black mb-8">Our Services</h2>
				<AnimatedTabs tabs={tabsData} />
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
				<div className="grid grid-cols-4">
					{tabs.map((tab, index) => (
						<button
							key={index}
							ref={(el) => (tabRefs.current[index] = el)}
							className={`px-1 lg:px-4 rounded-full hover:text-white duration-300 hover:bg-nill relative z-20 whitespace-nowrap focus:outline-0 py-0.5 lg:py-5 text-sm lg:text-lg font-semibold ${
								activeTab === index ? "text-[#ffffff]" : "text-black"
							}`}
							onClick={() => handleTabClick(index)}
						>
							<span className="hidden md:block">{tab.label}</span>
							<span className="block md:hidden">{tab.id}</span>
						</button>
					))}
				</div>
				<div
					className="absolute bottom-0 z-10 h-full transition-all duration-300 rounded-full bg-nill"
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
							<div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row gap-x-8">
								<div className="w-full">
									<img
										src={tab.image}
										alt=""
										className="w-full"
									/>
								</div>
								<div>
									<p className="block my-2 text-xl font-semibold text-center md:hidden">
										{tab.label}
									</p>
									<p className="text-black text-justify text-[17px] leading-6 [word-spacing:5px]">
										{tab.para}
									</p>
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
