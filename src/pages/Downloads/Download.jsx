import { useScroll } from "framer-motion";
import React from "react";
import useScrollToTop from "../../utils/useScrollToTop";
import banner from "../../assets/images/banners/download.jpg";
import { Download } from "lucide-react";
import useTitle from "../../utils/useTitle";

const Downloads = () => {
	const isScrolled = useScroll("top-navbar");
	useScrollToTop();
	useTitle("Download");

	return (
		<div className="">
			<div className={`h-72 w-full overflow-hidden ${isScrolled ? "" : ""}`}>
				<img
					src={banner}
					alt="banner"
					className={`object-cover w-full h-full duration-700
                        ${isScrolled ? "scale-105" : "scale-100"}`}
				/>
			</div>
			<div className="flex flex-col mx-16 gap-y-28">
				<h1 className="text-[2.63rem] mt-8 font-medium uppercase text-center w-full whitespace-nowrap text-black mb-8">
					Download
				</h1>
				{/* {tabsData.map((tab) => (
					<div
						key={tab.label}
						className="flex flex-row gap-x-16"
					>
						<img
							src={tab.image}
							alt=""
						/>
						<div className="flex flex-col justify-start gap-y-4">
							<p className="text-[2.63rem] w-full whitespace-nowrap text-black mb-8">
								{tab.label}
							</p>
							<p className="text-lg font-semibold text-black">{tab?.head1}</p>
							<p className="text-black text-[17px] leading-6 [word-spacing:5px]">
								{tab?.para1}
							</p>
							<p className="text-lg font-semibold text-black">{tab?.head2}</p>
							<p className="text-black text-[17px] leading-6 [word-spacing:5px]">
								{tab?.para2}
							</p>
						</div>
					</div>
				))} */}
			</div>
		</div>
	);
};

export default Downloads;
