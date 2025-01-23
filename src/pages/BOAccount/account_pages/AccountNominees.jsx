import React, { useState } from "react";
import useScrollToTop from "../../../utils/useScrollToTop";
import InputField from "../../../utils/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";
import FloatingButton from "../../../utils/FloatingButton";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import RadioGroup from "../../../utils/RadioGroup";

const AccountNominees = () => {
	const navigate = useNavigate();
	const pageId = "Nominees";
	const [showSecondNominee, setShowSecondNominee] = useState(false);
	const [formData, setFormData] = useState({
		pageId,
		nominee_name: "",
		passport_number: "",
		country: "",
		mobile_number: "",
		city: "",
		date_of_birth: "",
		post_code: "",
		percentage: "",
		state: "",
		relation_with_client: "",
		present_address: "",
		sex: "",
		NID_front_image: null,
		NID_back_image: null,

		nominee_name_1: "",
		passport_number_1: "",
		country_1: "",
		mobile_number_1: "",
		city_1: "",
		date_of_birth_1: "",
		post_code_1: "",
		percentage_1: "",
		state_1: "",
		relation_with_client_1: "",
		present_address_1: "",
		sex_1: "",
		NID_front_image_1: null,
		NID_back_image_1: null,
	});
	useScrollToTop();

	const toggleSecondNominee = () => {
		setShowSecondNominee((prev) => !prev);

		// Reset second nominee fields if hiding
		if (showSecondNominee) {
			setFormData((prevState) => ({
				...prevState,
				nominee_name_1: "",
				NID_back_image_1: null,
			}));
		}
	};

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === "file") {
			const file = files[0];
			if (file) {
				const reader = new FileReader();
				reader.onloadend = () => {
					setFormData((prevState) => ({
						...prevState,
						[name]: reader.result,
					}));
				};
				reader.readAsDataURL(file);
			}
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Filter out optional fields if all values are empty for the second nominee
		const optionalFields = Object.keys(formData).filter((key) => key.endsWith("_1"));

		const hasSecondNomineeData = optionalFields.some((field) => formData[field]);

		const filteredData = { ...formData };

		if (!hasSecondNomineeData) {
			optionalFields.forEach((field) => delete filteredData[field]);
		}

		// const url = "http://localhost:5000/api/v1/bo-account";
		console.log(formData);

		try {
			const res = await axios.post(url, formData);
			if (res) {
				console.log(res);

				// navigate to the next page after successful submission
				navigate("/open-bo-account/complete");
			}
		} catch (error) {
			console.log("error: ", error);
		}
	};

	// go back button
	const goBack = () => {
		navigate(-1);
	};

	return (
		<div>
			<form
				onSubmit={handleSubmit}
				className="flex flex-col gap-y-6"
			>
				{/* 1st Nominee */}
				<div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
					<h4 className="w-full col-span-1 pb-3 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
						Nominee&apos;s Information
					</h4>
					{/* Nominees name */}
					<InputField
						onChange={handleChange}
						label="Nominee Name"
						value={formData.nominee_name}
						name="nominee_name"
						placeholder="Nominee Name"
						type="text"
						required
					/>
					{/* nominees Passport Number */}
					<InputField
						onChange={handleChange}
						label="Passport Number"
						value={formData.passport_number}
						name="passport_number"
						placeholder="Passport Number"
						type="text"
						required
					/>
					{/* nominees Country */}
					<InputField
						onChange={handleChange}
						label="Country"
						value={formData.country}
						name="country"
						placeholder="Country"
						type="text"
						required
					/>
					{/* nominees Mobile Number */}
					<InputField
						onChange={handleChange}
						label="Mobile Number"
						value={formData.mobile_number}
						name="mobile_number"
						placeholder="Mobile Number"
						type="text"
						required
					/>
					{/* nominees City */}
					<InputField
						onChange={handleChange}
						label="City"
						value={formData.city}
						name="city"
						placeholder="City"
						type="text"
						required
					/>
					{/* nominees Date of Birth */}
					<InputField
						onChange={handleChange}
						label="Date of Birth"
						value={formData.date_of_birth}
						name="date_of_birth"
						placeholder="Date of Birth"
						type="date"
						required
					/>
					{/* nominees Post Code */}
					<InputField
						onChange={handleChange}
						label="Post Code"
						value={formData.post_code}
						name="post_code"
						placeholder="Post Code"
						type="text"
						required
					/>
					{/* nominees Percentage */}
					<InputField
						onChange={handleChange}
						label="Percentage"
						value={formData.percentage}
						name="percentage"
						placeholder="Percentage"
						type="text"
						required
					/>
					{/* nominees State */}
					<InputField
						onChange={handleChange}
						label="State"
						value={formData.state}
						name="state"
						placeholder="State"
						type="text"
						required
					/>
					{/* nominees Relation */}
					<InputField
						onChange={handleChange}
						label="Relation with Client"
						value={formData.relation_with_client}
						name="relation_with_client"
						placeholder="Relation with Client"
						type="text"
						required
					/>
					{/* nominees Present Address */}
					<InputField
						onChange={handleChange}
						label="Present Address"
						value={formData.present_address}
						name="present_address"
						placeholder="Present Address"
						type="text"
						required
					/>
					{/* nominees Sex */}
					<RadioGroup
						label="Sex"
						name="sex"
						value={formData.sex}
						onChange={handleChange}
						options={[
							{ label: "Male", value: "male" },
							{ label: "Female", value: "female" },
							{ label: "Other", value: "other" },
						]}
						classStyle="flex justify-between items-center w-fit m-0"
						required
					/>
					{/* NID_front image */}
					<div className="space-y-1 md:space-y-2">
						<label className="block text-xs font-semibold md:text-sm">NID Front image</label>
						<div className="flex items-center justify-between gap-x-4">
							<input
								type="file"
								name="NID_front_image"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
							/>
							{formData.NID_front_image && (
								<div className="h-10 w-28">
									<img
										src={formData.NID_front_image}
										alt="Signature Preview"
										className="object-cover w-full h-full rounded-md"
									/>
								</div>
							)}
						</div>
					</div>
					{/* NID_back image */}
					<div className="space-y-1 md:space-y-2">
						<label className="block text-xs font-semibold md:text-sm">NID Back image</label>
						<div className="flex items-center justify-between gap-x-4">
							<input
								type="file"
								name="NID_back_image"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
							/>
							{formData.NID_back_image && (
								<div className="h-10 w-28">
									<img
										src={formData.NID_back_image}
										alt="Signature Preview"
										className="object-cover w-full h-full rounded-md"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
				{/* 2nd Nominee (Optional) */}

				{showSecondNominee && (
					<div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
						<h4 className="w-full col-span-1 pb-3 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
							Second Nominee&apos;s Information
						</h4>
						{/* Nominees name */}
						<InputField
							onChange={handleChange}
							label="Nominee Name"
							value={formData.nominee_name_1}
							name="nominee_name"
							placeholder="Nominee Name"
							type="text"
							required
						/>
						{/* nominees Passport Number */}
						<InputField
							onChange={handleChange}
							label="Passport Number"
							value={formData.passport_number_1}
							name="passport_number"
							placeholder="Passport Number"
							type="text"
							required
						/>
						{/* nominees Country */}
						<InputField
							onChange={handleChange}
							label="Country"
							value={formData.country_1}
							name="country"
							placeholder="Country"
							type="text"
							required
						/>
						{/* nominees Mobile Number */}
						<InputField
							onChange={handleChange}
							label="Mobile Number"
							value={formData.mobile_number_1}
							name="mobile_number"
							placeholder="Mobile Number"
							type="text"
							required
						/>
						{/* nominees City */}
						<InputField
							onChange={handleChange}
							label="City"
							value={formData.city_1}
							name="city"
							placeholder="City"
							type="text"
							required
						/>
						{/* nominees Date of Birth */}
						<InputField
							onChange={handleChange}
							label="Date of Birth"
							value={formData.date_of_birth_1}
							name="date_of_birth"
							placeholder="Date of Birth"
							type="date"
							required
						/>
						{/* nominees Post Code */}
						<InputField
							onChange={handleChange}
							label="Post Code"
							value={formData.post_code_1}
							name="post_code"
							placeholder="Post Code"
							type="text"
							required
						/>
						{/* nominees Percentage */}
						<InputField
							onChange={handleChange}
							label="Percentage"
							value={formData.percentage_1}
							name="percentage"
							placeholder="Percentage"
							type="text"
							required
						/>
						{/* nominees State */}
						<InputField
							onChange={handleChange}
							label="State"
							value={formData.state_1}
							name="state"
							placeholder="State"
							type="text"
							required
						/>
						{/* nominees Relation */}
						<InputField
							onChange={handleChange}
							label="Relation with Client"
							value={formData.relation_with_client_1}
							name="relation_with_client"
							placeholder="Relation with Client"
							type="text"
							required
						/>
						{/* nominees Present Address */}
						<InputField
							onChange={handleChange}
							label="Present Address"
							value={formData.present_address_1}
							name="present_address"
							placeholder="Present Address"
							type="text"
							required
						/>
						{/* nominees Sex */}
						<RadioGroup
							label="Sex"
							name="sex_1"
							value={formData.sex_1}
							onChange={handleChange}
							options={[
								{ label: "Male", value: "male" },
								{ label: "Female", value: "female" },
								{ label: "Other", value: "other" },
							]}
							classStyle="flex justify-between items-center w-fit m-0"
							required
						/>
						{/* NID_front image */}
						<div className="space-y-1 md:space-y-2">
							<label className="block text-xs font-semibold md:text-sm">NID Front image</label>
							<div className="flex items-center justify-between gap-x-4">
								<input
									type="file"
									name="NID_front_image_1"
									accept="image/*"
									onChange={handleChange}
									className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								/>
								{formData.NID_front_image && (
									<div className="h-10 w-28">
										<img
											src={formData.NID_front_image}
											alt="Signature Preview"
											className="object-cover w-full h-full rounded-md"
										/>
									</div>
								)}
							</div>
						</div>
						{/* NID_back image */}
						<div className="space-y-1 md:space-y-2">
							<label className="block text-xs font-semibold md:text-sm">NID Back image</label>
							<div className="flex items-center justify-between gap-x-4">
								<input
									type="file"
									name="NID_back_image_1"
									accept="image/*"
									onChange={handleChange}
									className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								/>
								{formData.NID_back_image && (
									<div className="h-10 w-28">
										<img
											src={formData.NID_back_image}
											alt="Signature Preview"
											className="object-cover w-full h-full rounded-md"
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				)}
				{/* submit button */}
				<div className="flex items-center justify-end mt-12 lg:col-span-2 gap-x-4">
					<FloatingButton
						icon={IoIosArrowBack}
						borderColor="white"
						iconSize={20}
						hoverRadius={25}
						buttonSpeed={0.3}
						iconSpeed={0.9}
						classStyle={"border border-black h-[2.580rem] w-[7.580rem]"}
						handleClick={goBack}
					/>
					<Button
						type={"button"}
						content={showSecondNominee ? "Remove Another Nominee" : "Add Another Nominee"}
						handleClick={toggleSecondNominee}
					/>
					<Button
						type={"submit"}
						content="Save & Next"
					/>
				</div>
			</form>
		</div>
	);
};

export default AccountNominees;
