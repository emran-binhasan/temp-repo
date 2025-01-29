import React from "react";

const Button = ({ content, classStyle, type, icon, handleClick }) => {
	return (
		<>
			<button
				className={`px-4 py-2 text-white whitespace-nowrap rounded-full up lg:px-7 ${classStyle}`}
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
