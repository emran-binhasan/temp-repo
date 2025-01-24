import { FaAsterisk } from "react-icons/fa6";
import React from "react";

const InputField = ({ onChange, label, value, name, placeholder, type, required }) => {
	return (
		<>
			<div className="space-y-1 md:space-y-2">
				<label
					htmlFor={name}
					className="flex items-center justify-start text-xs font-semibold md:text-sm"
				>
					{required && <FaAsterisk className="w-2.5 h-2.5 md:w-3 md:h-3" />}
					{label}
				</label>
				<input
					type={type}
					id={name}
					name={name}
					defaultValue={value}
					onChange={onChange}
					placeholder={placeholder}
					className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
					required={required}
					// defaultValue={defaultValue}
				/>
			</div>
		</>
	);
};

export default InputField;
