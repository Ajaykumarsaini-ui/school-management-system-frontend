import {
    getAllstudentmessage, getstudentmessage, deletestudentmessage, addstudentmessage

} from "../features/studentmessage/studentmessageThunk.js";

import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect } from "react";


export const useStudentmessage = () => {
    const dispatch = useDispatch();
    const { studentmessage = [], loading, error } = useSelector((state) => state.studentmessage || {});

    const fetch = useCallback(() => dispatch(getAllstudentmessage()), [dispatch]);
    const fetchstudentmessage = useCallback((id) => dispatch(getstudentmessage(id)), [dispatch]);
    const remove = useCallback((id) => dispatch(deletestudentmessage(id)), [dispatch ]);
    const add = useCallback((formData) => dispatch(addstudentmessage(formData)), [dispatch]);

    return { studentmessage, loading, error, fetch, fetchstudentmessage, remove, add };
}
