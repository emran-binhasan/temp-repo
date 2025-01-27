import React, { useState, useEffect } from "react";

const AccountNominees = () => {
	const [formData, setFormData] = useState({
		nominees: [],
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
				nominees: prevData.nominees.slice(0, -1), // Remove the last nominee
			}));
		}
	};

	const handleChange = (index, field, value) => {
		setFormData((prevData) => ({
			...prevData,
			nominees: prevData.nominees.map((nominee, i) =>
				i === index ? { ...nominee, [field]: value } : nominee
			),
		}));
	};

	const handleImageChange = (index, field, file) => {
		const reader = new FileReader();

		reader.onload = (e) => {
			setFormData((prevData) => ({
				...prevData,
				nominees: prevData.nominees.map((nominee, i) =>
					i === index ? { ...nominee, [field]: e.target.result } : nominee
				),
			}));
		};

		reader.readAsDataURL(file);
	};

	return (
		<form onSubmit={handleSubmit}>
			{formData.nominees.map((nominee, index) => (
				<div key={index}>
					<InputField
						onChange={(e) => handleChange(index, "nominee_name", e.target.value)}
						label="Nominee Name"
						value={nominee.nominee_name}
						name={`nominee_name_${index + 1}`} // Dynamically generate name
						type="text"
					/>
					<InputField
						onChange={(e) => handleChange(index, "passport_number", e.target.value)}
						label="Nominee Name"
						value={nominee.passport_number}
						name={`passport_number_${index + 1}`} // Dynamically generate name
						type="text"
					/>
					{/* nid_front image */}
					<div className="space-y-1 md:space-y-2">
						<label className="block text-xs font-semibold md:text-sm">NID Front image</label>
						<div className="flex items-center justify-between gap-x-4">
							<input
								type="file"
								name="nid_front_image"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
							/>
							{formData.nid_front_image && (
								<div className="h-10 w-28">
									<img
										src={formData.nid_front_image}
										alt="Signature Preview"
										className="object-cover w-full h-full rounded-md"
									/>
								</div>
							)}
						</div>
					</div>
					{/* nid_back image */}
					<div className="space-y-1 md:space-y-2">
						<label className="block text-xs font-semibold md:text-sm">NID Back image</label>
						<div className="flex items-center justify-between gap-x-4">
							<input
								type="file"
								name="nid_back_image"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
							/>
							{formData.nid_back_image && (
								<div className="h-10 w-28">
									<img
										src={formData.nid_back_image}
										alt="Signature Preview"
										className="object-cover w-full h-full rounded-md"
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			))}

			<div>
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
