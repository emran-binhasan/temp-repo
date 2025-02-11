import { useEffect, useState } from "react";
import useScrollToTop from "../../../utils/useScrollToTop";
import InputField from "../../../utils/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";
import FloatingButton from "../../../utils/FloatingButton";
import { IoIosArrowBack } from "react-icons/io";
import Compressor from "compressorjs";

const AccountBank = () => {
	const navigate = useNavigate();
	const pageId = "Bank Account";
	useScrollToTop();

	const [formData, setFormData] = useState({
		ac_holder_bank_name: "",
		ac_holder_branch_name_of_bank: "",
		ac_holder_routing_number_of_bank: "",
		ac_holder_account_number_of_bank: "",
		ac_holder_swift_code_of_bank: "",
		ac_holder_checkbook_image_of_bank: null,
	});

	useEffect(() => {
		const savedData = JSON.parse(localStorage.getItem("formData")) || [];
		const currentPageData = savedData.find((page) => page.id === pageId);
		if (currentPageData) {
			setFormData(currentPageData);
		}
	}, [pageId]);

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		if (type === "file") {
			const file = files[0];
			if (file) {
				if (file.size > 200 * 1024) {
					new Compressor(file, {
						quality: 0.8,
						maxWidth: 1000,
						maxHeight: 1000,
						success(result) {
							const reader = new FileReader();
							reader.onloadend = () => {
								setFormData((prevState) => ({
									...prevState,
									[name]: reader.result,
								}));
							};
							reader.readAsDataURL(result);
						},
						error(err) {
							// console.error("Compression failed:", err);
						},
					});
				} else {
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
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
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

	const handleSubmit = (e) => {
		e.preventDefault();

		const savedData = JSON.parse(localStorage.getItem("formData")) || [];
		const updatedData = savedData.filter((page) => page.id !== pageId);

		updatedData.push({ ...formData, id: pageId });
		localStorage.setItem("formData", JSON.stringify(updatedData));

		navigate("/open-bo-account/nominees");
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
						name="ac_holder_bank_name"
						value={formData.ac_holder_bank_name}
						onChange={handleChange}
						placeholder="Enter bank name"
						required
					/>
					{/* branch name */}
					<InputField
						label="Branch Name"
						type="text"
						name="ac_holder_branch_name_of_bank"
						value={formData.ac_holder_branch_name_of_bank}
						onChange={handleChange}
						placeholder="Enter branch name"
						required
					/>
					{/* routing number */}
					<InputField
						label="Routing Number"
						type="text"
						name="ac_holder_routing_number_of_bank"
						value={formData.ac_holder_routing_number_of_bank}
						onChange={handleChange}
						placeholder="Enter routing number"
						required
					/>
					{/* account number */}
					<InputField
						label="Account Number"
						type="text"
						name="ac_holder_account_number_of_bank"
						value={formData.ac_holder_account_number_of_bank}
						onChange={handleChange}
						placeholder="Enter account number"
						required
					/>
					{/* swift code */}
					<InputField
						label="Swift Code"
						type="text"
						name="ac_holder_swift_code_of_bank"
						value={formData.ac_holder_swift_code_of_bank}
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
								name="ac_holder_checkbook_image_of_bank"
								accept="image/*"
								onChange={handleChange}
								className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
								required
							/>
							{formData.ac_holder_checkbook_image_of_bank && (
								<div className="h-10 w-28">
									<img
										src={formData.ac_holder_checkbook_image_of_bank}
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
				</div>
			</form>
		</div>
	);
};

export default AccountBank;
