import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const animation = { duration: 85000, easing: (t) => t };

const Marquees = () => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const response = await fetch(
					`${import.meta.env.VITE_API_URL}/get-slider?placement=homeSecond`
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setData(data.data);
				setIsLoading(false);
				setError(false);
			} catch (error) {
				setError(true);
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	const [sliderRef] = useKeenSlider({
		loop: true,
		renderMode: "performance",
		drag: true,
		breakpoints: {
			"(min-width: 400px)": {
				slides: { perView: 1, spacing: 10 },
			},
			"(min-width: 640px)": {
				slides: { perView: 2, spacing: 20 },
			},
			"(min-width: 1000px)": {
				slides: { perView: 3, spacing: 20 },
			},
		},
		slides: { perView: 1 },
		initial: 2,
		mode: "free-snap",
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

	const duplicatedData = [...data, ...data];

	return (
		<>
			{!isLoading && (
				<div
					data-cursor="drag"
					ref={sliderRef}
					className="keen-slider"
				>
					{duplicatedData.map((item, idx) => (
						<div
							key={`${item.id}-${idx}`}
							data-cursor="drag"
							className="flex items-center justify-center keen-slider__slide"
						>
							<img
								data-cursor="drag"
								src={item.image_url}
								alt=""
								className={`h-auto ${idx % 2 === 0 ? "w-[80%]" : "w-[95%]"}`}
								loading={idx < 5 ? "eager" : "lazy"}
							/>
						</div>
					))}
				</div>
			)}
		</>
	);
};

export default Marquees;
