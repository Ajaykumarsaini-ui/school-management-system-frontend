import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllnotices,
  deleteNotice,
  registerNotice,
  updateNotice,
  getNotice,
} from "../features/notice/noticeThunk";

export const useNotice = () => {
  const dispatch = useDispatch();
  const {
    notice = [],
    loading,
    error,
  } = useSelector((state) => state.notice || {});

  const fetch = useCallback(() => dispatch(getAllnotices()), [dispatch]);
  const fetchSingleNotice = useCallback(
    (id) => dispatch(getNotice(id)),
    [dispatch]
  );
  const remove = useCallback((id) => dispatch(deleteNotice(id)), [dispatch]);
  const add = useCallback(
    (formData) => dispatch(registerNotice(formData)),
    [dispatch]
  );
  const update = useCallback(
    (formData) => dispatch(updateNotice(formData)),
    [dispatch]
  );

  return {
    notice,
    loading,
    error,
    fetch,
    fetchSingleNotice,
    remove,
    add,
    update,
  };
};
