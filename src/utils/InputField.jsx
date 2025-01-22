import { Asterisk } from "lucide-react";
import React from "react";

const InputField = ({ onChange, label, value, name, placeholder, type, required }) => {
	return (
		<>
			<div className="space-y-1 md:space-y-2">
				<label
					htmlFor={name}
					className="flex items-center justify-start text-xs font-semibold md:text-sm"
				>
					{required && <Asterisk size={16} />}
					{label}
				</label>
				<input
					type={type}
					id={name}
					name={name}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-2 focus:ring-gray-400 placeholder:text-hDhusor text-dhusor"
					required={required}
				/>
			</div>
		</>
	);
};

export default InputField;
