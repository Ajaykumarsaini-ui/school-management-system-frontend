import { registerSchedule , getAllSchedule , deleteSchedule } from "../features/examschedule/scheduleThunk.js";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


export const useSchedule = () => {
    const dispatch = useDispatch();
    const {
        schedule = [],
        loading,
        error,
    } = useSelector((state) => state.schedule || {});

    const add = useCallback((data) => dispatch(registerSchedule(data)), [dispatch]);
    const remove = useCallback((id) => dispatch(deleteSchedule(id)), [dispatch]);
    const fetch = useCallback(() => dispatch(getAllSchedule()), [dispatch]);    

    return { schedule, loading, error, add , remove, fetch };
}