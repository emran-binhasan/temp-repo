import React, { useEffect, useState } from "react";
import Button from "../../../../utils/Button";
import { useNavigate } from "react-router-dom";
import InputField from "../../../../utils/InputField";
import RadioGroup from "../../../../utils/RadioGroup";

const TypeComponents = () => {
	const navigate = useNavigate();
	const pageId = "DP & BO Type";

	const [formData, setFormData] = useState({
		phone_number: "",
		email: "",
		bo_caption: "",
		residency: "",
		bo_type: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem("formData")) || [];
		const currentPageData = savedData.find((page) => page.id === pageId);
		if (currentPageData) {
			setFormData(currentPageData);
		}
	}, [pageId]);

	const handleSubmit = (e) => {
		e.preventDefault();

		const savedData = JSON.parse(localStorage.getItem("formData")) || [];
		const updatedData = savedData.filter((page) => page.id !== pageId);

		updatedData.push({ ...formData, id: pageId });
		localStorage.setItem("formData", JSON.stringify(updatedData));

		navigate("/open-bo-account/basic");
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
					name="phone_number"
					value={formData.phone_number}
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
					name="bo_caption"
					options={boOptions}
					value={formData.bo_caption}
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
					name="bo_type"
					options={boTypeOptions}
					value={formData.bo_type}
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
