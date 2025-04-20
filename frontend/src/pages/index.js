import React, { useState } from "react";
import LoanCategoryCard from "../components/LoanCategoryCard";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import styles from "../styles/Home.module.css";

const categories = [
  {
    title: "Wedding Loans",
    subcategories: ["Valima", "Furniture", "Valima Food", "Jahez"],
    maxLoan: "PKR 500,000",
    period: "3 Years",
  },
  {
    title: "Home Construction Loans",
    subcategories: ["Structure", "Finishing", "Loan"],
    maxLoan: "PKR 1,000,000",
    period: "5 Years",
  },
  {
    title: "Business Startup Loans",
    subcategories: ["Buy Stall", "Advance Rent", "Shop Assets", "Machinery"],
    maxLoan: "PKR 1,000,000",
    period: "5 Years",
  },
  {
    title: "Education Loans",
    subcategories: ["University Fees", "Child Fees Loan"],
    maxLoan: "Based on requirement",
    period: "4 Years",
  },
];

const textVariant = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.subcategories.some((sub) =>
        sub.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  return (
    <>
      <Navbar />

      <main className={styles.main}>
        {/* Blobs */}
        <div className={styles.blobWrapper}>
          <div className={`${styles.blob} ${styles.blob1}`} />
          <div className={`${styles.blob} ${styles.blob2}`} />
          <div className={`${styles.blob} ${styles.blob3}`} />
        </div>

        {/* Animated Heading */}
        <motion.h1
          className={styles.heading}
          variants={textVariant}
          initial="hidden"
          animate="visible"
        >
          Saylani Microfinance <br />
          <span className={styles.greenHighlight}>Qarze Hasana Program</span>
        </motion.h1>

        {/* Search Bar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2.5rem" }}>
          <input
            type="text"
            placeholder="🔍 Search loan category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {/* Divider */}
        <div className={styles.divider}></div>

        {/* Cards Grid */}
        <div className={styles.gridContainer}>
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.2,
                  duration: 0.6,
                  ease: "easeOut",
                }}
              >
                <LoanCategoryCard category={category} />
              </motion.div>
            ))
          ) : (
            <p className={styles.noResult}>No matching categories found.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
