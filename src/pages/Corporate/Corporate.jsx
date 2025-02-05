import React from "react";
import useScroll from "../../utils/useScroll";
import useScrollToTop from "../../utils/useScrollToTop";
import banner from "../../assets/images/banners/backup.jpg";
import bg from "../../assets/images/banners/vision_bg.jpg";
import Markdown from "../../utils/Markdown";
import useTitle from "../../utils/useTitle";

/* ------ TODO: delete this code when you ar fetching data from server ------ */
const body = `
A K Khan is the sole owner of the information collected on this site. We will not sell, share, or rent this information to others in ways different from what is disclosed in this policy. At A K Khan, we do not collect any personal information unless you choose to share such information. If you do choose to share personal information via some form of correspondence, such information will not be shared, sold, or rented to others whatsoever. We use the information that we collect on or through our Offerings to:

- Operate, maintain, enhance and provide all features of our Offerings;
- Provide services and information that you request;
- Respond to comments and questions;
- Otherwise to provide support to users;
- Understand and analyze the usage trends and preferences of our users;
- Improve our Offerings;

And to develop new products, services, features, and functionality. Unless you ask us not to, we may contact you via email in the future to tell you about products or services, or changes to this privacy policy. If you correspond with us via e-mail, we may gather the information in a file specific to you. We only collect the information that you provide to us. We will not sell, share, or rent the information that you share with us to others. Like many other websites, collects information about users’ utilization and navigation of our site. This information helps us to design our site to better suit our users’ needs and create a better user experience. If you correspond with us via e-mail, we may gather the information in a file specific to you. We only collect the information that you provide to us. We will not sell, share, or rent the information that you share with us to others. Like many other websites, collects information about users’ utilization and navigation of our site. This information helps us to design our site to better suit our users’ needs and create a better user experience.
`;

const Corporate = () => {
	const isScrolled = useScroll("top-navbar");
	useScrollToTop();
	useTitle("Corporate Profile");

	return (
		<>
			<div className={`h-72 w-full overflow-hidden ${isScrolled ? "" : ""}`}>
				<img
					src={banner}
					alt="banner"
					className={`object-cover w-full h-full duration-700
                        ${isScrolled ? "scale-105" : "scale-100"}`}
				/>
			</div>
			<div>
				<h1 className="text-[1.63rem] uppercase mt-4 text-center lg:text-[2.2rem] font-semibold w-full whitespace-nowrap text-black">
					Corporate Profile
				</h1>
				<div
					className="flex flex-col p-4 mx-2 md:mx-6 lg:mx-32 gap-y-28"
					style={{
						backgroundImage: `url(${bg})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<Markdown content={body} />
				</div>
			</div>
		</>
	);
};

export default Corporate;
