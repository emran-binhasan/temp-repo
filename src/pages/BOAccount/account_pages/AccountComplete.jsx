import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AccountComplete = () => {
	const navigate = useNavigate();

	// Retrieve and parse form data (Array of Objects)
	const formDataArray = JSON.parse(localStorage.getItem("formData")) || [];

	// Merge multiple objects into a single object
	const mergedData = Object.assign({}, ...formDataArray);

	// Convert Base64 to File
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

	const submitData = async () => {
		const form = new FormData();

		// Append all fields to FormData
		for (const key in mergedData) {
			if (mergedData[key]) {
				// Check if the value is a Base64 string (image)
				if (typeof mergedData[key] === "string" && mergedData[key].startsWith("data:image")) {
					const file = base64ToFile(mergedData[key], `${key}.png`); // Convert Base64 to File
					form.append(key, file);
				} else {
					form.append(key, mergedData[key]);
				}
			}
		}

		// Debugging: Log FormData entries
		for (const pair of form.entries()) {
			console.log(pair[0], pair[1]);
		}

		try {
			const response = await axios.post(
				"https://akk-khan-final.lifextory.com/api/open-bo-account",
				form,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			console.log("Response:", response.data);
		} catch (error) {
			console.error("Error:", error.message);
		}
	};

	const goBack = () => {
		navigate(-1);
	};

	return (
		<div>
			<button onClick={submitData}>Submit</button>
			<button onClick={goBack}>
				<IoIosArrowBack /> Go Back
			</button>
		</div>
	);
};

export default AccountComplete;
