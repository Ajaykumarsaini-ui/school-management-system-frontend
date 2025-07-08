import {
  getStudent,               // Optional / legacy use
  getSinglestudent,         // Actual single student by ID
  registerStudent,
  updateStudent,
  deleteStudent,
  getAllstudents,
  studentSubjects
} from "../features/student/studentThunk";

import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { setPage } from "../features/student/studentSlice";

export const useStudent = () => {
  const dispatch = useDispatch();
  const {
    student = null,
    students = [],
    studentSubject = [], 
    page,
    limit,
    totalPages,
    loading,
    error,
  } = useSelector((state) => state.student || {});

  // ✅ 1. Legacy: Get a single student (optional)
  const fetchSingleStudent = useCallback(
    (id) => dispatch(getStudent(id)),
    [dispatch]
  );

  // ✅ 2. New: Get a single student by ID (actual use)
  const fetchSingleStudentbyId = useCallback(
    (id) => dispatch(getSinglestudent(id)),
    [dispatch]
  );

  // ✅ All other utilities
  const fetch = useCallback(
    (page = 1, limit = 100) => dispatch(getAllstudents({ page, limit })),
    [dispatch]
  );

  const fetchSubjects = useCallback(
    (id) => dispatch(studentSubjects(id)),
    [dispatch]
  );

  const remove = useCallback((id) => dispatch(deleteStudent(id)), [dispatch]);

  const add = useCallback(
    (formData) => dispatch(registerStudent(formData)),
    [dispatch]
  );

  const update = useCallback(
    (formData) => dispatch(updateStudent(formData)),
    [dispatch]
  );

  const changePage = useCallback(
    (newPage) => dispatch(setPage(newPage)),
    [dispatch]
  );

  return {
    // 🟢 state
    student,
    students,
    page,
    limit,
    totalPages,
    loading,
    error,
    studentSubject,
    fetchSubjects,

    // 🟢 actions
    fetch,
    remove,
    add,
    update,
    changePage,

    // 🟢 both single-student fetchers
    fetchSingleStudent,       // optional legacy
    fetchSingleStudentbyId,   // actual preferred
  };
};
