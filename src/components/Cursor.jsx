import { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useLocation } from "react-router-dom"; // Import useLocation

const Cursor = () => {
	const [isHovering, setIsHovering] = useState(false);
	const [cursorStyle, setCursorStyle] = useState("default");
	const [customText, setCustomText] = useState("");
	const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Detect mobile

	const location = useLocation(); // Detect route changes

	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
	const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

	// Detect screen size changes
	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	// Reset cursor on route change
	useEffect(() => {
		setIsHovering(false);
		setCursorStyle("default");
		setCustomText("");
	}, [location.pathname]);

	useEffect(() => {
		if (isMobile) return; // Disable custom cursor on mobile

		document.body.style.cursor = "none"; // Hide default cursor

		const moveCursor = (event) => {
			mouseX.set(event.clientX);
			mouseY.set(event.clientY);
		};

		const handleMouseOver = (event) => {
			const cursorType = event.target.dataset.cursor;
			setIsHovering(true);

			if (cursorType === "play") {
				setCursorStyle("play");
				setCustomText("PLAY");
			} else if (cursorType === "drag") {
				setCursorStyle("drag");
				setCustomText("Drag");
			} else if (cursorType === "hidden") {
				setCursorStyle("hidden");
				setCustomText("");
			} else {
				setCursorStyle("default");
				setCustomText("");
			}
		};

		const handleMouseOut = () => {
			setIsHovering(false);
			setCursorStyle("default");
			setCustomText("");
		};

		window.addEventListener("mousemove", moveCursor);
		document
			.querySelectorAll('a, button, [onclick], [role="button"], [data-cursor]')
			.forEach((element) => {
				element.addEventListener("mouseover", handleMouseOver);
				element.addEventListener("mouseout", handleMouseOut);
			});

		return () => {
			document.body.style.cursor = "default";
			window.removeEventListener("mousemove", moveCursor);
			document
				.querySelectorAll('a, button, [onclick], [role="button"], [data-cursor]')
				.forEach((element) => {
					element.removeEventListener("mouseover", handleMouseOver);
					element.removeEventListener("mouseout", handleMouseOut);
				});
		};
	}, [mouseX, mouseY, isMobile]);

	if (isMobile) return null; // Hide cursor on mobile

	return (
		<>
			{/* Inner Cursor */}
			<motion.div
				className={`fixed bg-black rounded-full z-5 pointer-events-none ${
					cursorStyle === "drag" || cursorStyle === "play" || cursorStyle === "hidden" ? "hidden" : ""
				} shadow cursor-content`}
				style={{
					left: springX,
					top: springY,
					width: isHovering ? "16px" : "8px",
					height: isHovering ? "16px" : "8px",
					transition: "width 0.3s ease-out, height 0.3s ease-out",
				}}
			></motion.div>

			{/* Outer Border Cursor */}
			<motion.div
				className={`fixed pointer-events-none z-50 rounded-full border-2 
					${cursorStyle === "drag" || cursorStyle === "play" ? " bg-white font-semibold flex items-center justify-center" : "border-black"}
				`}
				style={{
					left: springX,
					top: springY,
					width:
						cursorStyle === "drag"
							? "90px"
							: cursorStyle === "play"
							? "120px"
							: isHovering
							? "60px"
							: "48px",
					height:
						cursorStyle === "drag"
							? "90px"
							: cursorStyle === "play"
							? "120px"
							: isHovering
							? "60px"
							: "48px",
					transform: "translate(-50%, -50%)",
					transition: "all 0.3s ease-out",
				}}
			>
				{/* Custom Text inside Cursor */}
				{customText && (
					<span className="absolute text-sm font-medium transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
						{customText}
					</span>
				)}
			</motion.div>
		</>
	);
};

export default Cursor;
