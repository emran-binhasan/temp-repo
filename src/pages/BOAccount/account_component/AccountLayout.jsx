import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "../../../assets/styles/account.css";

const AccountLayout = () => {
	const navLinks = [
		{ id: 1, to: "/open-bo-account/bo-type", text: "DP & BO Type" },
		{ id: 2, to: "/open-bo-account/basic", text: "Basic Information" },
		{ id: 3, to: "/open-bo-account/bank", text: "Bank Account" },
		{ id: 4, to: "/open-bo-account/nominees", text: "Nominees" },
		{ id: 5, to: "/open-bo-account/complete", text: "Complete" },
	];
	const location = useLocation();
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

	const formData = JSON.parse(localStorage.getItem("formData")) || [];

	return (
		<>
			<div className="flex flex-col gap-y-8">
				<div>
					<h2 className="text-hDhusor">Registration</h2>
					<h1 className="text-[1.63rem] lg:text-[2.53rem] tracking-tight font-bold w-full whitespace-nowrap text-dhusor">
						BO Account Opening
					</h1>
				</div>

				<ul className="flex justify-between items-center">
					{navLinks.map((link, index) => {
						const isFilled = formData?.some((data) => data?.id === link.text);
						const isActive = location.pathname === link.to;

						return (
							<li
								key={link.id}
								className="w-fit"
							>
								<Link
									to={link.to}
									onClick={(e) => {
										if (!formData[index] || Object.keys(formData[index]).length === 0) {
											e.preventDefault();
											alert("Please complete the form on this page before navigating.");
										}
									}}
									// className={`flex items-center justify-start gap-x-2 py-1 px-4 rounded-full duration-300 hover:bg-nill hover:text-white ${
									// 	isActive ? "bg-nill text-white" : ""
									// } ${isFilled ? "bg-green-500 text-white" : "text-black"}`}
									className={`flex whitespace-nowrap rounded-full duration-300`}
								>
									{/* Conditional rendering for smaller devices */}
									<span
										className={`flex lg:hidden items-center justify-start gap-x-2 py-1 px-4 rounded-full duration-300 ${
											isActive ? "bg-nill text-white" : ""
										} ${isFilled ? "bg-green-500 text-white" : "text-black"}`}
									>
										{/* If the link is active, show both the number and text */}
										{isActive ? `${link.id}. ${link.text}` : link.id}
									</span>
									{/* Always show both the number and text on larger devices */}
									<span
										className={`lg:flex hidden items-center justify-start gap-x-2 py-1 px-4 rounded-full duration-300  ${
											isActive ? "text-nill" : ""
										} ${isFilled ? "" : "text-black"}`}
									>
										<span
											className={`flex justify-center items-center h-[2.2rem] w-[2.2rem] rounded-full ${
												isActive ? "bg-nill text-white" : ""
											} ${isFilled ? "bg-green-500 " : "text-black"}`}
										>
											{link.id}.
										</span>
										{link.text}
									</span>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</>
	);
};

export default AccountLayout;
