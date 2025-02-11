import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Button from "../../utils/Button";
import { MdError } from "react-icons/md";
import Cursor from "../../components/Cursor";

const Error = () => {
	return (
		<>
			<Cursor/>
			<Header />
		
			<div className="w-full h-screen bg-white">
				<div className="flex flex-col items-center justify-center h-full mx-4 lg:mx-32">
					<div className="mb-4 text-red-600">
						<MdError size={80} />
					</div>
					<h1 className="mb-4 text-3xl font-bold">Page not Found</h1>
					<p className="text-center">We’re sorry, the page you requested could not be found</p>
					<p className="text-center">Please go back to the home page.</p>

					<Button
						content={"Go to Home"}
						handleClick={() => (window.location.href = "/")}
						classStyle="mt-8"
					/>
				</div>
			</div>
			<Footer />
		</>
	);
};

export default Error;
