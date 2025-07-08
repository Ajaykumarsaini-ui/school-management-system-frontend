import { Route } from "react-router";
import Student from "../pages/students/Student";
import DetailsStudents from "../pages/students/component/students-details/Details.Students";
import AttendenceStudents from "../pages/students/component/attendence/Attendence.Students";
import NoticesStudents from "../pages/students/component/Notice/Notices.Students";
import ExamresultStudents from "../pages/students/component/Exams/Examresult.Students";
import ExamscheduleStudents from "../pages/students/component/Exams/Examschedule.Students";
import ProtectedRoutes from "./Protectedroutes";
import Messagestudent from "../pages/students/component/Message/Message.student";
import Subjectsstudent from "../pages/students/component/subjects/Subjects.student";
import Leavestudent from "../pages/students/component/leave/Leave.student";
import Addleavestudent from "../pages/students/component/leave/Addleave.student";
import AddMessage from "../pages/students/component/Message/CreateMessage.student";

export const StudentRoutes = () => (
  <Route
    path="/student"
    element={
      <ProtectedRoutes allowedRoles={["STUDENT"]}>
        <Student />
      </ProtectedRoutes>
    }
  >
    <Route index element={<DetailsStudents />} />
    <Route path="attendence" element={<AttendenceStudents />} />
    <Route path="notices" element={<NoticesStudents />} />
    <Route path="examschedule" element={<ExamscheduleStudents />} />
    <Route path="examresult" element={<ExamresultStudents />} />
    <Route path="messages" element={<Messagestudent />} />
    <Route path="subjects" element={<Subjectsstudent />} />
    <Route path="leave" element={<Leavestudent />} />
    <Route path="addleave" element={<Addleavestudent />} />
    <Route path="addmessage" element={<AddMessage />} />
  </Route>
);
