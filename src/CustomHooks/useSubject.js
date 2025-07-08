import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllsubjects, registerSubject, deleteSubject, updateSubject } from "../features/subject/subjectThunk";


export const useSubject = () => {
    const dispatch = useDispatch();

    const {
        subject = [],
        loading,
        error,
    } = useSelector((state) => state.subject || {});

    const fetch = useCallback(() => dispatch(getAllsubjects()), [dispatch]);
    const remove = useCallback((id) => dispatch(deleteSubject(id)), [dispatch]);
    const add = useCallback((formData) => dispatch(registerSubject(formData)), [dispatch]);
    const update = useCallback((formData) => dispatch(updateSubject(formData)), [dispatch]);

    return { subject, loading, error, fetch, remove, add, update };

}

