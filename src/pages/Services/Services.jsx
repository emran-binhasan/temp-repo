import useScrollToTop from "../../utils/useScrollToTop";
import useTitle from "../../utils/useTitle";
import Service from "./service-components/Service";

const Services = () => {
	useScrollToTop();
	useTitle("Services");

	return (
		<section>
			<Service />
		</section>
	);
};

export default Services;
