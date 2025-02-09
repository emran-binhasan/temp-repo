import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { NavLink } from "react-router-dom";

const Menu = ({ menuRef, isMenuOpen, toggleMenu, sections, showAboutUs, setShowAboutUs }) => {
	return (
		<div
			className={`
                fixed inset-0 w-screen bg-[#151414] md:bg-transparent  h-full overflow-y-auto overflow-x-hidden md:h-screen z-[999]
                ${isMenuOpen ? "visible" : "invisible"}
            `}
		>
			{/* Background sections */}
			<div className="absolute inset-0">
				{sections.map((section, index) => (
					<div
						key={index}
						className="absolute top-0 bottom-0 bg-[#151414] transition-all duration-700"
						style={{
							left: section.left,
							width: section.width,
							transitionDelay: `${section.delay}ms`,
						}}
					/>
				))}
			</div>

			{/* Menu content */}
			<div
				ref={menuRef}
				className={`
                        relative lg:mx-[3.2rem] my-2 w-full h-full text-[#f3f3f3] z-50
                        transition-opacity duration-500
                        ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
                    `}
				style={{
					transitionDelay: isMenuOpen ? "300ms" : "0ms",
				}}
			>
				{/* Close button */}
				<button
					onClick={toggleMenu}
					className="absolute top-0 left-0 z-50 text-white lg:top-5 lg:left-4"
				>
					<IoClose
						size={32}
						strokeWidth={1.5}
					/>
				</button>

				{/* Navigation */}
				<div className="relative grid justify-between w-full h-full grid-cols-1 px-4 pt-12 gap-y-8 lg:px-6 lg:pt-32 lg:grid-cols-2 lg:gap-x-10 xl:flex-row">
					{/* overlay */}
					<div
						className={`
                        absolute inset-0 bg-[#181717] 
                        transform transition-transform duration-[1500ms] ease-in-out
                        ${isMenuOpen ? "translate-x-full" : "translate-x-0 pointer-events-none"}
                    `}
						style={{
							transitionDelay: isMenuOpen ? "700ms" : "0ms",
						}}
					/>
					{/* links */}
					<ul className="font-eina nav_link text-[18px] lg:text-[20px] flex flex-col gap-y-2 lg:gap-y-3 duration-300">
						<NavLink
							to="/"
							className="font-black cursor-pointer links"
							onClick={toggleMenu}
						>
							Home
						</NavLink>
						<li
							className={`flex items-center justify-between w-full -mb-3 font-black cursor-pointer links ${
								showAboutUs ? "border-b border-white" : ""
							}`}
							onClick={() => setShowAboutUs((prev) => !prev)}
						>
							About Us <IoIosArrowDown />
						</li>
						{/* when about us is clicked show the below contents  */}
						<div
							className={`overflow-hidden  duration-700 ease-in-out  ${
								showAboutUs ? "max-h-40" : "max-h-0"
							}`}
						>
							<ul className="flex flex-col pl-8 mt-2 text-base lg:mt-4 lg:mb-2 gap-y-1 lg:gap-y-5">
								<NavLink
									to="/directors"
									className="cursor-pointer"
									onClick={toggleMenu}
								>
									Board of Directors
								</NavLink>
								<NavLink
									to="/corporate"
									className="cursor-pointer"
									onClick={toggleMenu}
								>
									Corporate Profile
								</NavLink>
								<NavLink
									to="/management"
									className="cursor-pointer"
									onClick={toggleMenu}
								>
									Management Team
								</NavLink>
							</ul>
						</div>
						<NavLink
							to="/services"
							onClick={toggleMenu}
							className="font-black cursor-pointer links"
						>
							Services
						</NavLink>
						<a
							className="font-black cursor-pointer links"
							href="http://dsebd.org/"
							target="_blank"
							rel="noreferrer"
							onClick={toggleMenu}
						>
							Market Watch
						</a>
						<NavLink
							to="/vision"
							className="font-black cursor-pointer links"
							onClick={toggleMenu}
						>
							Vision & Mission
						</NavLink>
						<NavLink
							to="/download"
							onClick={toggleMenu}
							className="font-black cursor-pointer links"
						>
							Download
						</NavLink>
						<NavLink
							to="/contact"
							className="font-black cursor-pointer links"
							onClick={toggleMenu}
						>
							Contact
						</NavLink>
					</ul>
					{/* Contact Information */}
					<div className=" grid font-medium grid-cols-1 gap-y-4 max-w-[570px] font-vietnam text-[13px]">
						<div className="grid grid-cols-1 lg:grid-cols-2">
							<div>
								<h4 className="text-[#696969] mb-1.5 lg:mb-6 font-semibold">
									Chattogram Office:
								</h4>
								<p>
									Batali Hills, Chattagram 4000, GPO <br /> Box: 223, Bangladesh
								</p>
							</div>
							<div>
								<h4 className="text-[#696969] mb-1.5 lg:mb-6 font-semibold">Info:</h4>
								<p>
									Tel: (+88-031)-611050-2 <br />
									Fax: (+88-031)-610596 <br />
									akkan.corporateoffice@akkan.com
								</p>
							</div>
						</div>
						<div className="grid grid-cols-1 lg:grid-cols-2">
							<div>
								<h4 className="text-[#696969] mb-1.5 lg:mb-6 font-semibold">Dhaka Office:</h4>
								<p>
									Bay's Galleria(2nd floor), 57, Gulshan
									<br /> Avenue-1, Dhaka-1212, Bangladesh
								</p>
								<div className="flex w-full mt-2 lg:mt-6 gap-x-5">
									<p className="flex items-center gap-x-1">
										<FaFacebook />
										Facebook
									</p>
									<p className="flex items-center gap-x-1">
										<FaLinkedin />
										LinkedIn
									</p>
									<p className="flex items-center gap-x-1">
										<FaTwitter />
										Twitter
									</p>
								</div>
							</div>
							<div>
								<h4 className="text-[#696969] mb-1.5 lg:mb-6 font-semibold">Info:</h4>
								<p>
									Tel: (+88-02)-8833510, 8833578,
									<br /> 8833521, 8833540
								</p>
								<p>Fax: (+88-02)-8831275</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Menu;
