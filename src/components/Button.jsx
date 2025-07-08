import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  hoverColor = "hover:bg-blue-700",
  className = "",
  type = "",
  whileTap = 0.95,
  whileHover = 1.03,
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileTap={{ scale: whileTap }}
      whileHover={{ scale: whileHover }}
      className={`px-4 py-2 rounded font-medium text-md transition-all duration-200 ${bgColor} ${textColor} ${hoverColor} ${className}`}
    >
      {children}
    </motion.button>
  );
}
