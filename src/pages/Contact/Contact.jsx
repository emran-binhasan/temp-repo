import React from "react";
import useScrollToTop from "../../utils/useScrollToTop";
import useScroll from "../../utils/useScroll";
import banner from "../../assets/images/banners/ipo.jpg";
import useTitle from "../../utils/useTitle";

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
                       
                        <div>
                           
                        </div>
                    </div>
    );
};

export default Contact;