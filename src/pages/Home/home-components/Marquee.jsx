import React, { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const Marquees = () => {
  const [marqueData, setMarqueData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const animation = { duration: 85000, easing: (t) => t };

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

        const res = await response.json();
        setMarqueData(res.data);
      } catch (error) {
        // console.error('Error fetching slider data:', error);
      } finally {
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

  const duplicatedData = [...marqueData, ...marqueData];

  if (isLoading) {
    return <div className="w-full h-32 flex items-center justify-center">Loading...</div>;
  }

  return (
    <div
      ref={sliderRef}
      className="keen-slider select-none"
      data-cursor="drag"
    >
      {duplicatedData.map((item, idx) => (
        <div
          key={`${item.id}-${idx}`}
          className="flex items-center justify-center keen-slider__slide select-none"
          data-cursor="drag"
        >
          <img
            src={item.image_url}
            alt=""
            className={`h-auto select-none ${idx % 2 === 0 ? "w-[80%]" : "w-[95%]"}`}
            loading={idx < 5 ? "eager" : "lazy"}
            draggable="false"
            data-cursor="drag"
          />
        </div>
      ))}
    </div>
  );
};

export default Marquees;