import React from "react";
import useScrollToTop from "../../utils/useScrollToTop";
import useScroll from "../../utils/useScroll";
import banner from "../../assets/images/banners/management.jpg";
import profile from "../../assets/images/banners/management-team.png";
import useTitle from "../../utils/useTitle";

const Management = () => {
	const isScrolled = useScroll("top-navbar");
	useScrollToTop();
	useTitle("Management Team");

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
			<h1 className="text-[2.63rem] mt-8 font-medium uppercase text-center w-full whitespace-nowrap text-black mb-8">
				Management Team
			</h1>
			<div>
				<img
					src={profile}
					alt="Muhammad Moniruzzaman Miah"
				/>
				<p>Muhammad Moniruzzaman Miah</p>
				<p>CEO</p>
				<p>A. K. Khan Securities Ltd.</p>
			</div>
		</div>
	);
};

export default Management;
