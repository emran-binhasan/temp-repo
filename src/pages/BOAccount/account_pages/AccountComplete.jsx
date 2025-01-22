import React from "react";
import FloatingButton from "../../../utils/FloatingButton";
import Button from "../../../utils/Button";
import { Asterisk, Check, ChevronLeft } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountComplete = () => {
	const navigate = useNavigate();

	// go back button
	const goBack = () => {
		navigate(-1);
	};

	return (
		<form>
			<input
				type="checkbox"
				name="Submit Form"
				id=""
				required
			/>
			{/* submit button */}
			<div className="flex items-center justify-end mt-12 lg:col-span-2 gap-x-4">
				<FloatingButton
					icon={ChevronLeft}
					borderColor="white"
					iconSize={20}
					hoverRadius={25}
					buttonSpeed={0.3}
					iconSpeed={0.9}
					classnames={"border text-black border-black h-[2.580rem] w-[7.580rem]"}
					handleClick={goBack}
				/>
				<Button
					type={"submit"}
					content="Save & Next"
				/>
			</div>
		</form>
	);
};

export default AccountComplete;
