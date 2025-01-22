import React, { useState, useEffect, useRef } from "react";
import { MenuIcon, X, Facebook, Linkedin, Twitter, ChevronDown, Phone, SearchIcon, User } from "lucide-react";
import icon from "../assets/icons/logo.png";
import icon1 from "../assets/icons/logo1.png";
import useScroll from "../utils/useScroll";
import FloatingButton from "../utils/FloatingButton";
import { Link, NavLink } from "react-router-dom";
import Button from "../utils/Button";
import { CgMenuLeft } from "react-icons/cg";

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
					<FloatingButton
						icon={CgMenuLeft}
						handleClick={toggleMenu}
						classnames="1rem"
						iconSize={34}
						hoverRadius={25}
						buttonSpeed={0.3}
						iconSpeed={0.9}
					/>
					<div className="hidden md:block ml-2 xl:ml-6 lg:ml-4">
						{isScrolled ? (
							<Link to="/">
								<img
									src={icon}
									alt="logo"
									className="h-10  w-fit"
								/>
							</Link>
						) : (
							<Link to="/">
								<img
									src={icon1}
									alt="logo"
									className="h-10 ml-2 w-fit"
								/>
							</Link>
						)}
					</div>
				</div>
				<div
					className={`flex items-center justify-end gap-x-3
					${isScrolled ? "text-black" : "text-white"}
					`}
				>
					<button
						className={`px-[0.15rem] bg-white relative overflow-hidden py-[0.130rem] border rounded-full 
							${isScrolled ? "border-black" : "border-white text-black"} 
							before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-black 
							before:translate-y-[-100%] hover:before:translate-y-[100%] before:transition-transform before:duration-1000 before:ease-in-out`}
					>
						<span
							className={`flex p-[0.60rem] lg:px-[1.60rem] lg:py-[0.400rem] relative z-20 items-center justify-center rounded-full gap-x-2 ${
								isScrolled ? "bg-white" : "bg-white"
							} `}
						>
							<Phone
								size={20}
								strokeWidth={1.2}
							/>
							<span className="hidden lg:block">+88028833510</span>
						</span>
					</button>
					<Link to="/open-bo-account/bo-type">
						<Button
							classStyle="hidden lg:flex items-center justify-center gap-x-2"
							icon={
								<User
									size={20}
									strokeWidth={1.2}
								/>
							}
							content="Open BO Account"
						/>
					</Link>

					<FloatingButton
						icon={SearchIcon}
						iconSize={20}
						hoverRadius={25}
						buttonSpeed={0.3}
						iconSpeed={0.9}
						classnames={`lg:w-[2.580rem] lg:h-[2.580rem] w-[2.790rem] h-[2.790rem] ${
							isScrolled ? "border border-black" : "border border-white"
						}`}
					/>
				</div>
			</div>

			{/* Full Screen Menu */}
			<div
				className={`
                fixed inset-0 w-screen h-screen z-[999]
                ${isMenuOpen ? "visible" : "invisible"}
            `}
			>
				{/* Background sections */}
				<div className="absolute inset-0">
					{sections.map((section) => (
						<div
							key={section.index}
							className="absolute top-0 bottom-0 bg-[#151414] transition-all duration-700"
							style={{
								left: section.left,
								width: section.width,
								transitionDelay: `${section.delay}ms`,
							}}
						/>
					))}
				</div>

				{/* Menu content */}
				<div
					ref={menuRef}
					className={`
                        relative lg:mx-[3.2rem] my-2 w-full h-full text-[#f3f3f3] z-50
                        transition-opacity duration-500
                        ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}
					style={{
						transitionDelay: isMenuOpen ? "300ms" : "0ms",
					}}
				>
					{/* Close button */}
					<button
						onClick={toggleMenu}
						className="absolute top-0 left-0 z-50 text-white lg:top-5 lg:left-4"
					>
						<X
							size={32}
							strokeWidth={1.5}
						/>
					</button>

					{/* Navigation */}
					<div className="relative grid justify-between w-full h-full grid-cols-1 px-6 pt-12 lg:px-6 lg:pt-32 lg:grid-cols-2 lg:gap-x-10 xl:flex-row">
						{/* overlay */}
						<div
							className={`
                        absolute inset-0 bg-[#181717] 
                        transform transition-transform duration-[1500ms] ease-in-out
                        ${isMenuOpen ? "translate-x-full" : "translate-x-0 pointer-events-none"}
                    `}
							style={{
								transitionDelay: isMenuOpen ? "700ms" : "0ms",
							}}
						/>
						{/* links */}
						<ul className="font-eina md:pt-6  nav_link text-[18px] lg:text-[20px] flex flex-col gap-y-2 lg:gap-y-3 duration-300">
							<NavLink
								to="/"
								className="font-semibold cursor-pointer links"
								onClick={toggleMenu}
							>
								Home
							</NavLink>
							<li
								className={`flex items-center justify-between w-full -mb-3 font-semibold cursor-pointer links ${
									showAboutUs ? "border-b border-white" : ""
								}`}
								onClick={() => setShowAboutUs((prev) => !prev)}
							>
								About Us <ChevronDown size={20} />
							</li>
							{/* when about us is clicked show the below contents  */}
							<div
								className={`overflow-hidden  duration-700 ease-in-out  ${
									showAboutUs ? "max-h-40" : "max-h-0"
								}`}
							>
								<ul className="flex flex-col pl-8 text-base lg:mt-4 lg:mb-2 gap-y-1 lg:gap-y-5">
									<NavLink
										to="/directors"
										className="cursor-pointer"
										onClick={toggleMenu}
									>
										Board of Directors
									</NavLink>
									<NavLink
										to="/corporate"
										className="cursor-pointer"
										onClick={toggleMenu}
									>
										Corporate Profile
									</NavLink>
									<NavLink
										to="/management"
										className="cursor-pointer"
										onClick={toggleMenu}
									>
										Management Team
									</NavLink>
								</ul>
							</div>
							<NavLink
								to="/services"
								onClick={toggleMenu}
								className="font-semibold cursor-pointer links"
							>
								Services
							</NavLink>
							<a
								className="font-semibold cursor-pointer links"
								href="http://dsebd.org/"
								target="_blank"
								rel="noreferrer"
								onClick={toggleMenu}
							>
								Market Watch
							</a>
							<NavLink
								to="/vision"
								className="font-semibold cursor-pointer links"
								onClick={toggleMenu}
							>
								Vision & Mission
							</NavLink>
							<NavLink
								to="/download"
								onClick={toggleMenu}
								className="font-semibold cursor-pointer links"
							>
								Download
							</NavLink>
							<NavLink
								to="/contact"
								className="font-semibold cursor-pointer links"
								onClick={toggleMenu}
							>
								Contact
							</NavLink>
						</ul>
						{/* Contact Information */}
						<div className=" grid font-medium grid-cols-1 max-w-[570px] font-vietnam text-[13px]">
							<div className="grid grid-cols-1 lg:grid-cols-2">
								<div>
									<h4 className="text-[#696969] mb-1.5 lg:mb-6 font-semibold">
										Chattogram Office:
									</h4>
									<p>
										Batali Hills, Chattagram 4000, GPO <br /> Box: 223, Bangladesh
									</p>
								</div>
								<div>
									<h4 className="text-[#696969] mb-1.5 lg:mb-6 font-semibold">Info:</h4>
									<p>
										Tel: (+88-031)-611050-2 <br />
										Fax: (+88-031)-610596 <br />
										akkan.corporateoffice@akkan.com
									</p>
								</div>
							</div>
							<div className="grid grid-cols-1 lg:grid-cols-2">
								<div>
									<h4 className="text-[#696969] mb-1.5 lg:mb-6 font-semibold">
										Dhaka Office:
									</h4>
									<p>
										Bay's Galleria(2nd floor), 57, Gulshan
										<br /> Avenue-1, Dhaka-1212, Bangladesh
									</p>
									<div className="flex w-full mt-2 lg:mt-6 gap-x-5">
										<p className="flex items-center gap-x-1">
											<Facebook size={16} />
											Facebook
										</p>
										<p className="flex items-center gap-x-1">
											<Linkedin size={16} />
											LinkedIn
										</p>
										<p className="flex items-center gap-x-1">
											<Twitter size={16} />
											Twitter
										</p>
									</div>
								</div>
								<div>
									<h4 className="text-[#696969] mb-1.5 lg:mb-6 font-semibold">Info:</h4>
									<p>
										Tel: (+88-02)-8833510, 8833578,
										<br /> 8833521, 8833540
									</p>
									<p>Fax: (+88-02)-8831275</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
