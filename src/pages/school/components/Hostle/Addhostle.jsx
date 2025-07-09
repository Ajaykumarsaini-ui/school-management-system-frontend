import React from "react";
import { motion } from "framer-motion";
import "../../../../styles/school/hostle/addhostle.scss";
import Button from "../../../../components/Button";

const Addhostle = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="mb-6 text-center">Add Hostel</h1>

      <form className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">
              Hostel Name
            </label>
            <input
              type="text"
              placeholder="Boys Hostel A"
              className="px-3 py-1 border border-gray-300 rounded-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">
              Warden Name
            </label>
            <input
              type="text"
              placeholder="Mr. Rajesh Kumar"
              className="px-3 py-1 border border-gray-300 rounded-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">
              Total Rooms
            </label>
            <input
              type="number"
              placeholder="60"
              className="px-3 py-1 border border-gray-300 rounded-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">
              Location
            </label>
            <input
              type="text"
              placeholder="North Campus"
              className="px-3 py-1 border border-gray-300 rounded-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">
              Contact
            </label>
            <input
              type="text"
              placeholder="9876543210"
              className="px-3 py-1 border border-gray-300 rounded-sm"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">
              Hostel Photo
            </label>
            <motion.input
              type="file"
              whilehover={{ cursor : "pointer" }}  whileTap={{ scale: 0.95 }}
              placeholder="please add file"
              className="px-3 py-1 border cursor-pointer  border-gray-300 rounded-sm"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="schedule-create-btn my-3 w-fit cursor-pointer">
            Submit
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default Addhostle;
