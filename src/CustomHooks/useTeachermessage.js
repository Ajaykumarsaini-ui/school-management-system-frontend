import {
    getAllteachermessage, getteachermessage, deleteteachermessage, addteachermessage

} from "../features/teachermessage/teachermessageThunk.js";

import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";


export const useTeachermessage = () => {
    const dispatch = useDispatch();
    const { teachermessage = [], loading, error } = useSelector((state) => state.teachermessage || {});

    const fetch = useCallback(() => dispatch(getAllteachermessage()), [dispatch]);
    const fetchteachermessage = useCallback((id) => dispatch(getteachermessage(id)), [dispatch]);
    const remove = useCallback((id) => dispatch(deleteteachermessage(id)), [dispatch]);
    const add = useCallback((formData) => dispatch(addteachermessage(formData)), [dispatch]);

    return { teachermessage, loading, error, fetch, fetchteachermessage, remove, add };
}
