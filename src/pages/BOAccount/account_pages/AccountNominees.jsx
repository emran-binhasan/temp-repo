import React, { useEffect, useState } from "react";
import useScrollToTop from "../../../utils/useScrollToTop";
import InputField from "../../../utils/InputField";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";
import FloatingButton from "../../../utils/FloatingButton";
import { IoIosArrowBack } from "react-icons/io";
import RadioGroup from "../../../utils/RadioGroup";
import Compressor from "compressorjs";
import { FaDeleteLeft } from "react-icons/fa6";

const AccountNominees = () => {
  const navigate = useNavigate();
  const pageId = "Nominees";
  const [showSecondNominee, setShowSecondNominee] = useState(false);
  const [formData, setFormData] = useState({
    nominee_name_1: "",
    passport_number_1: "",
    country_1: "",
    mobile_number_1: "",
    city_1: "",
    date_of_birth_1: "",
    post_code_1: "",
    percentage_1: "",
    state_1: "",
    relation_with_client_1: "",
    present_address_1: "",
    sex_1: "",
    nid_front_image_1: null,
    nid_back_image_1: null,

    nominee_name_2: "",
    passport_number_2: "",
    country_2: "",
    mobile_number_2: "",
    city_2: "",
    date_of_birth_2: "",
    post_code_2: "",
    percentage_2: "",
    state_2: "",
    relation_with_client_2: "",
    present_address_2: "",
    sex_2: "",
    nid_front_image_2: null,
    nid_back_image_2: null,
  });
  useScrollToTop();

  const toggleSecondNominee = () => {
    setShowSecondNominee((prev) => !prev);

    // Reset second nominee fields if hiding
    if (showSecondNominee) {
      setFormData((prevState) => ({
        ...prevState,
        nominee_name_2: "",
        nid_back_image_2: null,
      }));
    }
  };

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
              console.error("Compression failed:", err);
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
   

    // Filter out optional fields if all values are empty for the second nominee
    const optionalFields = Object.keys(formData).filter((key) =>
      key.endsWith("_2")
    );
    const hasSecondNomineeData = optionalFields.some(
      (field) => formData[field]
    );

    // Create a filtered version of the formData
    const filteredData = { ...formData };
    if (!hasSecondNomineeData) {
      optionalFields.forEach((field) => delete filteredData[field]);
    }

    console.log("Selected values:", filteredData);

    // Retrieve existing data from localStorage or initialize an empty array
    const savedData = JSON.parse(localStorage.getItem("formData")) || [];

    // Filter out the current page's data by pageId and update it with the new filteredData
    const updatedData = savedData.filter((page) => page.id !== pageId);
    updatedData.push({ ...filteredData, id: pageId });

    // Save the updated data back to localStorage
    localStorage.setItem("formData", JSON.stringify(updatedData));

    console.log("Form submitted. Updated data:", updatedData);
    navigate("/open-bo-account/complete");
  };

  // go back button
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
        {/* 1st Nominee */}
        <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
          <h4 className="w-full col-span-1 pb-3 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
            Nominee&apos;s Information
          </h4>
          {/* Nominees name */}
          <InputField
            onChange={handleChange}
            label="Nominee Name"
            value={formData.nominee_name_1}
            name="nominee_name_1"
            placeholder="Nominee Name"
            type="text"
            required
          />
          {/* nominees Passport Number */}
          <InputField
            onChange={handleChange}
            label="Passport Number"
            value={formData.passport_number_1}
            name="passport_number_1"
            placeholder="Passport Number"
            type="text"
            required
          />
          {/* nominees Country */}
          <InputField
            onChange={handleChange}
            label="Country"
            value={formData.country_1}
            name="country_1"
            placeholder="Country"
            type="text"
            required
          />
          {/* nominees Mobile Number */}
          <InputField
            onChange={handleChange}
            label="Mobile Number"
            value={formData.mobile_number_1}
            name="mobile_number_1"
            placeholder="Mobile Number"
            type="text"
            required
          />
          {/* nominees City */}
          <InputField
            onChange={handleChange}
            label="City"
            value={formData.city_1}
            name="city_1"
            placeholder="City"
            type="text"
            required
          />
          {/* nominees Date of Birth */}
          <InputField
            onChange={handleChange}
            label="Date of Birth"
            value={formData.date_of_birth_1}
            name="date_of_birth_1"
            placeholder="Date of Birth"
            type="date"
            required
          />
          {/* nominees Post Code */}
          <InputField
            onChange={handleChange}
            label="Post Code"
            value={formData.post_code_1}
            name="post_code_1"
            placeholder="Post Code"
            type="text"
            required
          />
          {/* nominees Percentage */}
          <InputField
            onChange={handleChange}
            label="Percentage"
            value={formData.percentage_1}
            name="percentage_1"
            placeholder="Percentage"
            type="text"
            required
          />
          {/* nominees State */}
          <InputField
            onChange={handleChange}
            label="State"
            value={formData.state_1}
            name="state_1"
            placeholder="State"
            type="text"
            required
          />
          {/* nominees Relation */}
          <InputField
            onChange={handleChange}
            label="Relation with Client"
            value={formData.relation_with_client_1}
            name="relation_with_client_1"
            placeholder="Relation with Client"
            type="text"
            required
          />
          {/* nominees Present Address */}
          <InputField
            onChange={handleChange}
            label="Present Address"
            value={formData.present_address_1}
            name="present_address_1"
            placeholder="Present Address"
            type="text"
            required
          />
          {/* nominees Sex */}
          <RadioGroup
            label="Sex"
            name="sex_1"
            value={formData.sex_1}
            onChange={handleChange}
            options={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
              { label: "Other", value: "other" },
            ]}
            classStyle="flex justify-between items-center w-fit m-0"
          />
          {/* nid_front image */}
          <div className="space-y-1 md:space-y-2">
            <label className="block text-xs font-semibold md:text-sm">
              NID Front image
            </label>
            <div className="flex items-center justify-between gap-x-4">
              <input
                type="file"
                name="nid_front_image_1"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
              />
              {formData.nid_front_image_1 && (
                <div className="h-10 w-28">
                  <img
                    src={formData.nid_front_image_1}
                    alt="Signature Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
          {/* nid_back image */}
          <div className="space-y-1 md:space-y-2">
            <label className="block text-xs font-semibold md:text-sm">
              NID Back image
            </label>
            <div className="flex items-center justify-between gap-x-4">
              <input
                type="file"
                name="nid_back_image_1"
                accept="image/*"
                onChange={handleChange}
                className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
              />
              {formData.nid_back_image_1 && (
                <div className="h-10 w-28">
                  <img
                    src={formData.nid_back_image_1}
                    alt="Signature Preview"
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 2nd Nominee (Optional) */}

        {showSecondNominee && (
          <div className="grid grid-cols-1 gap-4 lg:gap-6 lg:grid-cols-2">
             <div className="w-full flex items-center justify-between col-span-1 pb-3 text-lg font-semibold border-b lg:col-span-2 border-dhusor">
           <h4>Second Nominee&apos;s Information</h4>
		   <button className="text-red-500" onClick={toggleSecondNominee}>
                  <FaDeleteLeft size={24} />
                </button>
		
          </div>
			
			
            {/* Nominees name */}
            <InputField
              onChange={handleChange}
              label="Nominee Name"
              value={formData.nominee_name_2}
              name="nominee_name_2"
              placeholder="Nominee Name"
              type="text"
              required
            />
            {/* nominees Passport Number */}
            <InputField
              onChange={handleChange}
              label="Passport Number"
              value={formData.passport_number_2}
              name="passport_number_2"
              placeholder="Passport Number"
              type="text"
              required
            />
            {/* nominees Country */}
            <InputField
              onChange={handleChange}
              label="Country"
              value={formData.country_2}
              name="country_2"
              placeholder="Country"
              type="text"
              required
            />
            {/* nominees Mobile Number */}
            <InputField
              onChange={handleChange}
              label="Mobile Number"
              value={formData.mobile_number_2}
              name="mobile_number_2"
              placeholder="Mobile Number"
              type="text"
              required
            />
            {/* nominees City */}
            <InputField
              onChange={handleChange}
              label="City"
              value={formData.city_2}
              name="city_2"
              placeholder="City"
              type="text"
              required
            />
            {/* nominees Date of Birth */}
            <InputField
              onChange={handleChange}
              label="Date of Birth"
              value={formData.date_of_birth_2}
              name="date_of_birth_2"
              placeholder="Date of Birth"
              type="date"
              required
            />
            {/* nominees Post Code */}
            <InputField
              onChange={handleChange}
              label="Post Code"
              value={formData.post_code_2}
              name="post_code_2"
              placeholder="Post Code"
              type="text"
              required
            />
            {/* nominees Percentage */}
            <InputField
              onChange={handleChange}
              label="Percentage"
              value={formData.percentage_2}
              name="percentage_2"
              placeholder="Percentage"
              type="text"
              required
            />
            {/* nominees State */}
            <InputField
              onChange={handleChange}
              label="State"
              value={formData.state_2}
              name="state_2"
              placeholder="State"
              type="text"
              required
            />
            {/* nominees Relation */}
            <InputField
              onChange={handleChange}
              label="Relation with Client"
              value={formData.relation_with_client_2}
              name="relation_with_client_2"
              placeholder="Relation with Client"
              type="text"
              required
            />
            {/* nominees Present Address */}
            <InputField
              onChange={handleChange}
              label="Present Address"
              value={formData.present_address_2}
              name="present_address_2"
              placeholder="Present Address"
              type="text"
              required
            />
            {/* nominees Sex */}
            <RadioGroup
              label="Sex"
              name="sex_2"
              value={formData.sex_2}
              onChange={handleChange}
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "female" },
                { label: "Other", value: "other" },
              ]}
              classStyle="flex justify-between items-center w-fit m-0"
              required
            />
            {/* nid_front image */}
            <div className="space-y-1 md:space-y-2">
              <label className="block text-xs font-semibold md:text-sm">
                NID Front image
              </label>
              <div className="flex items-center justify-between gap-x-4">
                <input
                  type="file"
                  name="nid_front_image_2"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
                />
                {formData.nid_front_image && (
                  <div className="h-10 w-28">
                    <img
                      src={formData.nid_front_image}
                      alt="Signature Preview"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
            {/* nid_back image */}
            <div className="space-y-1 md:space-y-2">
              <label className="block text-xs font-semibold md:text-sm">
                NID Back image
              </label>
              <div className="flex items-center justify-between gap-x-4">
                <input
                  type="file"
                  name="nid_back_image_2"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full p-2 bg-white rounded-md focus:outline-0 focus:ring-[3px] duration-300 focus:ring-blue-400/50 placeholder:text-hDhusor text-dhusor"
                />
                {formData.nid_back_image && (
                  <div className="h-10 w-28">
                    <img
                      src={formData.nid_back_image}
                      alt="Signature Preview"
                      className="object-cover w-full h-full rounded-md"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
		  {!showSecondNominee && 
		   <Button
		   type={"button"}
		   content={
			 "Add Another Nominee"
		   }
		   handleClick={toggleSecondNominee}
		 />}
         
          <Button type={"submit"} content="Save & Next" />
        </div>
      </form>
    </div>
  );
};

export default AccountNominees;
