import React from "react";
import { motion } from "framer-motion";
import "../styles/components/transportdata.scss";
import Button from "./Button";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const TransportCard = ({ transportData }) => {
  return (
    <div className="transport-card-container grid grid-cols-1 gap-6 mt-6">
      {transportData.map((item, i) => (
        <motion.div
          key={item.id}
          custom={i}
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="transport-card shadow-sm bg-white rounded-sm p-4 border "
        >
          <div className="flex justify-between">
            <div>
              <h2 className="font-medium">{item.vehicle_number}</h2>
              <div className="flex flex-col gap-1 my-3">
                <p>
                  <span className="font-semibold">
                    <strong>Driver name : </strong>
                  </span>{" "}
                  {item.driver_name}
                </p>
                <p>
                  <span className="font-semibold">
                    <strong>Driver Contact : </strong>
                  </span>{" "}
                  {item.driver_contact}
                </p>
                <p>
                  <span className="font-semibold">
                    <strong>Driver Licence No. : </strong>
                  </span>{" "}
                  {item.driver_licence}
                </p>
                <p>
                  <span className="font-semibold">
                    <strong>Vehicle Route : </strong>
                  </span>{" "}
                  {item.route_name}
                </p>
                <p>
                  <span className="font-semibold">
                    <strong>Timing : </strong>
                  </span>{" "}
                  {item.timing}
                </p>
                <p>
                  <span className="font-semibold">
                    <strong>Seating Capacity : </strong>
                  </span>{" "}
                  {item.seating_capacity}
                </p>
              </div>
              <div className="teacher-btns">
                <Button className="py-1 edit  px-4 cursor-pointer">Edit</Button>
                <Button className="py-1 delete  px-4 cursor-pointer">
                  Delete
                </Button>
              </div>
            </div>

            <div>
              <p>
                {/* <span className="font-semibold">
                <strong>Maintenance : </strong>
              </span>{" "} */}
                <span
                  className={`status-badge inline-block px-2 py-1 rounded text-sm font-medium text-white ${
                    item.maintenance_status === "Completed"
                      ? "completed bg-green-500"
                      : item.maintenance_status === "Pending"
                      ? "pending bg-red-500"
                      : "scheduled bg-yellow-500 text-black"
                  }`}
                >
                  Maintenance {item.maintenance_status}
                </span>
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default TransportCard;
