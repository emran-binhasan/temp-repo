import TabSec from "./home-components/Services";
import ThirdSec from "./home-components/ThirdSec";
import Posts from "./home-components/Posts";
import useScrollToTop from "../../utils/useScrollToTop";
import Slider from "./home-components/Slider";
import useTitle from "../../utils/useTitle";
import SpecialOffersModal from "./home-components/SpecialOfferModal";
import { useEffect, useState } from "react";

const Home = () => {
	useScrollToTop();
	useTitle("Home");
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
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
			<div>
				<Posts />
			</div>
			<SpecialOffersModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
			/>
		</div>
	);
};

export default Home;
