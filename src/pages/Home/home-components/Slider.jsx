import React, { useState, useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "../../../assets/styles/Slider.css";

function ThumbnailPlugin(mainRef) {
	return (slider) => {
		function removeActive() {
			slider.slides.forEach((slide) => {
				slide.classList.remove("active");
			});
		}
		function addActive(idx) {
			slider.slides[idx].classList.add("active");
		}

		function addClickEvents() {
			slider.slides.forEach((slide, idx) => {
				slide.addEventListener("click", () => {
					if (mainRef.current) mainRef.current.moveToIdx(idx);
				});
			});
		}

		slider.on("created", () => {
			if (!mainRef.current) return;
			addActive(slider.track.details.rel);
			addClickEvents();
			mainRef.current.on("animationStarted", (main) => {
				removeActive();
				const next = main.animator.targetIdx || 0;
				addActive(main.track.absToRel(next));
				slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
			});
		});
	};
}

const Slider = () => {
	const [slides, setSlides] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			fetch(`${import.meta.env.VITE_API_URL}/get-slider?placement=homeHero`)
				.then((res) => res.json())
				.then((data) => {
					setSlides(data.data);
					setIsLoading(false);
				});
		} catch (error) {
			console.log("error: ", error.message);
			setIsLoading(false);
		}
	}, []);

	const [sliderRef, instanceRef] = useKeenSlider(
		{
			loop: true,
			initial: 0,
			defaultAnimation: {
				duration: 2500,
			},
		},
		[
			(slider) => {
				let timeout;
				let mouseOver = false;
				function clearNextTimeout() {
					clearTimeout(timeout);
				}
				function nextTimeout() {
					clearTimeout(timeout);
					if (mouseOver) return;
					timeout = setTimeout(() => {
						slider.next();
					}, 2500);
				}
				slider.on("created", () => {
					slider.container.addEventListener("mouseover", () => {
						mouseOver = true;
						clearNextTimeout();
					});
					slider.container.addEventListener("mouseout", () => {
						mouseOver = false;
						nextTimeout();
					});
					nextTimeout();
				});
				slider.on("dragStarted", clearNextTimeout);
				slider.on("animationEnded", nextTimeout);
				slider.on("updated", nextTimeout);
			},
		],
		[],
		[slides]
	);

	const [thumbnailRef] = useKeenSlider(
		{
			mode: "free-snap",

			breakpoints: {
				"(min-width: 300px)": {
					slides: { origin: "center", perView: 1.5, spacing: 20 },
					loop: true,
					drag: true,
				},
				"(min-width: 600px)": {
					slides: { perView: 2, spacing: 32, origin: "auto" },
					loop: true,
					drag: false,
				},
				"(min-width: 1000px)": {
					slides: { perView: 4, spacing: 20, origin: "auto" },
					loop: false,
					drag: false,
				},
			},
		},
		[ThumbnailPlugin(instanceRef)]
	);

	const goToNext = () => {
		if (instanceRef.current) {
			instanceRef.current.next();
		}
	};
	const goToPrev = () => {
		if (instanceRef.current) {
			instanceRef.current.prev();
		}
	};

	return (
		<div className="relative bg-black">
			{/* Main Slider */}
			{!isLoading && (
				<div
					ref={sliderRef}
					className="keen-slider"
				>
					{slides.map((slide) => (
						<div
							key={slide.id}
							className="relative h-[110vh] keen-slider__slide"
						>
							<div
								// className="absolute right-0 z-20 w-full transform top-1/3"
								className="absolute left-1/2 -translate-x-1/2 z-20 w-[82%] transform top-1/3"
							>
								<div
									className="mr-10 lg:mr-0 "
									// className="ml-4 mr-10 lg:mr-0 lg:ml-28"
								>
									<p className="max-w-[18ch] leading-[2.5rem] md:leading-[3.5rem] text-[2rem] font-light lg:font-normal lg:text-[3.5rem] text-white">
										{slide.title}
									</p>
									<button></button>
								</div>
							</div>
							<img
								src={slide.image}
								alt={slide.title}
								className="object-cover w-full h-full brightness-[0.8]"
							/>
						</div>
					))}
				</div>
			)}

			{/* Thumbnail Slider */}
			{!isLoading && (
				<div
					ref={thumbnailRef}
					// className="absolute left-0 thumbnail bottom-[20%] lg:bottom-24 md:left-14 right-4 lg:left-28 md:right-14 lg:right-28"
					className="absolute left-1/2 transform w-[82%] thumbnail bottom-[13%] lg:bottom-24  -translate-x-1/2"
				>
					<div className="flex justify-between">
						{slides.map((slide) => (
							<div
								key={slide.id}
								className="relative text-white select-none w-fit keen-slider__slide"
							>
								<p className="w-full text-base font-normal text-white lg:text-lg">
									{slide.title}
								</p>
							</div>
						))}
					</div>
				</div>
			)}

			{/* Control Buttons */}
			<div className="absolute z-10 hidden p-3 transform -translate-y-1/2 md:block right-4 md:right-14 lg:right-28 top-1/2">
				<div className="flex flex-col items-center justify-center text-white gap-y-5">
					<button
						className="relative p-2 duration-300 active:outline-0 focus:outline-0 button-border"
						onClick={goToNext}
					>
						<IoIosArrowForward size={24} />
					</button>
					<button
						onClick={goToPrev}
						className="relative p-2 duration-300 active:outline-0 focus:outline-0 button-border"
					>
						<IoIosArrowBack size={24} />
					</button>
				</div>
			</div>
		</div>
	);
};
export default Slider;
