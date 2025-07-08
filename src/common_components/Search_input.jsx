import { useState } from "react";
import { motion } from "framer-motion";
import "../styles/components/navbar.scss";

export default function SearchInput({
  placeholder = "Search anything here"

}) {

  return (
      <>
        <input type="text" placeholder={placeholder} />
      </>

      
  );
}
