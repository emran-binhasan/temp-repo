import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../../../utils/Button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BackBtn from "../../../utils/BackBtn";
import { FaAsterisk } from "react-icons/fa6";

const AccountComplete = () => {
	const navigate = useNavigate();
	const formDataArray = JSON.parse(localStorage.getItem("formData")) || [];
	const mergedData = Object.assign({}, ...formDataArray);

	const base64ToFile = (base64String, fileName) => {
		const arr = base64String.split(",");
		const mime = arr[0].match(/:(.*?);/)[1];
		const bstr = atob(arr[1]);
		let n = bstr.length;
		const u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new File([u8arr], fileName, { type: mime });
	};

	const submitData = async (e) => {
		e.preventDefault();
		const form = new FormData();

		for (const key in mergedData) {
			if (mergedData[key]) {
				if (typeof mergedData[key] === "string" && mergedData[key].startsWith("data:image")) {
					const file = base64ToFile(mergedData[key], `${key}.png`);
					form.append(key, file);
				} else {
					form.append(key, mergedData[key]);
				}
			}
		}

		toast.promise(
			axios
				.post("https://akk-khan-final.lifextory.com/api/open-bo-account", form, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				})
				.then((response) => {
					localStorage.removeItem("formData");

					navigate("/");

					return response;
				}),
			{
				pending: "Submitting your form...",
				success: "Account created successfully!",
				error: "Something went wrong. Please try again.",
			}
		);
	};

	return (
		<div>
			<form onSubmit={submitData}>
				<div className="space-y-1 md:space-y-2">
					<label
						htmlFor="check"
						className="flex items-center justify-start text-xs font-semibold md:text-sm"
					>
						<FaAsterisk className="w-2.5 h-2.5 md:w-3 md:h-3" />
						Check the box below to complete your account
					</label>
					<div className="ml-2">
						<input
							type="checkbox"
							name="check"
							required
							id="check"
						/>
						<label
							for="check"
							id="check"
							className="ml-2"
						>
							I accept
						</label>
					</div>
				</div>
				{/* submit button */}
				<div className="flex items-center justify-end mt-12 lg:col-span-2 gap-x-4">
					<BackBtn />
					<Button
						type={"submit"}
						content="Submit"
					/>
				</div>
			</form>
		</div>
	);
};

export default AccountComplete;
