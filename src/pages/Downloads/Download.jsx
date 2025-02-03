import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";
import useScrollToTop from "../../utils/useScrollToTop";
import banner from "../../assets/images/banners/download.jpg";
import banner_bg from "../../assets/images/banners/download_bg.jpg";
import { FaCloudDownloadAlt } from "react-icons/fa";
import useTitle from "../../utils/useTitle";

const Downloads = () => {
	const isScrolled = useScroll("top-navbar");
	useScrollToTop();
	useTitle("Download");
	const [data, setData] = useState([]);

	//
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		try {
			fetch(`${import.meta.env.VITE_API_URL}/download-forms`)
				.then((res) => res.json())
				.then((data) => {
					setData(data.data);
					setIsLoading(false);
				});
		} catch (error) {
			console.log("error: ", error.message);
			setIsLoading(false);
		}
	}, []);

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
							key={tab.id}
							className="relative "
						>
							<img
								src={banner_bg}
								className="object-cover w-full h-40 rounded-lg opacity-20"
							/>
							<div className="mx-1">
								<button
									onClick={async () => {
										try {
											const response = await fetch(tab.file_url);
											const blob = await response.blob();
											const blobUrl = window.URL.createObjectURL(blob);
											const link = document.createElement("a");
											link.href = blobUrl;
											link.download = "document.pdf";
											document.body.appendChild(link);
											link.click();

											document.body.removeChild(link);
											window.URL.revokeObjectURL(blobUrl);
										} catch (error) {
											console.error("Download failed:", error);
										}
									}}
									className="flex rounded-md gap-x-1.5 items-center justify-center w-full py-2 text-white bg-nill"
								>
									<FaCloudDownloadAlt size={22} /> Download
								</button>
							</div>
							<div className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
								<p className="whitespace-nowrap">{tab.form_name}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Downloads;
