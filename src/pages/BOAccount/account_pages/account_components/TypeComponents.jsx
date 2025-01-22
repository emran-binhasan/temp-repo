import React, { useEffect, useState } from "react";
import Button from "../../../../utils/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../../../../utils/InputField";
import RadioGroup from "../../../../utils/RadioGroup";

const TypeComponents = () => {
	const navigate = useNavigate();
	const pageId = "DP & BO Type";

	const [formData, setFormData] = useState({
		pageId,
		boCaption: "",
		residency: "",
		boType: "",
		mobile: "",
		email: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// const url = "http://localhost:5000/api/v1/bo-account";
		console.log(formData);

		try {
			const res = await axios.post(url, formData);
			if (res) {
				console.log(res);

				// navigate to the next page after successful submission
				navigate("/open-bo-account/nominees");
			}
		} catch (error) {
			// Handle error
		}
	};

	const boOptions = [
		{ value: "newBO", label: "New BO" },
		{ value: "linkBO", label: "Link BO" },
	];

	const residencyOptions = [
		{ value: "RB", label: "Resident Bangladesh (RB)" },
		{ value: "NRB", label: "Non Resident Bangladesh (NRB)" },
	];

	const boTypeOptions = [
		{ value: "individual", label: "Individual" },
		{ value: "joint", label: "Joint" },
	];

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="space-y-6 text-sm"
			>
				{/* Mobile Number */}
				<InputField
					label="Mobile Number"
					type="text"
					name="mobile"
					value={formData.mobile}
					onChange={handleChange}
					placeholder="01xxxxxxxxx"
				/>

				{/* Email Address */}
				<InputField
					label="Email Address"
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					placeholder="your@gmail.com"
				/>
				{/* BO Caption */}
				<RadioGroup
					label="BO Caption"
					name="boCaption"
					options={boOptions}
					value={formData.boCaption}
					onChange={handleChange}
					required={true}
					classStyle="space-y-2"
				/>

				{/* Residency */}
				<RadioGroup
					label="Residency"
					name="residency"
					options={residencyOptions}
					value={formData.residency}
					onChange={handleChange}
					required={true}
					classStyle="space-y-2"
				/>

				{/* BO Type */}
				<RadioGroup
					label="BO Type"
					name="boType"
					options={boTypeOptions}
					value={formData.boType}
					onChange={handleChange}
					required={true}
					classStyle="space-y-2"
				/>

				<Button
					content="Submit"
					type="submit"
				/>
			</form>
		</>
	);
};

export default TypeComponents;
