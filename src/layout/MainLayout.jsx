import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Cursor from "../components/Cursor";
// import PageTransition from "../utils/PageTransition";
import { Slide, ToastContainer } from "react-toastify";

const MainLayout = () => {
	return (
		<div className="relative overflow-hidden">
			{/* <PageTransition /> */}
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
			<ToastContainer
				position="top-right"
				autoClose={4000}
				hideProgressBar={true}
				closeOnClick
				pauseOnHover
				draggable
				theme="colored"
				transition={Slide}
				// style={{
				// 	fontSize: "16px",
				// 	fontWeight: "bold",
				// }}
			/>
		</div>
	);
};

export default MainLayout;
