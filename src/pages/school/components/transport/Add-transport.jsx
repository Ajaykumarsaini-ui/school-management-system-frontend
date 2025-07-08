import React from "react";
import { motion } from "framer-motion";
import "../../../../styles/school/transport/addtransport.scss";
import Button from "../../../../components/Button";

const Addtransport = () => {
  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Add Transport</h1>

      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">Vehicle Number</label>
            <input type="text" placeholder="RJ14 ST 9900" className="px-3 py-1 border border-gray-300 rounded-sm" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">Driver Name</label>
            <input type="text" placeholder="Pankaj Yadav" className="px-3 py-1 border border-gray-300 rounded-sm" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">Driver Contact</label>
            <input type="text" placeholder="9911223344" className="px-3 py-1 border border-gray-300 rounded-sm" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">Driver Licence</label>
            <input type="text" placeholder="RJ14DL741852" className="px-3 py-1 border border-gray-300 rounded-sm" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">Route Name</label>
            <input type="text" placeholder="Gopalpura - School" className="px-3 py-1 border border-gray-300 rounded-sm" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">Timing</label>
            <input type="text" placeholder="7:10 AM - 2:45 PM" className="px-3 py-1 border border-gray-300 rounded-sm" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">Seating Capacity</label>
            <input type="number" placeholder="39" className="px-3 py-1 border border-gray-300 rounded-sm" />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-3">Maintenance Status</label>
            <input type="text" placeholder="Scheduled" className="px-3 py-1 border border-gray-300 rounded-sm" />
          </div>
        </div>
        <div className="flex justify-center">
        <Button className="schedule-create-btn my-3 w-fit cursor-pointer">Submit</Button>

        </div>

      </form>
    </motion.div>
  );
};

export default Addtransport;
