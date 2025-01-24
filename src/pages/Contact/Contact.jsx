import React from "react";
import useScrollToTop from "../../utils/useScrollToTop";
import useScroll from "../../utils/useScroll";
import banner from "../../assets/images/banners/ipo.jpg";
import useTitle from "../../utils/useTitle";
import { IoMdNavigate } from "react-icons/io";
import { FaPhone } from "react-icons/fa6";

import img from "../../assets/images/contact.png";

const Contact = () => {
	const isScrolled = useScroll("top-navbar");
	useScrollToTop();
	useTitle("Contact");

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
			<div className="grid grid-cols-1 mx-4 mt-16 lg:mx-16 lg:grid-cols-2 gap-x-28 gap-y-16">
				<div>
					<h1 className="text-[1.63rem] mb-12 leading-[2.2rem] md:leading-[2.7rem] lg:text-[2.63rem] font-semibold w-full whitespace-nowrap text-black">
						Get in Touch with <br /> A. K. Khan Securities Ltd.
					</h1>
					<div className="flex flex-col gap-y-8">
						<ul className="flex flex-col gap-y-1.5">
							<h5 className="text-lg font-semibold uppercase lg:text-xl">Dhaka Office:</h5>
							<li className="flex items-start gap-x-1.5">
								<IoMdNavigate
									className="flex-shrink-0 mt-1 rotate-45"
									size={20}
								/>
								<span>
									Bay's Galleria (2nd Floor),57, Gulshan Avenue, Gulshan-1 Dhaka-1212,
									Bangladesh
								</span>
							</li>
							<li className="flex items-start gap-x-1.5">
								<FaPhone
									className="flex-shrink-0 mt-1"
									size={16}
								/>
								<span>
									Tel: (+88-02)-8833510,8833578, 8833521,8833540 <br />
									Fax:(+88-02)-8831275
								</span>
							</li>
						</ul>

						<ul className="flex flex-col gap-y-1.5">
							<h5 className="text-lg font-semibold uppercase lg:text-xl">Chittagong Office</h5>
							<li className="flex justify-start items-center gap-x-1.5">
								<IoMdNavigate
									className="rotate-45"
									size={20}
								/>
								As-Salam Tower (2nd floor) 57, Agrabad C/A Chittagong
							</li>
							<li className="flex justify-start items-center gap-x-1.5">
								<FaPhone size={16} />
								Tel: (+88-031)-611050-2 <br />
								Fax: (880-031)-610596
							</li>
						</ul>
					</div>
				</div>
				<div className="">
					<img
						src={img}
						alt=""
					/>
				</div>
			</div>
		</div>
	);
};

export default Contact;
