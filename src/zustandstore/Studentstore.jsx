import { create } from "zustand";
import axiosInstance from "../apiservice/AxiosInstance";

const Studentstore = create((set) => ({
  students: [],
  error: null,
  loading: false,

  fetchStudents: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(import.meta.env.VITE_STUDENT_API);
      set({ students: res.data, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default Studentstore;
