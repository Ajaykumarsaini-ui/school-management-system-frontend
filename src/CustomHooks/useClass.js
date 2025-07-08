import { getAllclasses, addClass, updateClass, deleteClass } from "../features/class/classThunk";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";


export const useClass = () => {
    const dispatch = useDispatch();
    const {
        classes = [],
        loading,
        error,
    } = useSelector((state) => state.classes || {});

    const fetch = useCallback(() => dispatch(getAllclasses()), [dispatch]);
    const remove = useCallback((id) => dispatch(deleteClass(id)), [dispatch]);
    const add = useCallback((formData) => dispatch(addClass(formData)), [dispatch]);
    const update = useCallback((formData) => dispatch(updateClass(formData)), [dispatch]);

    return { classes, loading, error, fetch, remove, add, update };
}