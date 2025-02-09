import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Marquees from "./Marquee";
import thm from "../../../assets/images/videoThmb.jpg";
import img5 from "../../../assets/images/game.webp";
import { IoClose } from "react-icons/io5";
import { Slide } from "react-awesome-reveal";
import { FaPlay } from "react-icons/fa6";

const ThirdSec = () => {
	const [bgColor, setBgColor] = useState("#f4f4f4");
	const [lastScrollY, setLastScrollY] = useState(0);

	useEffect(() => {
		let isScrollingUp = false;

		const handleScroll = () => {
			isScrollingUp = window.scrollY < lastScrollY;
			setLastScrollY(window.scrollY);
		};

		const options = {
			threshold: 0.4,
		};

		const observer = new IntersectionObserver((entries) => {
			const sortedEntries = [...entries].sort((a, b) => {
				const rectA = a.boundingClientRect;
				const rectB = b.boundingClientRect;
				return isScrollingUp ? rectB.top - rectA.top : rectA.top - rectB.top;
			});

			const intersectingEntry = sortedEntries.find((entry) => entry.isIntersecting);

			if (intersectingEntry) {
				const theme = intersectingEntry.target.getAttribute("data-bg-color");
				if (theme === "gradient") {
					setBgColor("linear-gradient(to bottom, green 70%, white)");
				} else {
					setBgColor(theme);
				}
			}
		}, options);

		window.addEventListener("scroll", handleScroll);
		const targets = document.querySelectorAll(".child");
		targets.forEach((target) => observer.observe(target));

		return () => {
			window.removeEventListener("scroll", handleScroll);
			targets.forEach((target) => observer.unobserve(target));
		};
	}, [lastScrollY]);

	const [isOpen, setIsOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	const videoUrl = "https://www.youtube.com/embed/WDtxIl837j0";

	const [isVisible, setIsVisible] = useState(false);
	const headingRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!headingRef.current) return;

			const rect = headingRef.current.getBoundingClientRect();
			const isInView = rect.top >= 0 && rect.top <= window.innerHeight;

			if (isInView) {
				setIsVisible(true);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const lines = ["Our", "Corporate Video"]; // Define lines separately

	const [fontSize, setFontSize] = useState(() => (window.innerWidth < 640 ? "38px" : "100%"));

	useEffect(() => {
		const handleResize = () => {
			setFontSize(window.innerWidth < 640 ? "38px" : "100%");
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<>
			<div
				className="transition-colors duration-700 mt-[14rem] parent"
				style={{ backgroundColor: bgColor }}
			>
				{/* first child */}
				<div
					data-bg-color="#4a0202"
					className="relative flex items-center justify-center child"
				>
					<div className="w-full">
						<div className="absolute left-0 z-20 w-full -top-48">
							<Marquees />
						</div>
						<div className="flex flex-col gap-y-6 lg:flex-row mx-4 lg:mx-32 justify-around gap-x-16 items-start mt-[23rem] sm:mt-[17rem] lg:mt-[26rem]">
							<div className="flex-1">
								<img
									src={img5}
									alt=""
									className="w-[40rem] h-auto"
								/>
							</div>
							<div className="flex-1">
								<h1 className="text-[2.20rem] text-left sm:text-justify md:text-left leading-[2.8rem] font-bold text-white">
									A Game-Changer for My Investment Strategy!
								</h1>
								<p className="text-[#FFFFFFD4] text-justify mt-4 lg:mt-6 leading-[1.60rem] text-[15px]">
									As an investor, I’ve always been cautious, but since partnering with
									AKKHAN Securities Ltd, my approach to the capital markets has completely
									transformed. The insights, analysis, and tools they provide have given me
									a clearer understanding of market trends and helped me make smarter, more
									informed decisions. What I appreciate most is their team’s expertise and
									responsiveness — they’re always available to discuss strategy, answer
									questions, and provide guidance. I’ve seen a noticeable improvement in my
									portfolio performance, and I feel much more confident navigating the
									complexities of the capital markets. If you're looking for a trusted
									partner to help you succeed in investing, I highly recommend AKKHAN
									Securities Ltd. — Mahmudul Karim Abbasi [Occupation/Investor Type]
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* second child */}
				<div
					data-bg-color="#032326"
					className="flex items-center justify-center  lg:h-[120vh]  lg:mb-44 child"
				>
					<div
						className="relative mt-56 lg:mr-48 lg:ml-80"
						onClick={openModal}
					>
						<Slide
							direction="left"
							triggerOnce
							className="z-10"
						>
							<div className="w-full mx-4 lg:mx-0">
								<img
									data-cursor="play"
									src={thm}
									alt="banner"
								/>
							</div>
						</Slide>
						<div className="absolute z-20 w-full text-white transform -translate-y-1/2 -left-28 top-1/2">
							<Slide
								direction="left"
								triggerOnce
								// delay={1000}
							>
								<div className="flex flex-col gap-y-16">
									<div className="w-20">
										<motion.p
											className="flex items-start -ml-1 cursor-pointer gap-x-2"
											initial={{ gap: "0.5rem" }} // Default gap
											whileHover={{ gap: "1rem" }} // Expand gap on hover
											transition={{ type: "spring", stiffness: 200, damping: 10 }}
										>
											{/* Animate the Play icon on hover of the entire p element */}
											<motion.span
												initial={{ opacity: 1, x: 0 }} // Start with visible icon at normal position
												whileHover={{
													opacity: 0, // Fade out icon
													x: 10, // Move icon to the right
												}}
												transition={{
													type: "spring",
													stiffness: 200,
													damping: 10,
													opacity: { duration: 0.3 }, // Smooth fade effect
													x: { duration: 0.3 }, // Smooth position shift
												}}
											>
												<FaPlay />
											</motion.span>
											PLAY
											<motion.span
												initial={{ opacity: 0, x: 1 }} // Start with visible icon at normal position
												whileHover={{
													opacity: 0, // Fade out icon
													x: 10, // Move icon to the right
												}}
												transition={{
													type: "spring",
													stiffness: 200,
													damping: 10,
													opacity: { duration: 0.3 }, // Smooth fade effect
													x: { duration: 0.3 }, // Smooth position shift
												}}
											>
												<FaPlay />
											</motion.span>
										</motion.p>
									</div>
									<h2
										ref={headingRef}
										className="ml-28 sm:mk-[6rem] lg:ml-[4rem] text-[3rem] sm:text-[4.2rem] md:text-[4.8rem] lg:text-[5rem] drop-shadow-md tracking-[-0.05em] sm:tracking-[-0.08em] 
  [word-spacing:0.5rem] leading-[.3rem] sm:leading-[3.5rem] md:leading-[4rem] lg:leading-[4.5rem] 
  stretched-text uppercase font-medium relative overflow-visible text-white text-wrap
  whitespace-nowrap sm:whitespace-normal"
									>
										{lines.map((line, lineIndex) => (
											<div
												key={lineIndex}
												className="overflow-hidden" // Ensures smooth sliding for the entire line
											>
												{line.split(" ").map((word, wordIndex) => (
													<span
														key={wordIndex}
														className="inline-block mx-2 text-white transition-all duration-700 ease-out transform" // Added more spacing
														style={{
															transitionDelay: `${
																lineIndex * 500 + wordIndex * 300
															}ms`, // Delay effect per word
														}}
													>
														{word.split("").map((letter, index) => (
															<span
																key={index}
																className={`inline-block transform font-bebas transition-all duration-700 ease-out text-white mx-1 ${
																	isVisible
																		? "translate-x-0 opacity-100"
																		: "-translate-x-full opacity-0"
																}`}
																style={{
																	transitionDelay: `${
																		lineIndex * 500 +
																		wordIndex * 300 +
																		index * 100
																	}ms`,
																	// fontSize: index === 0 ? "120%" : "100%",
																	// lineHeight: index === 0 ? "1.2" : "1",
																	fontSize:
																		index === 0
																			? `calc(${fontSize} + 20%)`
																			: fontSize,
																	lineHeight: index === 0 ? "1.0" : "1",
																}}
															>
																{letter}
															</span>
														))}
													</span>
												))}
											</div>
										))}
									</h2>
								</div>
							</Slide>
						</div>
					</div>
				</div>
				{/* third child */}
				<div
					data-bg-color="#f4f4f4"
					className="h-[30vh] lg:h-[10vh] child"
				/>
			</div>

			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
					<button
						onClick={closeModal}
						className="absolute z-50 text-2xl text-white cursor-pointer top-4 right-4"
					>
						<IoClose />
					</button>
					<div className="relative w-full h-full px-2 py-40 lg:p-20">
						{/* Close Button */}

						{/* Video */}
						<div className="relative h-full">
							<iframe
								width="100%"
								height="100%"
								src={videoUrl}
								title="How Did Cities Work Before Cars?"
								frameborder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
								referrerpolicy="strict-origin-when-cross-origin"
								allowfullscreen
							></iframe>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default ThirdSec;
