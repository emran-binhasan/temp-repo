import { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { motion } from "framer-motion"; // For animation
import modalImg from "../../../assets/images/modal.png"
import { IoMdClose } from "react-icons/io";

const SpecialOffersModal = ({ isOpen, onClose }) => {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const offerEndDate = new Date("2025-02-10T23:59:59").getTime(); // Deadline: January 10, 2025

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = offerEndDate - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft("OFFER EXPIRED");
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}D ${hours}H ${minutes}M ${seconds}S`);
      }
    }, 3000);

    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white m-2  shadow-xl max-w-4xl w-full flex overflow-hidden relative">
        {/* Left Image Section */}
       
          <img
            src={modalImg}
            alt="Special Offer"
            className=""
          />
         <button
              onClick={onClose}
              className="absolute top-0 right-0 text-white text-3xl transition-all hover:scale-110"
            >
             <IoMdClose className="bg-gray-100 text-gray-700" size={26}/>
            </button>

        {/* Right Content Section */}
      
      </div>
    </motion.div>
  );
};

export default SpecialOffersModal;
