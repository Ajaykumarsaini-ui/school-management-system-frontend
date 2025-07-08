// this is redux store
import { configureStore } from "@reduxjs/toolkit";
import schoolReducer from "../features/school/schoolSlice";
import studentReducer from "../features/student/studentSlice";
import teacherReducer from "../features/teacher/teacherSlice";
import noticeReducer from "../features/notice/noticeSlice";
import classReducer from "../features/class/classSlice";
import subjectReducer from "../features/subject/subjectSlice";
import scheduleReducer from "../features/examschedule/scheduleSlice"
import studentmessageReducer from "../features/studentmessage/studentmessageSlice"
import studentleaveReducer from "../features/studentleave/studentleaveSlice"
import teacherleaveReducer from "../features/teacherleave/teacherleaveSlice"
import teachermessageReducer from '../features/teachermessage/teachermessageSlice'
import attendenceReducer from '../features/attendence/attendenceSlice'
export const store = configureStore({
  reducer: {
    school: schoolReducer,
    student: studentReducer,
    teacher: teacherReducer,
    notice: noticeReducer,
    classes: classReducer,
    subject: subjectReducer,
    schedule: scheduleReducer,
    studentmessage: studentmessageReducer,
    studentleave: studentleaveReducer,
    teacherleave: teacherleaveReducer,
    teachermessage: teachermessageReducer ,
    attendence: attendenceReducer
  },
});

export default store;
