import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
    getteacherleave,
    updateteacherleave,
    registerteacherleave,
    deleteteacherleave,
    getteacherleaveById,
} from "../features/teacherleave/teacherleaveThunk";

export const useTeacherleave = () => {
    const dispatch = useDispatch();
    const {
        teacherleave = [],
        loading,
        error,
    } = useSelector((state) => state.teacherleave || {});

    const fetch = useCallback(() => dispatch(getteacherleave()), [dispatch]);
    const add = useCallback((data) => dispatch(registerteacherleave(data)), [dispatch]);
    const remove = useCallback((id) => dispatch(deleteteacherleave(id)), [dispatch]);
    const update = useCallback((id, leaveStatus) =>
        dispatch(updateteacherleave({ id, leaveStatus })), [dispatch]);

    const fetchSingle = useCallback((id) => dispatch(getteacherleaveById(id)), [dispatch]);

    return { teacherleave, loading, error, fetch, fetchSingle, add, remove, update };
};
