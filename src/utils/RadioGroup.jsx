import { Asterisk } from "lucide-react";
import React from "react";

const RadioGroup = ({ classStyle, label, name, options, value, onChange, required }) => {
	return (
		<div className="space-y-1 md:space-y-2">
			<label className="flex items-center justify-start text-xs font-semibold md:text-sm">
				{required && <Asterisk size={16} />}
				{label}
			</label>
			<div className={`${classStyle}`}>
				{options.map((option) => (
					<label
						key={option.value}
						className="flex items-center space-x-2 cursor-pointer"
					>
						<input
							type="radio"
							name={name}
							value={option.value}
							checked={value === option.value}
							onChange={(e) => onChange(e)}
							className="hidden peer"
							required={required}
						/>
						<span className="flex items-center justify-center w-4 h-4 border-2 border-gray-500 rounded-full peer-checked:border-nill peer-checked:bg-nill">
							<div className="w-2.5 h-2.5 bg-white rounded-full"></div>
						</span>
						<span className="text-xs font-semibold md:text-sm mt-1.5 md:mt-0">
							{option.label}
						</span>
					</label>
				))}
			</div>
		</div>
	);
};

export default RadioGroup;
