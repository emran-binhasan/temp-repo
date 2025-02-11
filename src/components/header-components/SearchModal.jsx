import { IoSearch } from "react-icons/io5";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchModal = ({ isOpen, onClose }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const modalRef = useRef(null);

	// Close modal if clicked outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				setSearchTerm("");
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen, onClose]);

	const handleSearch = () => {
		if (searchTerm.trim() !== "") {
			navigate(`/search-results?query=${searchTerm}`);
			onClose(); // Close modal after search
		}
	};

	if (!isOpen) return null;

	return (
		<div className="fixed z-[999] inset-0 bg-black bg-opacity-50">
			<div
				ref={modalRef}
				className="bg-white flex items-center gap-2 py-8 px-4 lg:px-24 rounded-none duration-200 mt-20 shadow-lg w-full"
			>
				<input
					type="text"
					placeholder="Search for Services ..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="focus:outline-0 border-b-2 border-gray-500 focus:border-nill duration-300 p-2 w-full text-black/70"
				/>
				<div className="flex justify-end">
					<button
						onClick={handleSearch}
						className="bg-white border border-black text-black p-3 rounded-full"
					>
						<IoSearch size={20} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default SearchModal;
