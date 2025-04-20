import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-cyan-800 text-white p-6 mt-auto shadow-inner"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0 text-center md:text-left">
          &copy; {new Date().getFullYear()} <span className="font-semibold">Saylani Microfinance</span>. All rights reserved.
        </p>
        <div className="flex space-x-4">
          {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
            <motion.a
              key={i}
              href="#"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300"
              aria-label={Icon.name}
            >
              <Icon className="text-white text-lg" />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
