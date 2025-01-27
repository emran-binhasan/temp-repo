import React, { useEffect, useState } from "react";
import useScrollToTop from "../../../utils/useScrollToTop";
import InputField from "../../../utils/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";
import FloatingButton from "../../../utils/FloatingButton";
import { IoIosArrowBack } from "react-icons/io";
import RadioGroup from "../../../utils/RadioGroup";
import Compressor from "compressorjs";

const AccountNominees = () => {
	const pageId = "Nominees";
	const navigate = useNavigate();
	useScrollToTop();
	const [formData, setFormData] = useState({
		nominees: [
			{
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
				nid_front_image: null,
				nid_back_image: null,
			},
		],
	});

	const handleAddNominee = () => {
		setFormData((prevData) => ({
			...prevData,
			nominees: [
				...prevData.nominees,
				{
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
					nid_front_image: null,
					nid_back_image: null,
				},
			],
		}));
	};

	const handleRemoveNominee = () => {
		if (formData.nominees.length > 1) {
			setFormData((prevData) => ({
				...prevData,
				nominees: prevData.nominees.slice(0, -1),
			}));
		}
	};

	// const handleChange = (index, field, value) => {
	// 	setFormData((prevData) => ({
	// 		...prevData,
	// 		nominees: prevData.nominees.map((nominee, i) =>
	// 			i === index ? { ...nominee, [field]: value } : nominee
	// 		),
	// 	}));
	// };

	// const handleImageChange = (index, field, file) => {
	// 	if (!file || !file.type.startsWith("image/")) {
	// 		console.error("Invalid file type. Please select an image.");
	// 		return;
	// 	}

	// 	const reader = new FileReader();

	// 	reader.onload = (e) => {
	// 		setFormData((prevData) => ({
	// 			...prevData,
	// 			nominees: prevData.nominees.map((nominee, i) =>
	// 				i === index ? { ...nominee, [field]: e.target.result } : nominee
	// 			),
	// 		}));
	// 	};

	// 	reader.readAsDataURL(file);
	// };
	const handleChange = (index, field, value) => {
		setFormData((prevData) => ({
			...prevData,
			nominees: prevData.nominees.map((nominee, i) =>
				i === index
					? field === "nid_front_image" || field === "nid_back_image"
						? { ...nominee, [field]: value } // Handle image uploads
						: { ...nominee, [field]: value } // Handle text input
					: nominee
			),
		}));

		if (field === "nid_front_image" || field === "nid_back_image") {
			if (!value || !value.type.startsWith("image/")) {
				console.error("Invalid file type. Please select an image.");
				return;
			}

			const reader = new FileReader();
			reader.onload = (e) => {
				setFormData((prevData) => ({
					...prevData,
					nominees: prevData.nominees.map((nominee, i) =>
						i === index ? { ...nominee, [field]: e.target.result } : nominee
					),
				}));
			};
			reader.readAsDataURL(value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log("Selected values:", formData);

		const savedData = JSON.parse(localStorage.getItem("formData")) || [];
		const updatedData = savedData.filter((page) => page.id !== pageId);

		updatedData.push({ ...formData, id: pageId });
		localStorage.setItem("formData", JSON.stringify(updatedData));

		console.log("Form submitted. Updated data:", updatedData);
		navigate("/open-bo-account/nominees");
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
						className="grid grid-cols-2 gap-4 lg:grid-cols-2"
					>
						<h4 className="w-full col-span-1 py-3 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
							{index + 1} Nominee&apos;s Information
						</h4>
						<InputField
							onChange={(e) => handleChange(index, "nominee_name", e.target.value)}
							label="Nominee Name (As per NID"
							value={nominee.nominee_name}
							name={`nominee_name_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "passport_number", e.target.value)}
							label="Passport Number"
							value={nominee.passport_number}
							name={`passport_number_${index + 1}`}
							type="text"
						/>
						<InputField
							onChange={(e) => handleChange(index, "country", e.target.value)}
							label="Country"
							value={nominee.country}
							name={`country_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "mobile_number", e.target.value)}
							label="Mobile Number"
							value={nominee.mobile_number}
							name={`mobile_number_${index + 1}`}
							type="text"
						/>
						<InputField
							onChange={(e) => handleChange(index, "city", e.target.value)}
							label="City"
							value={nominee.city}
							name={`city_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "date_of_birth", e.target.value)}
							label="Date Of Birth (As per NID)"
							value={nominee.date_of_birth}
							name={`date_of_birth_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "post_code", e.target.value)}
							label="Post Code"
							value={nominee.post_code}
							name={`post_code_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "percentage", e.target.value)}
							label="Percentage"
							value={nominee.percentage}
							name={`percentage_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "state", e.target.value)}
							label="State/Division"
							value={nominee.state}
							name={`state_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "relation_with_client", e.target.value)}
							label="Relation With Client"
							value={nominee.relation_with_client}
							name={`relation_with_client_${index + 1}`}
							type="text"
							required
						/>
						<InputField
							onChange={(e) => handleChange(index, "present_address", e.target.value)}
							label="Present Address"
							value={nominee.present_address}
							name={`present_address_${index + 1}`}
							type="text"
							required
						/>
						<RadioGroup
							label="Sec"
							name="sex"
							options={[
								{ label: "Male", value: "male" },
								{ label: "Female", value: "female" },
								{ label: "Other", value: "other" },
							]}
							value={formData.sex}
							onChange={handleChange}
							required={true}
							classStyle="space-y-2"
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
										handleChange(index, "nid_front_image", e.target.files[0])
									}
									className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								/>
								{formData.nominees[index].nid_front_image && (
									<div className="h-10 w-28">
										<img
											src={formData.nominees[index].nid_front_image}
											alt="NID Front Image Preview"
											className="object-cover w-full h-full rounded-md"
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
									onChange={(e) => handleChange(index, "nid_back_image", e.target.files[0])}
									className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								/>
								{formData.nominees[index].nid_back_image && (
									<div className="h-10 w-28">
										<img
											src={formData.nominees[index].nid_back_image}
											alt="NID Back Image Preview"
											className="object-cover w-full h-full rounded-md"
										/>
									</div>
								)}
							</div>
						</div>
					</div>
				))}
			</div>

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
					content={"Add Another Nominee"}
					handleClick={handleAddNominee}
				/>
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
