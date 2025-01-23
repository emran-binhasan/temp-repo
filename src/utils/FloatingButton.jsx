import React, { useRef, useState } from "react";
import useScroll from "./useScroll";

const FloatingButton = ({
	icon: Icon,
	iconSize = 20,
	hoverRadius = 20,
	buttonSpeed = 0.5,
	iconSpeed = 1.0,
	paddingSize,
	handleClick,
	classStyle,
}) => {
	const isScrolled = useScroll("top-navbar");
	const buttonRef = useRef(null);
	const [buttonTransform, setButtonTransform] = useState("translate(0, 0)");
	const [iconTransform, setIconTransform] = useState("translate(0, 0)");

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
		<div
			className="relative"
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<button
				ref={buttonRef}
				className={`rounded-full relative flex items-center justify-center ${
					isScrolled ? "text-black" : "text-white"
				} ${classStyle}`}
				style={{
					transform: buttonTransform,
					transition: "transform 0.3s ease",
					padding: paddingSize,
				}}
				onClick={handleClick}
			>
				{Icon && (
					<Icon
						size={iconSize}
						className="absolute"
						style={{
							transform: iconTransform,
							transition: "transform 0.3s ease",
						}}
					/>
				)}
			</button>
		</div>
	);
};

export default FloatingButton;
