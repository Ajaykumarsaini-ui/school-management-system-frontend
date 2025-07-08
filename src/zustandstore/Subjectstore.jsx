import { create } from "zustand";

const Subjectstore = create((set) => ({
  subjects: [],
  error: null,
  loading: false,

  fetchSubjects: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axiosInstance.get(import.meta.env.VITE_SUBJECT_API);
      set({ subjects: res.data, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default Subjectstore;

