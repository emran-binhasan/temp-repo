import React, { useState, useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import "../../../assets/styles/Slider.css";

const slides = [
	{ id: 1, title: "Seamless capital market investment", image: "https://i.ibb.co.com/fYmsrwZ/1.webp" },
	{ id: 2, title: "Stock trade at the palm of your hand", image: "https://i.ibb.co.com/LZ4cZ1F/4.webp" },
	{
		id: 3,
		title: "Know what you could earn by investing",
		image: "https://i.ibb.co.com/jDhSVZ6/3.webp",
	},
	{
		id: 4,
		title: "Take the informed decision to minimize risk",
		image: "https://i.ibb.co.com/LZ4cZ1F/4.webp",
	},
];

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
	const slides = [
		{
			id: 1,
			title: "Seamless capital market investment",
			image: "https://i.ibb.co/fYmsrwZ/1.webp",
		},
		{
			id: 2,
			title: "Stock trade at the palm of your hand",
			image: "https://i.ibb.co/LZ4cZ1F/4.webp",
		},
		{
			id: 3,
			title: "Know what you could have earned by investing",
			image: "https://i.ibb.co/jDhSVZ6/3.webp",
		},
		{
			id: 4,
			title: "Take the informed decision to minimize risk",
			image: "https://i.ibb.co/LZ4cZ1F/4.webp",
		},
	];

	const [sliderRef, instanceRef] = useKeenSlider({
		loop: true,
		initial: 0,
		defaultAnimation: {
			duration: 3000,
		},
	});

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
					slides: { perView: 2, spacing: 40, origin: "auto" },
					loop: true,
					drag: false,
				},
				"(min-width: 1000px)": {
					slides: { perView: 4, spacing: 0, origin: "auto" },
					loop: false,
					drag: false,
				},
			},
			// slides: {
			// 	origin: "center",
			// 	perView: 1.5,
			// 	spacing: 20,
			// },
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
			<div
				ref={sliderRef}
				className="keen-slider"
			>
				{slides.map((slide) => (
					<div
						key={slide.id}
						className="relative h-[110vh] keen-slider__slide"
					>
						<div className="absolute right-0 z-20 w-full transform top-1/3">
							<div className="ml-4 mr-10 lg:mr-0 lg:ml-28">
								<p className="max-w-[18ch] leading-[3.5rem] text-[2.2rem] font-light lg:font-normal lg:text-[3.5rem] text-white">
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

			{/* Thumbnail Slider */}
			<div
				ref={thumbnailRef}
				className="absolute left-0 overflow-hidden thumbnail bottom-[20%] lg:bottom-24 md:left-14 right-4 lg:left-28 md:right-14 lg:right-28"
			>
				<div className="flex justify-between">
					{slides.map((slide) => (
						<div
							key={slide.id}
							className="relative w-full text-white select-none keen-slider__slide"
						>
							<p className="text-lg font-normal text-white w-fit">{slide.title}</p>
						</div>
					))}
				</div>
			</div>

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
