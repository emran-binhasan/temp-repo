import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../assets/styles/account.css";

const AccountLayout = () => {
	const navLinks = [
		{ id: 1, to: "/open-bo-account/bo-type", text: "DP & BO Type" },
		{ id: 2, to: "/open-bo-account/basic", text: "Basic Information" },
		{ id: 3, to: "/open-bo-account/bank", text: "Bank Account" },
		{ id: 4, to: "/open-bo-account/nominees", text: "Nominees" },
		{ id: 5, to: "/open-bo-account/complete", text: "Complete" },
	];

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
		<>
			<div className="flex flex-col gap-y-8">
				<div>
					<h2 className="text-hDhusor">Registration</h2>
					<h1 className="text-[1.63rem] lg:text-[2.53rem] tracking-tight font-bold w-full whitespace-nowrap text-dhusor">
						BO Account Opening
					</h1>
				</div>
				{/* <div className="relative">
					<div className="flex items-center justify-between">
						{navLinks.map((link, index) => (
							<Link
								key={index}
								to={link.to}
								ref={(el) => (tabRefs.current[index] = el)}
								className={`px-4 hover:text-white text-sm hover:shadow-md shadow-gray-700/50 font-medium flex justify-center items-center gap-x-2 rounded-full hover:text-null duration-300 hover:bg-nill relative z-20 whitespace-nowrap focus:outline-0 ring-0 py-2 ${
									activeTab === index ? "text-white" : "text-hDhusor"
								}`}
								onClick={() => handleTabClick(index)}
							>
								<span className="font-semibold">{link.id}</span>
								<span>{link.text}</span>
							</Link>
						))}
					</div>
					<div
						className="absolute bottom-0 z-10 h-full transition-all duration-300 border-0 rounded-full bg-nill"
						style={sliderStyle}
					/>
				</div> */}
				<ul className="grid w-full grid-cols-2 gap-4 lg:grid-cols-4">
					{navLinks.map((link, index) => (
						<li
							key={link.id}
							className="w-fit"
						>
							<NavLink
								to={link.to}
								onClick={(e) => {
									const formData = JSON.parse(localStorage.getItem("formData")) || [];
									if (!formData[index] || Object.keys(formData[index]).length === 0) {
										e.preventDefault();
										alert("Please complete the form on this page before navigating.");
									}
								}}
								className={({ isActive }) => {
									const formData = JSON.parse(localStorage.getItem("formData")) || [];
									const isFilled = formData.some((data) => data.id === link.text);

									return `flex hover:bg-nill hover:text-white duration-300 py-1 px-4 rounded-full justify-start items-center gap-x-2 ${
										isActive ? "active_link" : ""
									} ${isFilled ? "bg-green-500 text-white" : ""}`;
								}}
							>
								<span>{link.id}</span>
								<span>{link.text}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default AccountLayout;
