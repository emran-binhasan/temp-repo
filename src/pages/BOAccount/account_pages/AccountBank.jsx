import { useState } from "react";
import useScrollToTop from "../../../utils/useScrollToTop";
import InputField from "../../../utils/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";
import FloatingButton from "../../../utils/FloatingButton";
import { ChevronLeft } from "lucide-react";

const AccountBank = () => {
	const navigate = useNavigate();
	const pageId = "Bank Account";
	useScrollToTop();

	const [formData, setFormData] = useState({
		pageId,
		bank_name: "",
		branch_name: "",
		routing_number: "",
		account_number: "",
		swift_code: "",
		checkbook_image: null,
	});

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

	// go back button
	const goBack = () => {
		navigate(-1);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
					<h4 className="w-full col-span-1 pb-3 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
						Enter Bank Details
					</h4>
					{/* name of bank */}
					<InputField
						label="Bank Name"
						type="text"
						name="bank_name"
						value={formData.bank_name}
						onChange={handleChange}
						placeholder="Enter bank name"
						required
					/>
					{/* branch name */}
					<InputField
						label="Branch Name"
						type="text"
						name="branch_name"
						value={formData.branch_name}
						onChange={handleChange}
						placeholder="Enter branch name"
						required
					/>
					{/* routing number */}
					<InputField
						label="Routing Number"
						type="text"
						name="routing_number"
						value={formData.routing_number}
						onChange={handleChange}
						placeholder="Enter routing number"
						required
					/>
					{/* account number */}
					<InputField
						label="Account Number"
						type="text"
						name="account_number"
						value={formData.account_number}
						onChange={handleChange}
						placeholder="Enter account number"
						required
					/>
					{/* swift code */}
					<InputField
						label="Swift Code"
						type="text"
						name="swift_code"
						value={formData.swift_code}
						onChange={handleChange}
						placeholder="Enter swift code"
						required
					/>
					{/* checkbook image */}
					<div>
						<label className="block mb-2 text-sm font-semibold">Checkbook Image</label>
						<div className="flex items-center justify-between gap-x-4">
							<input
								type="file"
								name="checkbook_image"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-2 focus:ring-gray-400 placeholder:text-hDhusor text-dhusor"
								required
							/>
							{formData.checkbook_image && (
								<div className="h-10 w-28">
									<img
										src={formData.checkbook_image}
										alt="Signature Preview"
										className="object-cover w-full h-full rounded-md"
									/>
								</div>
							)}
						</div>
					</div>
					{/* submit button */}
					<div className="flex items-center justify-end mt-12 lg:col-span-2 gap-x-4">
						<FloatingButton
							icon={ChevronLeft}
							borderColor="white"
							iconSize={20}
							hoverRadius={25}
							buttonSpeed={0.3}
							iconSpeed={0.9}
							classnames={"border border-black h-[2.580rem] w-[7.580rem]"}
							handleClick={goBack}
						/>
						<Button
							type={"submit"}
							content="Save & Next"
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default AccountBank;
