import React from "react";
import logo from "../assets/images/footer/Logo-ak-khan.png";
import { IoIosArrowForward } from "react-icons/io";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import img1 from "../assets/images/footer/BSEC-1.png";
import img2 from "../assets/images/footer/DSE.png";
import img3 from "../assets/images/footer/CSE.png";
import img4 from "../assets/images/footer/CDBL.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Footer = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		const email_address = form.email_address.value;

		if (!email_address) {
			toast.error("Please enter your email address.");
			return;
		}

		toast.promise(
			axios.post(
				"https://akk-khan-final.lifextory.com/api/news-letter",
				{ email_address },
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			),
			{
				pending: "Please wait...",
				success: "Subscribed to newsletter successfully",
				error: "Something went wrong. Please try again.",
			}
		);
	};

	return (
		<div className="bg-white md:py-16">
			<div className="grid my-10 mt-16 px-5 mx-auto lg:mx-32 gap-y-8 gap-x-4 lg:gap-x-0 lg:grid-cols-6 text-darkNill">
				<div className="col-span-2 max-w-[340px]">
					<div className="flex flex-col justify-start gap-y-8">
						<img
							src={logo}
							alt=""
							className="w-fit"
						/>
						<h5 className="text-[14px]">
							Unlocking Your Investment Potential: A. K. Khan Securities Limited -
							Empowering
							 Your Financial Journey.
						</h5>
						<form
							className="relative flex items-center justify-between w-full border rounded-full border-darkNill"
							onSubmit={handleSubmit}
						>
							<input
								type="text"
								placeholder="Your email to start"
								name="email_address"
								className="w-full placeholder:text-darkNill py-2.5 pl-2 bg-transparent rounded-full active:outline-0 focus:outline-0"
							/>
							<button
								type="submit"
								className="absolute right-0 p-[0.87rem] text-white rounded-full bg-darkNill"
							>
								<IoIosArrowForward />
							</button>
						</form>
						<div>
							<p>Our Stakeholders</p>
							<div className="flex items-center justify-between w-full mt-2">
								<img
									src={img1}
									alt=""
									className=""
								/>
								<img
									src={img2}
									alt=""
									className=""
								/>
								<img
									src={img3}
									alt=""
									className="w-[5rem]"
								/>
								<img
									src={img4}
									alt=""
									className=""
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="col-span-1">
					<h4 className="text-[14px] mb-8 font-medium uppercase">Import Links</h4>
					<ul className="flex flex-col justify-start text-[13px] lg:text-[14px] gap-y-2.5">
						<li>
							<Link
								to="/"
								className="links_f"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								to="/directors"
								className="links_f"
							>
								Board of Directors
							</Link>
						</li>
						<li>
							<Link
								to="/corporate"
								className="links_f"
							>
								Corporate Profile
							</Link>
						</li>
						<li>
							<Link
								to="/management"
								className="links_f"
							>
								Management Team
							</Link>
						</li>
						<li>
							<Link
								to="/vision"
								className="links_f"
							>
								Vision & Mission
							</Link>
						</li>
						<li>
							<Link
								to="/services"
								className="links_f"
							>
								Services
							</Link>
						</li>
						<li>
							<a
								href="http://dsebd.org/"
								target="_blank"
								rel="noreferrer"
								className="links_f"
							>
								Market Watch
							</a>
						</li>
						<li>
							<Link
								to="/download"
								className="links_f"
							>
								Download
							</Link>
						</li>
					</ul>
				</div>
				<div className="col-span-1">
					<h4 className="text-[14px] mb-8 font-medium uppercase">Services</h4>
					<ul className="flex flex-col justify-start text-[13px] lg:text-[14px] gap-y-2.5">
						<li>
							<Link
								to="/services"
								className="links_f"
							>
								Brokerage Service
							</Link>
						</li>
						<li>
							<Link
								to="/services"
								className="links_f"
							>
								IPO Application
							</Link>
						</li>
						<li>
							<Link
								to="/services"
								className="links_f"
							>
								DP Service
							</Link>
						</li>
						<li>
							<Link
								to="/services"
								className="links_f"
							>
								Margin Loan Facilities
							</Link>
						</li>
					</ul>
				</div>
				<div className="w-full col-span-2">
					<h4 className="text-[14px] mb-8 font-medium uppercase">Contact Us</h4>
					{/* Contact Information */}
					<div className="flex gap-y-4 flex-col justify-start font-vietnam text-[13px] lg:text-[14px]">
						<div className="">
							<h4 className="text-[#696969] text-[14px] mb-1.5">Office Address:</h4>
							<p>Bay's Galleria(2nd floor), 57, Gulshan Avenue-1, Dhaka-1212, Bangladesh</p>
							<p>Tel: (+88-02)-8833510, 8833578, 8833521, 8833540</p>
							<p>Fax: (+88-02)-8831275</p>
						</div>
						<div className="">
							<h4 className="text-[#696969] text-[14px] mb-1.5">Chattogram Office:</h4>
							<p>Batali Hills, Chattagram 4000, GPO Box: 223, Bangladesh</p>
							<p>
								Tel: (+88-031)-611050-2 <br />
								Fax: (+880-031)-610596 <br />
							</p>
						</div>
						<div className="">
							<h4 className="text-[#696969] text-[14px] mb-1.5">Email Us:</h4>
							<p>akkhan.corporateoffice@akkhan.com</p>
						</div>
					</div>
				</div>
			</div>
			<div className="items-center justify-between mx-2 md:pt-6 lg:mx-32 sm:flex">
				<div className="flex flex-row items-center justify-center mt-4 sm:justify-start lg:mt-10 gap-x-8">
					<FaFacebook
						className="rounded-full p-2.5 border border-darkNill text-darkNill h-fit w-fit"
						size={18}
					/>
					<FaLinkedin
						className="rounded-full p-2.5 border border-darkNill text-darkNill h-fit w-fit"
						size={18}
					/>
					<FaTwitter
						className="rounded-full p-2.5 border border-darkNill text-darkNill h-fit w-fit"
						size={18}
					/>
				</div>
				<div className="flex flex-row items-center mt-4 lg:mt-10 gap-x-8">
					<p className="text-[#696969] mx-auto">
						Copyright ©{new Date().getFullYear()} A. K. Khan Securities Ltd.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Footer;
