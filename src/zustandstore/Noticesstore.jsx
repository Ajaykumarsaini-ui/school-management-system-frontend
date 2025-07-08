import React from "react";
import axiosInstance from "../apiservice/AxiosInstance";
import { create } from "zustand";

const Noticesstore = create((set) => ({
  notices: [],
  error: null,
  loading: false,

  fetchNotices: async () => {
    set({ loading: true });

    try {
      const res = await axiosInstance.get(import.meta.env.VITE_NOTICE_API);
      set({ notices: res.data, loading: false, error: null });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  






}));

export default Noticesstore;
