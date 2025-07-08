import { useSelector , useDispatch } from "react-redux";
import { useCallback } from "react";
import { getSchool , deleteSchool , getAllschools } from "../features/school/schoolThunk";


export const useSchool = () => {
    const dispatch = useDispatch();
    const {
        school = [],
        loading,
        error,
    } = useSelector((state) => state.school || {});

    const fetchSingleSchool = useCallback(() => dispatch(getSchool()), [dispatch]);
    const remove = useCallback((id) => dispatch(deleteSchool(id)), [dispatch]);
    const fetch = useCallback(() => dispatch(getAllschools()), [dispatch]);

    return { school, loading, error, fetch, fetchSingleSchool, remove };
};      