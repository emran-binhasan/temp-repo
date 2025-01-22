import TabSec from "./home-components/Services";
import img from "../../assets/images/slider/1.jpg";
import ThirdSec from "./home-components/ThirdSec";
import Posts from "./home-components/Posts";
import useScrollToTop from "../../utils/useScrollToTop";
import Slider from "./home-components/Slider";
import useTitle from "../../utils/useTitle";

const Home = () => {
	useScrollToTop();
	useTitle("Home");

	return (
		<div>
			
			<Slider />
			<TabSec />

			<ThirdSec />

			<div>
				<Posts />
			</div>
		</div>
	);
};

export default Home;
