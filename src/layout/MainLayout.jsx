import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Cursor from "../components/Cursor";

const MainLayout = () => {
	return (
		<div className="min-h-screen overflow-hidden bg-white cursor-auto">
			{/* <Cursor/> */}
			<Header />
			<div className="pb-28 bg-[#f4f4f4]">
				<Outlet />
			</div>
			<div>
				<Footer />
			</div>
		</div>
	);
};

export default MainLayout;
