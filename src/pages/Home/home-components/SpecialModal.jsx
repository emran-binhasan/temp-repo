import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const SpecialModal = ({ isOpen, onClose }) => {
	const [timeLeft, setTimeLeft] = useState("");
	const [data, setData] = useState([]);

	useEffect(() => {
		try {
			fetch(`${import.meta.env.VITE_API_URL}/notice-popup`)
				.then((res) => res.json())
				.then((data) => {
					setData(data.data);
				});
		} catch (error) {
		}
	}, []);

	useEffect(() => {
		if (!isOpen) return;

		const offerEndDate = new Date("2025-02-10T23:59:59").getTime();

		const timer = setInterval(() => {
			const now = new Date().getTime();
			const distance = offerEndDate - now;

			if (distance <= 0) {
				clearInterval(timer);
				setTimeLeft("OFFER EXPIRED");
			} else {
				const days = Math.floor(distance / (1000 * 60 * 60 * 24));
				const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((distance % (1000 * 60)) / 1000);

				setTimeLeft(`${days}D ${hours}H ${minutes}M ${seconds}S`);
			}
		}, 3000);

		return () => clearInterval(timer);
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<motion.div
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3 }}
		>
			<div className="bg-white m-2  shadow-xl max-w-[21rem] lg:max-w-[38rem] w-full flex overflow-hidden relative">
				{/* Left Image Section */}
				<img
					src={data.image_url}
					alt="Notice"
					className=""
				/>
				<button
					onClick={onClose}
					className="absolute top-0 right-0 text-3xl text-white transition-all hover:scale-110"
				>
					<IoMdClose
						className="text-gray-700 bg-gray-100"
						size={26}
					/>
				</button>
				{/* Right Content Section */}
			</div>
		</motion.div>
	);
};

export default SpecialModal;
