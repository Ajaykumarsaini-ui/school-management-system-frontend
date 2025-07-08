import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    getAttendenceeverystudent,
    addAttendence, fetchAttendanceByDate, deleteAttendence, studentAttendencestatus
} from "../features/attendence/attendenceThunk";


export const useAttendence = () => {
    const dispatch = useDispatch();

    const {
        attendence = [],
        loading,
        error,
    } = useSelector((state) => state.attendence || {});

    const fetch = useCallback(() => dispatch(getAttendenceeverystudent()), [dispatch]);
    const add = useCallback((formData) => dispatch(addAttendence(formData)), [dispatch]);
    const fetchbydate = useCallback((data) => dispatch(fetchAttendanceByDate(data)), [dispatch])
    const deleteattendence = useCallback((attendanceId) => dispatch(deleteAttendence(attendanceId)), [dispatch]);
    const studentattendencestatus = useCallback((studentId) => dispatch(studentAttendencestatus(studentId)), [dispatch]);


    return { attendence, loading, error, fetch, add, fetchbydate, deleteattendence, studentattendencestatus };
}

