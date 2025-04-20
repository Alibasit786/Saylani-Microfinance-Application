// frontend/components/LoanCategoryCard.js
import React from 'react';
import Tilt from 'react-parallax-tilt';
import { motion } from 'framer-motion';
import {
  FaRing,
  FaHome,
  FaBriefcase,
  FaGraduationCap,
  FaMoneyCheckAlt,
  FaClock,
} from 'react-icons/fa';

const iconMap = {
  'Wedding Loans': <FaRing className="text-pink-300 text-2xl" />,
  'Home Construction Loans': <FaHome className="text-green-300 text-2xl" />,
  'Business Startup Loans': <FaBriefcase className="text-yellow-300 text-2xl" />,
  'Education Loans': <FaGraduationCap className="text-indigo-300 text-2xl" />,
};

const LoanCategoryCard = ({ category }) => {
  return (
    <Tilt
      glareEnable={true}
      glareMaxOpacity={0.2}
      glareColor="#ffffff"
      glarePosition="all"
      scale={1.04}
      transitionSpeed={1000}
      className="rounded-2xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative bg-blue-900/30 backdrop-blur-lg border border-blue-300/20 rounded-2xl shadow-xl p-6 overflow-hidden group transition-all duration-300 ease-in-out hover:shadow-2xl"
      >
        {/* Glowing gradient border */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 blur-lg opacity-20 group-hover:opacity-40 transition-all duration-500 pointer-events-none"></div>

        <div className="relative z-10 space-y-4 text-white">
          {/* Icon + Title */}
          <div className="flex items-center gap-3">
            {iconMap[category.title]}
            <h2 className="text-2xl font-semibold drop-shadow-sm">{category.title}</h2>
          </div>

          {/* Subcategories */}
          <ul className="text-sm text-blue-100 space-y-1">
            {category.subcategories.map((sub, i) => (
              <li
                key={i}
                title={`Subcategory: ${sub}`}
                className="pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-pink-300"
              >
                {sub}
              </li>
            ))}
          </ul>

          {/* Loan Info */}
          <div className="flex items-center gap-2 text-blue-100">
            <FaMoneyCheckAlt className="text-green-300" />
            <p>
              Max Loan: <strong className="text-white">{category.maxLoan}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2 text-blue-100">
            <FaClock className="text-yellow-300" />
            <p>
              Loan Period: <strong className="text-white">{category.period}</strong>
            </p>
          </div>
        </div>
      </motion.div>
    </Tilt>
  );
};

export default LoanCategoryCard;
