import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
    getstudentleave,
    updatestudentleave,
    registerstudentleave,
    deletestudentleave,
    getstudentleaveById,
} from "../features/studentleave/studentleaveThunk";

export const useStudentleave = () => {
    const dispatch = useDispatch();
    const {
        studentleave = [],
        loading,
        error,
    } = useSelector((state) => state.studentleave || {});

    const fetch = useCallback(() => dispatch(getstudentleave()), [dispatch]);
    const add = useCallback((data) => dispatch(registerstudentleave(data)), [dispatch]);
    const remove = useCallback((id) => dispatch(deletestudentleave(id)), [dispatch]);
    const update = useCallback((id, leaveStatus) =>
        dispatch(updatestudentleave({ id, leaveStatus })), [dispatch]);

    const fetchSingle = useCallback((id) => dispatch(getstudentleaveById(id)), [dispatch]);

    return { studentleave, loading, error, fetch, fetchSingle, add, remove, update };
};
