import { Route } from "react-router";
import Teacher from "../pages/Teacher/Teacher";
import DetailsTeacher from "../pages/Teacher/component/teacher-details/Details.Teacher";
import AttendenceTeacher from "../pages/Teacher/component/attendence/Attendence.Teacher";
import Addattendenceteacher from "../pages/Teacher/component/attendence/Addattendence.teacher"
import NoticesTeacher from "../pages/Teacher/component/Notice/Notices.Teacher";
import AddNoticesTeacher from "../pages/Teacher/component/Notice/Add-notices.Teacher";
import ExamscheduleTeacher from "../pages/Teacher/component/Exams/Examschedule.Teacher";
import ExamresultTeacher from "../pages/Teacher/component/Exams/Examresult.Teacher";
import CreateExamscheduleTeacher from "../pages/Teacher/component/Exams/CreateExamschedule.Teacher";
import ProtectedRoutes from "./Protectedroutes";
import Teachermessage from "../pages/Teacher/component/teachermessages/Teachermessage";
import Addmessagessteacher from "../pages/Teacher/component/teachermessages/Addmessage.teacher";
import Teacherleave from "../pages/Teacher/component/teacherleave/Teacherleave";
import Addteacherleave from "../pages/Teacher/component/teacherleave/Addleave.teacher";
import Studentdetailsteacher from "../pages/Teacher/component/studentdetails.teacher/Studentdetails.teacher";
import Timetableteacher from "../pages/Teacher/component/timetableteacher/Timetable.teacher";
import Singlestudentdetail from "../pages/Teacher/component/studentdetails.teacher/getsinglestudent/Getsinglestudent";

export const TeacherRoutes = () => (
  <Route
    path="/teacher"
    element={
      <ProtectedRoutes allowedRoles={["TEACHER"]}>
        <Teacher />
      </ProtectedRoutes>
    }
  >
    <Route index element={<DetailsTeacher />} />
    <Route path="attendence" element={<AttendenceTeacher />} />
    <Route path="addattendence" element = {<Addattendenceteacher/>}/>
    <Route path="notices" element={<NoticesTeacher />} />
    <Route path="examschedule" element={<ExamscheduleTeacher />} />
    <Route path="examresult" element={<ExamresultTeacher />} />
    <Route path="createexamschedule" element={<CreateExamscheduleTeacher />} />
    <Route path="addnotice" element={<AddNoticesTeacher />} />
    <Route path="messages" element={<Teachermessage />} />
    <Route path="addmessage" element={<Addmessagessteacher />} />
    <Route path="leave" element={<Teacherleave />} />
    <Route path="addleave" element={<Addteacherleave />} />
    <Route path="studentdetails" element={<Studentdetailsteacher />} />
    <Route path="timetable" element={<Timetableteacher />} />
    <Route path="students/:id" element={<Singlestudentdetail />} />
  </Route>
);
