import FloatingButton from "../../utils/FloatingButton";
import { CgMenuRight } from "react-icons/cg";
import React, { useRef, useState } from "react";
import useScroll from "../../utils/useScroll";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

const MenuIcon = ({ toggleMenu }) => {
	const isScrolled = useScroll("top-navbar");
	const buttonRef = useRef(null);
	const [buttonTransform, setButtonTransform] = useState("translate(0, 0)");
	const [iconTransform, setIconTransform] = useState("translate(0, 0)");

	const hoverRadius = 20;
	const buttonSpeed = 0.5;
	const iconSpeed = 0.5;

	const handleMouseMove = (e) => {
		if (buttonRef.current) {
			const button = buttonRef.current.getBoundingClientRect();
			const buttonCenterX = button.left + button.width / 2;
			const buttonCenterY = button.top + button.height / 2;

			const dx = e.clientX - buttonCenterX;
			const dy = e.clientY - buttonCenterY;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < hoverRadius) {
				setButtonTransform(`translate(${dx * buttonSpeed}px, ${dy * buttonSpeed}px)`);
				setIconTransform(`translate(${dx * iconSpeed}px, ${dy * iconSpeed}px)`);
			} else {
				resetTransforms();
			}
		}
	};

	const handleMouseLeave = () => {
		resetTransforms();
	};

	const resetTransforms = () => {
		setButtonTransform("translate(0, 0)");
		setIconTransform("translate(0, 0)");
	};
	return (
		<>
			<div
				className="relative"
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				<button
					ref={buttonRef}
					className={`rounded-full md:py-2 py-5 px-5 flex items-center justify-center ${
						isScrolled
							? "text-black border border-black"
							: "text-white hover:bg-black duration-200 hover:border-black border border-white"
					} `}
					onClick={toggleMenu}
				>
					<span className="flex relative items-center justify-center">
						<span className="mr-8 md:block hidden">Menu</span>
						<HiOutlineMenuAlt4
							size={24}
							className="absolute md:right-0 -translate-x-1/2 top-1/2 -translate-y-1/2"
							style={{
								transform: `translate(0%, -50%) ${iconTransform}`,
								transition: "transform 0.3s ease",
							}}
						/>
					</span>
				</button>
			</div>
		</>
	);
};

export default MenuIcon;

{
	/* <FloatingButton
    icon={CgMenuRight}
    handleClick={toggleMenu}
    classStyle="p-[1rem] [rotate:180deg]"
    iconSize={28}
    hoverRadius={25}
    buttonSpeed={0.3}
    iconSpeed={0.9}
/> */
}
