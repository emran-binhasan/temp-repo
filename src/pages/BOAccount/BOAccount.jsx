import { Outlet, useLocation } from "react-router-dom";

import AccountLayout from "./account_component/AccountLayout";
import useScrollToTop from "../../utils/useScrollToTop";
import { Fade } from "react-awesome-reveal";

const BOAccount = () => {
	useScrollToTop();
	const location = useLocation();

	return (
		<>
			<div className="bg-white">
				<div className="bg-[#fff] lg:px-28 pt-32 lg:pt-24 font-inter">
					<div className="bg-[#e5effb] flex gap-y-8 flex-col p-2 lg:p-16 shadow-sm rounded-xl">
						<>
							<AccountLayout />
						</>
						<Fade duration={1000}>
							{/* Set a unique key based on the current location to trigger fade animation */}
							<Outlet key={location.key} />
						</Fade>
					</div>
				</div>
			</div>
		</>
	);
};

export default BOAccount;
