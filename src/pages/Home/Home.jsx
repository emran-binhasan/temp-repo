import TabSec from "./home-components/Services";
import ThirdSec from "./home-components/ThirdSec";
import Posts from "./home-components/Posts";
import useScrollToTop from "../../utils/useScrollToTop";
import Slider from "./home-components/Slider";
import useTitle from "../../utils/useTitle";

const Home = () => {
	useScrollToTop();
	useTitle("Home");

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
		</div>
	);
};

export default Home;
