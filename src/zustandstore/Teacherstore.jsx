import { create } from "zustand";
import axiosInstance from "../apiservice/AxiosInstance";

const Teacherstore = create((set) => ({
  teachers: [],
  error: null,
  loading: false,

  fetchTeachers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(import.meta.env.VITE_TEACHER_API);
      set({ teachers: res.data, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default Teacherstore;
