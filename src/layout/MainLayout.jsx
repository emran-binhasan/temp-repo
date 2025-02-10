import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Cursor from "../components/Cursor";
import { Slide, ToastContainer } from "react-toastify";

const MainLayout = () => {
	return (
		<div className="relative overflow-hidden">
			<div className="min-h-screen overflow-hidden bg-white cursor-auto">
				<Cursor />
				<Header />
				<div className="pb-28 bg-[#f4f4f4]">
					<Outlet />
				</div>
				<div>
					<Footer />
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={true}
				closeOnClick
				pauseOnHover
				draggable
				theme="colored"
				transition={Slide}
			/>
		</div>
	);
};

export default MainLayout;
