import React from "react";
import FloatingButton from "../../../utils/FloatingButton";
import Button from "../../../utils/Button";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccountComplete = () => {
	const navigate = useNavigate();

	const formData = JSON.parse(localStorage.getItem("formData")) || [];
	console.log("formData: ", formData);

	const submitData = async () => {
		try {
			const response = await fetch("https://akk-khan-final.lifextory.com/open-bo-account", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				throw new Error(`Error: ${response.statusText}`);
			}

			const result = await response.json();
			console.log("Response:", result);
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	// Example usage to submit the formData
	// submitData(formData);

	// go back button
	const goBack = () => {
		navigate(-1);
	};

	return (
		<div>
			{/* <form onSubmit={handleSubmit}>
			<input
				type="checkbox"
				name="Submit Form"
				id=""
				required
			/>
			<div className="flex items-center justify-end mt-12 lg:col-span-2 gap-x-4">
				<FloatingButton
					icon={IoIosArrowBack}
					borderColor="white"
					iconSize={20}
					hoverRadius={25}
					buttonSpeed={0.3}
					iconSpeed={0.9}
					classStyle={"border text-black border-black h-[2.580rem] w-[7.580rem]"}
					handleClick={goBack}
				/>
				<Button
					type={"submit"}
					content="Save & Next"
				/>
			</div>
		</form> */}
			<button onClick={submitData}>submit</button>
		</div>
	);
};

export default AccountComplete;
