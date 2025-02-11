import { FaRegCircleCheck } from "react-icons/fa6";
import React, { useState } from "react";
import TypeComponents from "./account_components/TypeComponents";
import Button from "../../../utils/Button";
import useScrollToTop from "../../../utils/useScrollToTop";

const documents = [
	{ id: 1, doc: "Applicant's and Nominee's National ID card." },
	{ id: 2, doc: "Color Photo and Signature of the Applicant(s) and Nominee(s)." },
	{ id: 3, doc: "Bank Cheque Leaf of the Applicant." },
	{ id: 4, doc: "Applicant's E-TIN certificate (To enjoy tax benefit)." },
	{ id: 5, doc: "Passport copy for Non-resident Bangladeshi (NRB)." },
];

const AccountType = () => {
	useScrollToTop();

	return (
		<div className="text-dhusor">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-14">
				<div className="flex flex-col justify-between">
					<div className="bg-[#CFE8FF] h-full px-6 py-10 rounded-xl">
						<h4 className="mb-4 text-base font-medium">
							Please keep the Soft copy / Picture of the following documents ready:
						</h4>
						<ul className="flex flex-col h-full gap-y-4">
							{documents.map((doc) => (
								<li
									key={doc.id}
									className="flex items-center justify-start text-sm gap-x-2"
								>
									<FaRegCircleCheck
										size={16}
										strokeWidth={1.8}
										className="text-nill"
									/>
									{doc.doc}
								</li>
							))}
						</ul>
					</div>
					{/* <form className="flex flex-col gap-y-3">
						<h4 className="text-sm font-semibold">Search by Mobile Number</h4>
						<input
							type="text"
							value={"Enter mobile number"}
							className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
						/>
						<Button
							content="Continue Previous Application"
							type="submit"
						/>
					</form> */}
				</div>
				<div>
					<TypeComponents />
				</div>
			</div>
		</div>
	);
};

export default AccountType;
