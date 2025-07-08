import { create } from "zustand";
import axiosInstance from "../apiservice/AxiosInstance";

const Classstore = create((set) => ({
  classes: [],
  error: null,
  loading: false,

  fetchClasses: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axiosInstance.get(import.meta.env.VITE_CLASS_API);
      set({ classes: res.data, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default Classstore;
