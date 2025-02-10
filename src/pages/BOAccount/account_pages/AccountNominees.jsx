import React, { useEffect, useState } from "react";
import useScrollToTop from "../../../utils/useScrollToTop";
import InputField from "../../../utils/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";
import FloatingButton from "../../../utils/FloatingButton";
import { IoIosArrowBack } from "react-icons/io";
import RadioGroup from "../../../utils/RadioGroup";
import Compressor from "compressorjs";
import { FaDeleteLeft } from "react-icons/fa6";

const AccountNominees = () => {
	const pageId = "Nominees";
	const navigate = useNavigate();
	useScrollToTop();
	const [formData, setFormData] = useState({
		nominees: [
			{
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
				nid_front_image_1: null,
				nid_back_image_1: null,
			},
		],
	});

	const handleAddNominee = () => {
		setFormData((prevData) => {
			const newIndex = prevData.nominees.length + 1;

			return {
				...prevData,
				nominees: [
					...prevData.nominees,
					{
						[`nominee_name_${newIndex}`]: "",
						[`passport_number_${newIndex}`]: "",
						[`country_${newIndex}`]: "",
						[`mobile_number_${newIndex}`]: "",
						[`city_${newIndex}`]: "",
						[`date_of_birth_${newIndex}`]: "",
						[`post_code_${newIndex}`]: "",
						[`percentage_${newIndex}`]: "",
						[`state_${newIndex}`]: "",
						[`relation_with_client_${newIndex}`]: "",
						[`present_address_${newIndex}`]: "",
						[`sex_${newIndex}`]: "",
						[`nid_front_image_${newIndex}`]: null,
						[`nid_back_image_${newIndex}`]: null,
					},
				],
			};
		});
	};

	const handleRemoveNominee = () => {
		if (formData.nominees.length > 1) {
			setFormData((prevData) => ({
				...prevData,
				nominees: prevData.nominees.slice(0, -1),
			}));
		}
	};

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem("formData")) || [];
		const currentPageData = savedData.find((page) => page.id === pageId);
		if (currentPageData) {
			setFormData(currentPageData);
		}
	}, [pageId]);

	const handleChange = (index, field, value) => {
		setFormData((prevData) => ({
			...prevData,
			nominees: prevData.nominees.map((nominee, i) =>
				i === index ? { ...nominee, [`${field}_${index + 1}`]: value } : nominee
			),
		}));
	};

	const handleImageUpload = (file, index, field) => {
		if (!file || !file.type.startsWith("image/")) {
			console.error("Invalid file type. Please select an image.");
			return;
		}

		const reader = new FileReader();

		reader.onload = (e) => {
			setFormData((prevData) => ({
				...prevData,
				nominees: prevData.nominees.map((nominee, i) =>
					i === index ? { ...nominee, [`${field}_${index + 1}`]: e.target.result } : nominee
				),
			}));
		};

		new Compressor(file, {
			quality: 0.8,
			maxWidth: 1000,
			maxHeight: 1000,
			success(result) {
				reader.readAsDataURL(result);
			},
			error(err) {
				console.error("Compression failed:", err);
			},
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const savedData = JSON.parse(localStorage.getItem("formData")) || [];
		const updatedData = savedData.filter((page) => page.id !== pageId);

		updatedData.push({ ...formData, id: pageId });
		localStorage.setItem("formData", JSON.stringify(updatedData));

		navigate("/open-bo-account/complete");
	};

	const goBack = () => {
		navigate(-1);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				{formData.nominees.map((nominee, index) => (
					<div
						key={index}
						className="grid grid-cols-1 gap-4 lg:grid-cols-2"
					>
						<div className="w-full col-span-1 border-b lg:col-span-2 border-dhusor">
							<div className="flex items-center justify-between">
								<h4 className="py-3 text-lg font-semibold ">
									{index + 1} Nominee&apos;s Information
								</h4>
								{formData.nominees.length > 1 && index !== 0 && (
									<button
										className="text-red-500"
										onClick={handleRemoveNominee}
									>
										<FaDeleteLeft size={24} />
									</button>
								)}
							</div>
						</div>
						<InputField
							onChange={(e) => handleChange(index, "nominee_name", e.target.value)}
							label="Nominee Name (As per NID"
							value={nominee[`nominee_name_${index + 1}`]}
							name={`nominee_name_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "passport_number", e.target.value)}
							label="Passport Number"
							value={nominee[`passport_number_${index + 1}`]}
							name={`passport_number_${index + 1}`}
							type="text"
						/>
						<InputField
							onChange={(e) => handleChange(index, "country", e.target.value)}
							label="Country"
							value={nominee[`country_${index + 1}`]}
							name={`country_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "mobile_number", e.target.value)}
							label="Mobile Number"
							value={nominee[`mobile_number_${index + 1}`]}
							name={`mobile_number_${index + 1}`}
							type="text"
						/>
						<InputField
							onChange={(e) => handleChange(index, "city", e.target.value)}
							label="City"
							value={nominee[`city_${index + 1}`]}
							name={`city_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "date_of_birth", e.target.value)}
							label="Date Of Birth (As per NID)"
							value={nominee[`date_of_birth_${index + 1}`]}
							name={`date_of_birth_${index + 1}`}
							type="date"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "post_code", e.target.value)}
							label="Post Code"
							value={nominee[`post_code_${index + 1}`]}
							name={`post_code_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "percentage", e.target.value)}
							label="Percentage"
							value={nominee[`percentage_${index + 1}`]}
							name={`percentage_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "state", e.target.value)}
							label="State/Division"
							value={nominee[`state_${index + 1}`]}
							name={`state_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "relation_with_client", e.target.value)}
							label="Relation With Client"
							value={nominee[`relation_with_client_${index + 1}`]}
							name={`relation_with_client_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "present_address", e.target.value)}
							label="Present Address"
							value={nominee[`present_address_${index + 1}`]}
							name={`present_address_${index + 1}`}
							type="text"
							required
						/>
						<RadioGroup
							label="Sex"
							name={`sex_${index + 1}`}
							options={[
								{ label: "Male", value: "male" },
								{ label: "Female", value: "female" },
								{ label: "Other", value: "other" },
							]}
							value={nominee[`sex_${index + 1}`]}
							onChange={(e) => handleChange(index, `sex`, e.target.value)}
							classStyle="flex justify-between items-center w-fit m-0"
						/>

						{/* nid_front image */}
						<div>
							<label className="block mb-2 text-sm font-semibold">NID Front image</label>
							<div className="flex items-center justify-between gap-x-4">
								<input
									type="file"
									name={`nid_front_image_${index + 1}`}
									accept="image/*"
									onChange={(e) =>
										handleImageUpload(e.target.files[0], index, "nid_front_image")
									}
									className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								/>
								{formData.nominees[index][`nid_front_image_${index + 1}`] && (
									<div className="h-10 w-28">
										<img
											src={formData.nominees[index][`nid_front_image_${index + 1}`]}
											className="object-cover w-full h-full rounded-md"
											alt={`NID Front Image Preview for Nominee ${index + 1}`}
										/>
									</div>
								)}
							</div>
						</div>
						{/* nid_back image */}
						<div>
							<label className="block mb-2 text-sm font-semibold">NID Back image</label>
							<div className="flex items-center justify-between gap-x-4">
								<input
									type="file"
									name={`nid_back_image_${index + 1}`}
									accept="image/*"
									onChange={(e) =>
										handleImageUpload(e.target.files[0], index, "nid_back_image")
									}
									className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								/>
								{formData.nominees[index][`nid_back_image_${index + 1}`] && (
									<div className="h-10 w-28">
										<img
											src={formData.nominees[index][`nid_back_image_${index + 1}`]}
											className="object-cover w-full h-full rounded-md"
											alt={`NID Back Image Preview for Nominee ${index + 1}`}
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

			<div className="grid items-end justify-end grid-cols-2 gap-4 mt-12 lg:flex">
				<FloatingButton
					icon={IoIosArrowBack}
					borderColor="white"
					iconSize={20}
					hoverRadius={25}
					buttonSpeed={0.3}
					iconSpeed={0.9}
					classStyle={"border border-black h-[2.580rem] w-full lg:w-[7.580rem]"}
					handleClick={goBack}
				/>
				{formData.nominees.length < 3 && (
					<Button
						type={"button"}
						content={"Add Another Nominee"}
						handleClick={handleAddNominee}
					/>
				)}
				{formData.nominees.length > 1 && (
					<Button
						type={"button"}
						content={"Remove Nominee"}
						handleClick={handleRemoveNominee}
					/>
				)}
				<Button
					type={"submit"}
					content="Save & Next"
				/>
			</div>
		</form>
	);
};

export default AccountNominees;
