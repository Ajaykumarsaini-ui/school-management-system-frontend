import React, { useEffect } from "react";
import { useSchool } from "../../../../CustomHooks/useSchool";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const { fetch, school, loading, error } = useSchool();

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const schoolList = Array.isArray(school) ? school : [];

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center">
        <div className="container mx-auto p-6">
          <h4 className="text-center mt-10 text-3xl font-semibold text-gray-800">
            Our Registered Schools
          </h4>

          {loading && (
            <p className="text-center text-blue-500 font-medium mt-6">Loading...</p>
          )}

          {!loading && schoolList.length === 0 && (
            <p className="text-center text-gray-500 mt-6">No schools found.</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {schoolList.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-5 border hover:shadow-xl transition duration-300"
              >
                <img
                  src={item.school_image}
                  alt={item.school_name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-700">
                  {item.school_name}
                </h3>
                {/* <p className="text-gray-600">Owner: {item.owner_name}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
