import img1 from "../../../assets/images/marquee/1.jpeg";
import img2 from "../../../assets/images/marquee/2.jpeg";
import img3 from "../../../assets/images/marquee/3.jpeg";
import img4 from "../../../assets/images/marquee/4.jpeg";

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const animation = { duration: 85000, easing: (t) => t };

const Marquees = () => {
	const [sliderRef] = useKeenSlider({
		loop: true,
		renderMode: "performance",
		drag: true,
		breakpoints: {
			"(min-width: 400px)": {
				slides: { perView: 1, spacing: 10 },
			},
			"(min-width: 1000px)": {
				slides: { perView: 3, spacing: 35 },
			},
		},
		slides: { perView: 1 },
		created(s) {
			s.moveToIdx(5, true, animation);
		},
		updated(s) {
			s.moveToIdx(s.track.details.abs + 5, true, animation);
		},
		animationEnded(s) {
			s.moveToIdx(s.track.details.abs + 5, true, animation);
		},
	});
	return (
		<div
			data-cursor="drag"
			ref={sliderRef}
			className="keen-slider"
		>
			<div
				data-cursor="drag"
				className="keen-slider__slide number-slide1 flex items-center justify-center"
			>
				<img
					data-cursor="drag"
					src={img1}
					alt=""
					className="lg:w-[92%] w-[85%] h-auto"
				/>
			</div>
			<div
				data-cursor="drag"
				className="flex items-center justify-center keen-slider__slide number-slide2"
			>
				<img
					data-cursor="drag"
					src={img2}
					alt=""
					className="lg:w-[80%] w-[70%] h-auto"
				/>
			</div>
			<div
				data-cursor="drag"
				className="keen-slider__slide number-slide3 flex items-center justify-center"
			>
				<img
					data-cursor="drag"
					src={img3}
					alt=""
					className="lg:w-[92%] w-[85%] h-auto"
				/>
			</div>
			<div
				data-cursor="drag"
				className="flex items-center justify-center keen-slider__slide number-slide4"
			>
				<img
					data-cursor="drag"
					src={img4}
					className="lg:w-[80%] w-[70%] h-auto"
					alt=""
				/>
			</div>
		</div>
	);
};

export default Marquees;
