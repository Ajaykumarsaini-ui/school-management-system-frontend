import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import {
  getAllteachers,
  deleteTeacher,
  registerTeacher,
  getTeacher ,
  getAssignedclassesandstudents
} from "../features/teacher/teacherThunk.js";

export const useTeachers = () => {
  const dispatch = useDispatch();
  const {
    teacher = [],
    classandstudent = [],
    loading,
    error,
  } = useSelector((state) => state.teacher || {});

  const fetch = useCallback(() => dispatch(getAllteachers()), [dispatch]);
  const remove = useCallback((id) => dispatch(deleteTeacher(id)), [dispatch]);
  const add = useCallback(
    (formData) => dispatch(registerTeacher(formData)),
    [dispatch]
  );

  const fetchSingleTeacher = useCallback((id) => dispatch(getTeacher(id)), [dispatch]);

  const fetchClassandstudent = useCallback(() => dispatch(getAssignedclassesandstudents()), [dispatch]);

  return { teacher, loading, error, fetch , remove , add , fetchSingleTeacher , classandstudent , fetchClassandstudent };
};
