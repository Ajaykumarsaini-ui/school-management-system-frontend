import React, { useEffect } from "react";
import "./teacherleave.scss";
import Button from "../../../../components/Button";
import { Link } from "react-router"; // ✅ corrected
import { useTeacherleave } from "../../../../CustomHooks/useTeacherleave";
import { toast , ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";

const Teacherleave = () => {
  const { teacherleave, loading, error , fetchSingle } = useTeacherleave();

  const { id } = useParams();

  useEffect(() => {
    fetchSingle(id);
  }, [ fetchSingle ]);






  return (
    <div className="px-4 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-700">All Leave Requests</h1>

        <Link to="/teacher/addleave">
          <Button className="bg-purple-600 py-1 px-3 text-white rounded hover:bg-purple-400 hover:text-black">
            Send Leave Request
          </Button>
        </Link>
      </div>

      {loading && <p className="mt-6 text-blue-500">Loading leaves...</p>}
      {error && <p className="mt-6 text-red-500">Error: {error}</p>}

      {!loading && !error &&  teacherleave?.length === 0 && (
        <p className="mt-6 text-gray-600">No leave requests found.</p>
      )}

      {!loading && teacherleave?.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="table-auto w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">From</th>
                <th className="border px-4 py-2">To</th>
                <th className="border px-4 py-2">Reason</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {teacherleave.length > 0 && teacherleave.map((leave) => (
                <tr key={leave._id}>
                  <td className="border px-2 py-1 text-sm font-medium text-center">{ new Date(leave.fromDate).toLocaleDateString()}</td>
                  <td className="border px-2 py-1 text-sm font-medium text-center">{ new Date(leave.toDate).toLocaleDateString()}</td>
                  <td className="border px-2 py-1 text-sm">{leave.leaveReason}</td>
                  <td className="border px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        leave.leaveStatus === "approved"
                          ? "bg-green-500"
                          : leave.leaveStatus === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {leave.leaveStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Teacherleave;

