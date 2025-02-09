import React, { useState, useEffect, useRef } from "react";

import icon from "../assets/icons/logo.png";
import icon1 from "../assets/icons/logo1.png";
import useScroll from "../utils/useScroll";
import FloatingButton from "../utils/FloatingButton";
import { Link } from "react-router-dom";
import Menu from "./header-components/Menu";
import MenuBar from "./header-components/MenuBar";
import MenuIcon from "./header-components/MenuIcon";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [sections, setSections] = useState([]);
	const animationRef = useRef(null);
	const menuRef = useRef(null);
	const isScrolled = useScroll("top-navbar");

	useEffect(() => {
		const calculateSections = () => {
			const totalWidth = window.innerWidth;
			const sectionWidth = totalWidth / 4;

			const newSections = Array(4)
				.fill(0)
				.map((_, index) => ({
					left: index * sectionWidth,
					width: isMenuOpen ? sectionWidth : 0,
					delay: index * 0,
					index,
				}));

			setSections(newSections);
		};

		calculateSections();
		window.addEventListener("resize", calculateSections);
		return () => {
			window.removeEventListener("resize", calculateSections);
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [isMenuOpen]);

	const animateSections = (timestamp, startTime, isOpening) => {
		const totalWidth = window.innerWidth;
		const sectionWidth = totalWidth / 5;
		const duration = 800;

		setSections((prevSections) =>
			prevSections.map((section) => {
				const delay = isOpening ? section.delay : 300 - section.delay;
				const elapsed = timestamp - startTime - delay;
				const progress = Math.min(Math.max(elapsed / duration, 0), 1);

				return {
					...section,
					width: isOpening ? progress * sectionWidth : (1 - progress) * sectionWidth,
				};
			})
		);

		const shouldContinue = isOpening
			? sections.some((section) => section.width < sectionWidth)
			: sections.some((section) => section.width > 0);

		if (shouldContinue) {
			animationRef.current = requestAnimationFrame((newTimestamp) =>
				animateSections(newTimestamp, startTime, isOpening)
			);
		}
	};

	const toggleMenu = () => {
		if (animationRef.current) {
			cancelAnimationFrame(animationRef.current);
		}

		const startTime = performance.now();
		animationRef.current = requestAnimationFrame((timestamp) =>
			animateSections(timestamp, startTime, !isMenuOpen)
		);

		setIsMenuOpen(!isMenuOpen);
	};

	const [showAboutUs, setShowAboutUs] = useState(false);

	/* ---- Add or remove the class to dis/en-able scrolling inside cart div ---- */
	useEffect(() => {
		if (isMenuOpen) {
			document.body.classList.add("overflow-hidden");
		} else {
			document.body.classList.remove("overflow-hidden");
		}
	}, [isMenuOpen]);

	return (
		<>
			<div
				className={`flex duration-700 fixed py-5 pr-4 pl-5 lg:px-20 z-50 top-0 w-full justify-between  
					${isScrolled ? "bg-opacity-100 bg-white shadow-xl" : "bg-opacity-20 bg-gray-800"}
					`}
				id="top-navbar"
			>
				<div className="flex items-center justify-start gap-x-3">
					{/* menu icon */}
					<MenuIcon toggleMenu={toggleMenu} />

					<div className="">
						{isScrolled ? (
							<Link to="/">
								<img
									src={icon}
									alt="logo"
									className="h-8 ml-2 md:h-10 w-fit"
								/>
							</Link>
						) : (
							<Link to="/">
								<img
									src={icon1}
									alt="logo"
									className="h-8 ml-2 md:h-10 w-fit"
								/>
							</Link>
						)}
					</div>
				</div>

				{/* menubar  */}
				<MenuBar isScrolled={isScrolled} />
			</div>

			{/* Full Screen Menu */}
			<Menu
				menuRef={menuRef}
				isMenuOpen={isMenuOpen}
				toggleMenu={toggleMenu}
				sections={sections}
				showAboutUs={showAboutUs}
				setShowAboutUs={setShowAboutUs}
			/>
		</>
	);
};

export default Header;
