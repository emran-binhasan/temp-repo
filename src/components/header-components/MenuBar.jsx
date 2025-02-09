import React from "react";
import { FaPhone, FaUser } from "react-icons/fa6";
import FloatingButton from "../../utils/FloatingButton";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import Button from "../../utils/Button";

const MenuBar = ({ isScrolled }) => {
	return (
		<div
			className={`flex items-center justify-end gap-x-3
					${isScrolled ? "text-black" : "text-white"}
					`}
		>
			<button
				onClick={() => (window.location.href = "tel:+88028833510")}
				className={`px-[0.15rem] bg-white relative overflow-hidden py-[0.130rem] border rounded-full 
			${isScrolled ? "border-black" : "border-white text-black"} 
			before:content-[''] before:absolute before:-top-0 before:left-0 before:w-full before:h-full before:bg-black 
			before:translate-y-[-100%] hover:before:translate-y-[100%] before:transition-transform before:duration-1000 before:ease-in-out`}
			>
				<span
					className={`flex p-[0.60rem] lg:px-[1.60rem] lg:py-[0.400rem] relative z-20 items-center justify-center rounded-full gap-x-2 ${
						isScrolled ? "bg-white" : "bg-white"
					} `}
				>
					<FaPhone
						size={20}
						strokeWidth={1.2}
					/>
					<span className="hidden lg:block">+88028833510</span>
				</span>
			</button>
			<Link
				to="/open-bo-account/bo-type"
				className="hidden lg:block"
			>
				<Button
					classStyle="flex items-center justify-center gap-x-2"
					icon={
						<FaUser
							size={20}
							strokeWidth={1.2}
						/>
					}
					content="Open BO Account"
				/>
			</Link>
			<Link
				to="/open-bo-account/bo-type"
				className={`block p-3 border duration-300 rounded-full lg:hidden
						${isScrolled ? "border-black" : "border-white"}`}
			>
				<FaUser size={20} />
			</Link>

			<FloatingButton
				icon={IoSearch}
				iconSize={20}
				hoverRadius={25}
				buttonSpeed={0.3}
				iconSpeed={0.9}
				classStyle={`lg:w-[2.580rem] lg:h-[2.580rem] w-[2.790rem] h-[2.790rem] ${
					isScrolled ? "border border-black" : "border border-white"
				}`}
			/>
		</div>
	);
};

export default MenuBar;
