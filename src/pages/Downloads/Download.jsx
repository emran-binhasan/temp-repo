import { useScroll } from "framer-motion";
import React from "react";
import useScrollToTop from "../../utils/useScrollToTop";
import banner from "../../assets/images/banners/download.jpg";
import banner_bg from "../../assets/images/banners/download_bg.jpg";
import { FaCloudDownloadAlt } from "react-icons/fa";
import useTitle from "../../utils/useTitle";

const data = [
	{
		id: 1,
		label: "Account Opening Form - Company",
	},
	{
		id: 2,
		label: "Account Opening Form - Individual and Joint",
	},
	{
		id: 3,
		label: "Buy and Sell Order Form",
	},
	{
		id: 4,
		label: "DSE Mobile Registration Form",
	},
	{
		id: 5,
		label: "Online Services Registration Form",
	},
	{
		id: 6,
		label: "Fund Withdrawal Request Form",
	},
];

const Downloads = () => {
	const isScrolled = useScroll("top-navbar");
	// useScrollToTop();
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
			<div className="flex flex-col mx-4 lg:mx-16 gap-y-28">
				<h1 className="text-[1.63rem] lg:text-[2.63rem] mt-8 font-medium uppercase text-center w-full whitespace-nowrap text-black mb-8">
					Download
				</h1>
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{data.map((tab) => (
						<div
							key={tab.label}
							className="relative "
						>
							<img
								src={banner_bg}
								className="object-cover w-full h-40 rounded-lg opacity-20"
							/>
							<div className="mx-1">
								<button className="flex rounded-md gap-x-1.5 items-center justify-center w-full py-2 text-white bg-nill">
									<FaCloudDownloadAlt size={22} /> Download
								</button>
							</div>
							<div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
								<p className="whitespace-nowrap">{tab.label}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Downloads;
