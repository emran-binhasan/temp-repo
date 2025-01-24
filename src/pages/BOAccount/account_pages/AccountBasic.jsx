import React, { useState, useEffect } from "react";
import useScrollToTop from "../../../utils/useScrollToTop";
import InputField from "../../../utils/InputField";
import RadioGroup from "../../../utils/RadioGroup";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";
import FloatingButton from "../../../utils/FloatingButton";

import { FaAsterisk } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import Compressor from "compressorjs";

const AccountBasic = () => {
	const navigate = useNavigate();
	const [isSameAddress, setIsSameAddress] = useState(false);
	const pageId = "Basic Information";
	const [formData, setFormData] = useState({
		ac_holder_name: "",
		ac_holder_fathers_name: "",
		ac_holder_mothers_name: "",
		ac_holder_spouses_name: "",
		ac_holder_date_of_birth: "",
		ac_holder_gender: "",
		ac_holder_signature_image: null,
		ac_holder_image: null,
		ac_holder_occupation: "",
		ac_holder_TIN: "",
		ac_holder_NID_number: "",
		ac_holder_nid_front: null,
		ac_holder_nid_back: null,

		ac_holder_present_country: "",
		ac_holder_present_city: "",
		ac_holder_present_state: "",
		ac_holder_present_postal_code: "",
		ac_holder_present_address_line: "",

		ac_holder_permanent_country: "",
		ac_holder_permanent_city: "",
		ac_holder_permanent_state: "",
		ac_holder_permanent_postal_code: "",
		ac_holder_permanent_address_line: "",

		ac_holder_passport_number: "",
		ac_holder_issue_date_of_passport: "",
		ac_holder_expiry_date_of_passport: "",
		ac_holder_issue_place_of_passport: "",
	});
	useScrollToTop();

	// const handleChange = (e) => {
	// 	const { name, value, type, files } = e.target;

	// 	if (type === "file") {
	// 		const file = files[0];
	// 		if (file) {
	// 			const reader = new FileReader();
	// 			reader.onloadend = () => {
	// 				setFormData((prevState) => ({
	// 					...prevState,
	// 					[name]: reader.result,
	// 				}));
	// 			};
	// 			reader.readAsDataURL(file);
	// 		}
	// 	} else {
	// 		setFormData((prevState) => ({
	// 			...prevState,
	// 			[name]: value,
	// 		}));
	// 	}
	// };
	const handleChange = (e) => {
		const { name, value, type, files } = e.target;

		if (type === "file") {
			const file = files[0];
			if (file) {
				// Check if the file is over the size limit
				if (file.size > 200 * 1024) {
					new Compressor(file, {
						quality: 0.8, // You can adjust quality here
						maxWidth: 1000, // You can adjust the max width
						maxHeight: 1000, // You can adjust the max height
						success(result) {
							// Convert the compressed file to base64
							const reader = new FileReader();
							reader.onloadend = () => {
								setFormData((prevState) => ({
									...prevState,
									[name]: reader.result, // Set the compressed image data
								}));
							};
							reader.readAsDataURL(result);
						},
						error(err) {
							console.error("Compression failed:", err);
						},
					});
				} else {
					// If the file is small enough, save it directly
					const reader = new FileReader();
					reader.onloadend = () => {
						setFormData((prevState) => ({
							...prevState,
							[name]: reader.result,
						}));
					};
					reader.readAsDataURL(file);
				}
			}
		}
	};

	const handleCopyPresentAddress = () => {
		setFormData((prevState) => ({
			...prevState,
			ac_holder_permanent_country: prevState.ac_holder_present_country,
			ac_holder_permanent_city: prevState.ac_holder_present_city,
			ac_holder_permanent_state: prevState.ac_holder_present_state,
			ac_holder_permanent_postal_code: prevState.ac_holder_present_postal_code,
			ac_holder_permanent_address_line: prevState.ac_holder_present_address_line,
		}));
		setIsSameAddress(true);
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

		navigate("/open-bo-account/bank");
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
						name="ac_holder_name"
						value={formData.ac_holder_name}
						onChange={handleChange}
						placeholder="Enter your name"
						required
						defaultValue={formData.ac_holder_name}
					/>
					{/* father name */}
					<InputField
						label="Father's Name"
						type="text"
						name="ac_holder_fathers_name"
						value={formData.ac_holder_fathers_name}
						onChange={handleChange}
						placeholder="Enter your father's name"
						required
					/>
					{/* mother name */}
					<InputField
						label="Mother's Name"
						type="text"
						name="ac_holder_mothers_name"
						value={formData.ac_holder_mothers_name}
						onChange={handleChange}
						placeholder="Enter your mother's name"
						required
					/>
					{/* spouse name */}
					<InputField
						label="Spouse's Name"
						type="text"
						name="ac_holder_spouses_name"
						value={formData.ac_holder_spouses_name}
						onChange={handleChange}
						placeholder="Enter your spouse's name"
						required
					/>
					{/* date of birth */}
					<InputField
						label="Date of Birth"
						type="date"
						name="ac_holder_date_of_birth"
						value={formData.ac_holder_date_of_birth}
						onChange={handleChange}
						placeholder="Enter your date of birth"
						required
					/>
					{/* ac_holder_gender */}
					<RadioGroup
						label="Gender"
						name="ac_holder_gender"
						value={formData.ac_holder_gender}
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
								name="ac_holder_signature_image"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								required
							/>
							{formData.ac_holder_signature_image && (
								<div className="h-10 w-28">
									<img
										src={formData.ac_holder_signature_image}
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
								name="ac_holder_image"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								required
							/>
							{formData.ac_holder_image && (
								<div className="h-10 w-28">
									<img
										src={formData.ac_holder_image}
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
						name="ac_holder_occupation"
						value={formData.ac_holder_occupation}
						onChange={handleChange}
						placeholder="Enter occupation"
					/>
					{/* date of birth */}
					<InputField
						label="TIN"
						type="text"
						name="ac_holder_TIN"
						value={formData.ac_holder_TIN}
						onChange={handleChange}
						placeholder="Enter TIN"
					/>
					{/* date of birth */}
					<InputField
						label="Application Holder NID No.(optional for NRB)"
						type="text"
						name="ac_holder_NID_number"
						value={formData.ac_holder_NID_number}
						onChange={handleChange}
						placeholder="Enter application holder NID number"
					/>
					{/* NID_front image */}
					<div className="space-y-1 md:space-y-2">
						<label className="block text-xs font-semibold md:text-sm">NID Front image</label>
						<div className="flex items-center justify-between gap-x-4">
							<input
								type="file"
								name="ac_holder_nid_front"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
							/>
							{formData.ac_holder_nid_front && (
								<div className="h-10 w-28">
									<img
										src={formData.ac_holder_nid_front}
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
								name="ac_holder_nid_back"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
							/>
							{formData.ac_holder_nid_back && (
								<div className="h-10 w-28">
									<img
										src={formData.ac_holder_nid_back}
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
						name="ac_holder_present_country"
						value={formData.ac_holder_present_country}
						onChange={handleChange}
						placeholder="Enter present country"
						required
					/>
					{/* present city */}
					<InputField
						label="Present City"
						type="text"
						name="ac_holder_present_city"
						value={formData.ac_holder_present_city}
						onChange={handleChange}
						placeholder="Enter present city"
						required
					/>
					{/* present state */}
					<InputField
						label="Present State"
						type="text"
						name="ac_holder_present_state"
						value={formData.ac_holder_present_state}
						onChange={handleChange}
						placeholder="Enter present state"
						required
					/>
					{/* present postal_code */}
					<InputField
						label="Present Postal Code"
						type="text"
						name="ac_holder_present_postal_code"
						value={formData.ac_holder_present_postal_code}
						onChange={handleChange}
						placeholder="Enter present postal code"
						required
					/>
					{/* present address */}
					<InputField
						label="Present Address"
						type="text"
						name="ac_holder_present_address_line"
						value={formData.ac_holder_present_address_line}
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
						name="ac_holder_permanent_country"
						value={formData.ac_holder_permanent_country}
						onChange={handleChange}
						placeholder="Enter permanent country"
						required
					/>
					{/* permanent city */}
					<InputField
						label="Permanent City"
						type="text"
						name="ac_holder_permanent_city"
						value={formData.ac_holder_permanent_city}
						onChange={handleChange}
						placeholder="Enter permanent city"
						required
					/>
					{/* permanent state */}
					<InputField
						label="Permanent State"
						type="text"
						name="ac_holder_permanent_state"
						value={formData.ac_holder_permanent_state}
						onChange={handleChange}
						placeholder="Enter permanent state"
						required
					/>
					{/* permanent postal_code */}
					<InputField
						label="Permanent Postal Code"
						type="text"
						name="ac_holder_permanent_postal_code"
						value={formData.ac_holder_permanent_postal_code}
						onChange={handleChange}
						placeholder="Enter permanent postal code"
						required
					/>
					{/* permanent address */}
					<InputField
						label="Permanent Address"
						type="text"
						name="ac_holder_permanent_address_line"
						value={formData.ac_holder_permanent_address_line}
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
						name="ac_holder_passport_number"
						value={formData.ac_holder_passport_number}
						onChange={handleChange}
						placeholder="Enter passport number"
					/>
					{/* issue place of passport */}
					<InputField
						label="Issue Place of Passport"
						type="text"
						name="ac_holder_issue_place_of_passport"
						value={formData.ac_holder_issue_place_of_passport}
						onChange={handleChange}
						placeholder="Enter issue place of passport"
					/>
					{/* issue date of passport */}
					<InputField
						label="Issue Date of Passport"
						type="date"
						name="ac_holder_issue_date_of_passport"
						value={formData.ac_holder_issue_date_of_passport}
						onChange={handleChange}
						placeholder="Enter issue date of passport"
					/>
					{/* expiry date of passport */}
					<InputField
						label="Expiry Date of Passport"
						type="date"
						name="ac_holder_expiry_date_of_passport"
						value={formData.ac_holder_expiry_date_of_passport}
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
