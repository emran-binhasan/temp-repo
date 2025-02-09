import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackBtn = () => {
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};
	return (
		<>
			<button
				className={`px-10 py-2 border border-black rounded-full flex items-center justify-center bg-white text-black`}
				onClick={goBack}
			>
				<IoIosArrowBack size={24} />
			</button>
		</>
	);
};

export default BackBtn;
