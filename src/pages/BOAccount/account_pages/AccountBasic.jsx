import React, { useState } from "react";
import useScrollToTop from "../../../utils/useScrollToTop";
import InputField from "../../../utils/InputField";
import RadioGroup from "../../../utils/RadioGroup";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";
import FloatingButton from "../../../utils/FloatingButton";

import { FaAsterisk } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";

import axios from "axios";

const AccountBasic = () => {
	const navigate = useNavigate();
	const [isSameAddress, setIsSameAddress] = useState(false);
	const pageId = "Basic Information";
	const [formData, setFormData] = useState({
		pageId,
		applicant_name: "",
		mother_name: "",
		father_name: "",
		spouse_name: "",
		date_of_birth: "",
		gender: "",
		signature_image: null,
		applicant_image: null,
		occupation: "",
		TIN: "",
		citizen_of_bangladesh: "",
		application_holder_NID_number: "",
		NID_front_image: null,
		NID_back_image: null,

		present_country: "",
		present_city: "",
		present_state: "",
		present_postal_code: "",
		present_address: "",

		permanent_country: "",
		permanent_city: "",
		permanent_state: "",
		permanent_postal_code: "",
		permanent_address: "",

		passport_number: "",
		passport_issue_date: "",
		passport_expiry_date: "",
		issue_place_of_passport: "",
	});
	useScrollToTop();

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

	const handleCopyPresentAddress = () => {
		setFormData((prevState) => ({
			...prevState,
			permanent_country: prevState.present_country,
			permanent_city: prevState.present_city,
			permanent_state: prevState.present_state,
			permanent_postal_code: prevState.present_postal_code,
			permanent_address: prevState.present_address,
		}));
		setIsSameAddress(true);
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
				navigate("/open-bo-account/bank");
			}
		} catch (error) {
			// Handle error
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
				<div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
					<h4 className="w-full col-span-1 pb-3 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
						Personal Information
					</h4>
					{/* applicant name */}
					<InputField
						label="Your Name (As per NID)"
						type="text"
						name="applicant_name"
						value={formData.applicant_name}
						onChange={handleChange}
						placeholder="Enter your name"
						required
					/>
					{/* father name */}
					<InputField
						label="Father's Name"
						type="text"
						name="father_name"
						value={formData.father_name}
						onChange={handleChange}
						placeholder="Enter your father's name"
						required
					/>
					{/* mother name */}
					<InputField
						label="Mother's Name"
						type="text"
						name="mother_name"
						value={formData.mother_name}
						onChange={handleChange}
						placeholder="Enter your mother's name"
						required
					/>
					{/* spouse name */}
					<InputField
						label="Spouse's Name"
						type="text"
						name="spouse_name"
						value={formData.spouse_name}
						onChange={handleChange}
						placeholder="Enter your spouse's name"
						required
					/>
					{/* date of birth */}
					<InputField
						label="Date of Birth"
						type="date"
						name="date_of_birth"
						value={formData.date_of_birth}
						onChange={handleChange}
						placeholder="Enter your date of birth"
						required
					/>
					{/* gender */}
					<RadioGroup
						label="Gender"
						name="gender"
						value={formData.gender}
						onChange={handleChange}
						options={[
							{ label: "Male", value: "male" },
							{ label: "Female", value: "female" },
							{ label: "Other", value: "other" },
						]}
						classStyle="flex justify-between items-center w-fit m-0"
						required
					/>
					{/* signature image */}
					<div className="space-y-1 md:space-y-2">
						<label className="flex items-center justify-start text-xs font-semibold md:text-sm">
							<FaAsterisk className="w-2.5 h-2.5 md:w-3 md:h-3" />
							Signature Image
						</label>
						<div className="flex items-center justify-between gap-x-4">
							<input
								type="file"
								name="signature_image"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								required
							/>
							{formData.signature_image && (
								<div className="h-10 w-28">
									<img
										src={formData.signature_image}
										alt="Signature Preview"
										className="object-cover w-full h-full rounded-md"
									/>
								</div>
							)}
						</div>
					</div>
					{/* applicant image */}
					<div className="space-y-1 md:space-y-2">
						<label className="flex items-center justify-start text-xs font-semibold md:text-sm">
							<FaAsterisk className="w-2.5 h-2.5 md:w-3 md:h-3" />
							Photo
						</label>
						<div className="flex items-center justify-between gap-x-4">
							<input
								type="file"
								name="applicant_image"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								required
							/>
							{formData.applicant_image && (
								<div className="h-10 w-28">
									<img
										src={formData.applicant_image}
										alt="Signature Preview"
										className="object-cover w-full h-full rounded-md"
									/>
								</div>
							)}
						</div>
					</div>
					{/* date of birth */}
					<InputField
						label="Occupation"
						type="text"
						name="occupation"
						value={formData.occupation}
						onChange={handleChange}
						placeholder="Enter occupation"
					/>
					{/* date of birth */}
					<InputField
						label="TIN"
						type="text"
						name="TIN"
						value={formData.TIN}
						onChange={handleChange}
						placeholder="Enter TIN"
					/>
					{/* gender */}
					<RadioGroup
						label="Citizen of Bangladesh"
						name="citizen_of_bangladesh"
						value={formData.citizen_of_bangladesh}
						onChange={handleChange}
						options={[
							{ label: "Yes", value: "yes" },
							{ label: "No", value: "no" },
						]}
						classStyle="flex justify-between items-center w-fit m-0"
					/>
					{/* date of birth */}
					<InputField
						label="Application Holder NID No.(optional for NRB)"
						type="text"
						name="application_holder_NID_number"
						value={formData.application_holder_NID_number}
						onChange={handleChange}
						placeholder="Enter application holder NID number"
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
				<div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
					{/* present address */}
					<h4 className="w-full col-span-1 pb-3 mt-6 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
						Present Address
					</h4>
					{/* present country */}
					<InputField
						label="Present Country"
						type="text"
						name="present_country"
						value={formData.present_country}
						onChange={handleChange}
						placeholder="Enter present country"
						required
					/>
					{/* present city */}
					<InputField
						label="Present City"
						type="text"
						name="present_city"
						value={formData.present_city}
						onChange={handleChange}
						placeholder="Enter present city"
						required
					/>
					{/* present state */}
					<InputField
						label="Present State"
						type="text"
						name="present_state"
						value={formData.present_state}
						onChange={handleChange}
						placeholder="Enter present state"
						required
					/>
					{/* present postal_code */}
					<InputField
						label="Present Postal Code"
						type="text"
						name="present_postal_code"
						value={formData.present_postal_code}
						onChange={handleChange}
						placeholder="Enter present postal code"
						required
					/>
					{/* present address */}
					<InputField
						label="Present Address"
						type="text"
						name="present_address"
						value={formData.present_address}
						onChange={handleChange}
						placeholder="Enter address"
						required
					/>
				</div>
				<div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
					{/* permanent address */}
					<h4 className="w-full col-span-1 pb-3 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
						Permanent Address
					</h4>
					{/* check button */}
					<button
						onClick={handleCopyPresentAddress}
						className="flex items-center justify-start w-full text-sm font-semibold lg:col-span-2 gap-x-2 focus:outline-0"
						type="button"
					>
						{isSameAddress ? (
							<FaCheck
								size={19}
								className="bg-white m-[1px] border rounded-md border-nill text-nill"
							/>
						) : (
							<span className="w-5 h-5 bg-white border rounded-md border-hDhusor" />
						)}
						Same as present address
					</button>
					{/* permanent country */}
					<InputField
						label="Permanent Country"
						type="text"
						name="permanent_country"
						value={formData.permanent_country}
						onChange={handleChange}
						placeholder="Enter permanent country"
						required
					/>
					{/* permanent city */}
					<InputField
						label="Permanent City"
						type="text"
						name="permanent_city"
						value={formData.permanent_city}
						onChange={handleChange}
						placeholder="Enter permanent city"
						required
					/>
					{/* permanent state */}
					<InputField
						label="Permanent State"
						type="text"
						name="permanent_state"
						value={formData.permanent_state}
						onChange={handleChange}
						placeholder="Enter permanent state"
						required
					/>
					{/* permanent postal_code */}
					<InputField
						label="Permanent Postal Code"
						type="text"
						name="permanent_postal_code"
						value={formData.permanent_postal_code}
						onChange={handleChange}
						placeholder="Enter permanent postal code"
						required
					/>
					{/* permanent address */}
					<InputField
						label="Permanent Address"
						type="text"
						name="permanent_address"
						value={formData.permanent_address}
						onChange={handleChange}
						placeholder="Enter address"
						required
					/>
				</div>
				<div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
					{/* Passport Information */}
					<h4 className="w-full col-span-1 pb-3 mt-6 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
						Passport Information
					</h4>
					{/* passport */}
					<InputField
						label="Passport Number"
						type="text"
						name="passport_number"
						value={formData.passport_number}
						onChange={handleChange}
						placeholder="Enter passport number"
					/>
					{/* issue place of passport */}
					<InputField
						label="Issue Place of Passport"
						type="text"
						name="issue_place_of_passport"
						value={formData.issue_place_of_passport}
						onChange={handleChange}
						placeholder="Enter issue place of passport"
					/>
					{/* issue date of passport */}
					<InputField
						label="Issue Date of Passport"
						type="date"
						name="passport_issue_date"
						value={formData.passport_issue_date}
						onChange={handleChange}
						placeholder="Enter issue date of passport"
					/>
					{/* expiry date of passport */}
					<InputField
						label="Expiry Date of Passport"
						type="date"
						name="passport_expiry_date"
						value={formData.passport_expiry_date}
						onChange={handleChange}
						placeholder="Enter expiry date of passport"
					/>
				</div>
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
						type={"submit"}
						content="Save & Next"
					/>
				</div>
			</form>
		</div>
	);
};

export default AccountBasic;
