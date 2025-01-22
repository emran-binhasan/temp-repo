import React from "react";

const Button = ({ content, classStyle, type, icon, handleClick }) => {
	return (
		<>
			<button
				className={`px-2 py-2 text-white rounded-full up lg:px-7 ${classStyle}`}
				type={type}
				onClick={handleClick}
			>
				{icon && <span>{icon}</span>}
				<span>{content}</span>
			</button>
		</>
	);
};

export default Button;
