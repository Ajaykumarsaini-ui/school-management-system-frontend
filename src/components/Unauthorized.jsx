import React, { useMemo } from "react";
import { Link } from "react-router";
import { getRoleFromToken } from "../auth/auth";

export default function Unauthorized() {
  const role = useMemo(() => getRoleFromToken()?.toLowerCase() || "login", []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 max-w-md w-full text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">403</h1>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Unauthorized Access</h2>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page with your current role.
        </p>

        <Link
          to={`/${role}`}
          className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
