import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const navButtonVariants = {
  hover: {
    y: -2,
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
    transition: { type: 'spring', stiffness: 300 },
  },
};

const buttonClass =
  'px-3 py-[6px] rounded-md border border-cyan-500 text-cyan-300 hover:bg-blue-800 hover:text-white transition-all duration-200 text-sm';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <nav className="bg-[#0f172a] p-4 text-white flex justify-between items-center shadow-md backdrop-blur-md border-b border-slate-700 z-50">
      <Link
        href="/"
        className="text-xl font-semibold tracking-wide text-cyan-400 hover:text-green-400 transition"
      >
        Saylani Microfinance
      </Link>

      <div className="flex gap-2 items-center">
        <motion.div variants={navButtonVariants} whileHover="hover">
          <Link href="/calculator" className={buttonClass}>
            Loan Calculator
          </Link>
        </motion.div>

        {!isLoggedIn ? (
          <>
            <motion.div variants={navButtonVariants} whileHover="hover">
              <Link href="/register" className={buttonClass}>
                Register
              </Link>
            </motion.div>

            <motion.div variants={navButtonVariants} whileHover="hover">
              <Link href="/login" className={buttonClass}>
                Login
              </Link>
            </motion.div>
          </>
        ) : (
          <>
            <motion.div variants={navButtonVariants} whileHover="hover">
              <Link href="/change-password" className={buttonClass}>
                Change Password
              </Link>
            </motion.div>

            <motion.button
              onClick={handleLogout}
              variants={navButtonVariants}
              whileHover="hover"
              className={buttonClass}
            >
              Logout
            </motion.button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
