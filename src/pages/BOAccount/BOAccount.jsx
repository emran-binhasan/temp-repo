import { Outlet } from "react-router-dom";


import AccountLayout from "./account_component/AccountLayout";
import useScrollToTop from "../../utils/useScrollToTop";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Cursor from "../../components/Cursor";

const BOAccount = () => {
	useScrollToTop();

	return (
		<>
		<Cursor/>
			<div className="bg-white">
				<Header />
				<div className="bg-[#fff] lg:px-28 pt-32 lg:pt-24 font-inter">
					<div className="bg-[#e5effb] flex gap-y-8 flex-col p-2 lg:p-16 shadow-sm rounded-xl">
						<>
							<AccountLayout />
						</>
						<Outlet />
					</div>
				</div>
				<Footer />
			</div>
		</>
	);
};

export default BOAccount;
