import TabSec from "./home-components/Services";
import ThirdSec from "./home-components/ThirdSec";
import Posts from "./home-components/Posts";
import useScrollToTop from "../../utils/useScrollToTop";
import Slider from "./home-components/Slider";
import useTitle from "../../utils/useTitle";
import SpecialOffers from "./home-components/SpecialOffers";
import SpecialOffersModal from "./home-components/SpecialOfferModal";
import { useEffect, useState } from "react";

const Home = () => {
	useScrollToTop();
	useTitle("Home");
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
	  // Show modal when user visits the page
	  setIsModalOpen(true);
	}, []);
  
	const handleCloseModal = () => {
	  setIsModalOpen(false);
	};

	return (
		<div className="flex flex-col gap-y-0">
			<Slider />
			<TabSec />

			<div className="mt-16">
				<ThirdSec />
			</div>
			<SpecialOffers/>
			<div>
				<Posts />
			</div>
			<SpecialOffersModal isOpen={isModalOpen} onClose={handleCloseModal} />
		</div>
	);
};

export default Home;
