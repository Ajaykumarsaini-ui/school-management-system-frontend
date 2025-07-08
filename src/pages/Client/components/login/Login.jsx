import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import "../../../../styles/client/Login.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginschool } from "../../../../features/school/schoolThunk";
import { loginstudent } from "../../../../features/student/studentThunk";
import { loginteacher } from "../../../../features/teacher/teacherThunk";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const roleThunkMap = {
  school: loginschool,
  student: loginstudent,
  teacher: loginteacher,
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { role: "school" } });

  const selectedRole = watch("role");

  // All login states
  const { school, error: schoolError } = useSelector((state) => state.school);
  const { student, error: studentError } = useSelector((state) => state.student);
  const { teacher, error: teacherError } = useSelector((state) => state.teacher);

  const onSubmit = (data) => {
    const { email, password, role } = data;
    const payload = { email, password };

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    dispatch(roleThunkMap[role](payload));

    // Auto hide loading in 2s
    setTimeout(() => setLoading(false), 2000);
  };

  const handleSuccessLogin = (userData) => {
    const { token, user, message } = userData;
    localStorage.setItem("token", token);
    localStorage.setItem("role", user.role);
    localStorage.setItem("message", message);
      localStorage.setItem("userId", user._id);  // ✅ Add this line if not already

    toast.success("Login successful!");

    setTimeout(() => navigate(`/${user.role.toLowerCase()}`), 1000);
  };

  useEffect(() => {
    if (school?.token) handleSuccessLogin(school);
    if (student?.token) handleSuccessLogin(student);
    if (teacher?.token) handleSuccessLogin(teacher);
  }, [school, student, teacher]);

  useEffect(() => {
    if (schoolError) toast.error(schoolError);
    if (studentError) toast.error(studentError);
    if (teacherError) toast.error(teacherError);
  }, [schoolError, studentError, teacherError]);

  return (
    <div className="login-wrapper flex items-center justify-center h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <motion.div
        className="login-card bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {/* Role Tabs */}
        <div className="flex justify-between mb-5 gap-2">
          {["school", "teacher", "student"].map((roleOption) => (
            <label
              key={roleOption}
              className={`cursor-pointer w-full py-2 text-center rounded-md font-medium ${
                selectedRole === roleOption
                  ? "bg-purple-700 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              <input
                type="radio"
                value={roleOption}
                {...register("role")}
                className="hidden"
              />
              {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
            </label>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="form-group">
            <label className="block login-labels">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-2 py-1 rounded-md border focus:outline-none focus:border-purple-700"
            />
            {errors.email && (
              <p className="error-message">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="block login-labels">Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-2 py-1 rounded-md border focus:outline-none focus:border-purple-700"
            />
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-2 login-btn rounded-md font-semibold transition"
              disabled={loading}
            >
              {loading ? "Logging in..." : `Login as ${selectedRole}`}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
