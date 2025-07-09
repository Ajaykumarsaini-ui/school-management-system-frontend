import { Route } from "react-router";
import Layout from "../Layout";
// School Dashboard
import Dashboard from "../pages/school/components/dashboard/Dashboard";

// School Feature Modules
import Addstudents from "../pages/school/components/students/Add-students";
import Students from "../pages/school/components/students/Students";
import Singlestudents from "../pages/school/components/students/getsinglestudent/Getsinglestudent";
import Addclass from "../pages/school/components/class/Add-class";
import Class from "../pages/school/components/class/Classpage";

import Subject from "../pages/school/components/subject/Subjectpage";
import AddSubject from "../pages/school/components/subject/Addsubject";

import Hostlepage from "../pages/school/components/hostle/Hostlepage";
import Addhostle from "../pages/school/components/Hostle/Addhostle";

import Addnotice from "../pages/school/components/Notice/Addnotices";
import Notice from "../pages/school/components/Notice/Notice";
import Addtransport from "../pages/school/components/transport/Add-transport";
import Transportpage from "../pages/school/components/transport/Transportpage";
import Studenttransportregister from "../pages/school/components/transport/Student_transport_register";
import Viewstudenttransportregistred from "../pages/school/components/transport/View_student_transport_registred";

import Accountpage from "../pages/school/components/account/Accountpage";
import Librarypage from "../pages/school/components/library/Librarypage";
import Teacher from "../pages/school/components/teachers/Teacher";
// Exams
import CreateExamschedule from "../pages/school/components/exams/CreateExamschedule";
import Examschedule from "../pages/school/components/exams/Examschedule";
import Examresult from "../pages/school/components/exams/Examresult";
import ProtectedRoutes from "./Protectedroutes";

//student leave
import Leavestudent from "../pages/school/components/studentleave/Studentleave";

//teacher leave
import Leaveteacher from "../pages/school/components/teacherleave/Teacherleave";
//student message
import Studentmessage from "../pages/school/components/studentmessage/Studentmessage";
import Teachermessage from "../pages/school/components/teachermessage/Teachermessage";

//teacher add
import AddTeacher from "../pages/school/components/teachers/AddTeacher";

export const SchoolRoutes = () => (
  <Route
    path="/school"
    element={
      <ProtectedRoutes allowedRoles={["SCHOOL"]}>
        <Layout />
      </ProtectedRoutes>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="addstudents" element={<Addstudents />} />
    <Route path="addteachers" element={<AddTeacher />} />
    <Route path="addsubject" element={<AddSubject />} />
    <Route path="addhostle" element={<Addhostle />} />
    <Route path="addnotice" element={<Addnotice />} />
    <Route path="addtransport" element={<Addtransport />} />
    <Route path="tr_reg_student" element={<Studenttransportregister />} />
    <Route path="addclass" element={<Addclass />} />
    <Route path="createexamschedule" element={<CreateExamschedule />} />

    <Route path="students" element={<Students />} />
    <Route path="students/:id" element={<Singlestudents />} />
    <Route path="teachers" element={<Teacher />} />
    <Route path="class" element={<Class />} />
    <Route path="subject" element={<Subject />} />
    <Route path="hostel" element={<Hostlepage />} />
    <Route path="notices" element={<Notice />} />
    <Route path="transport" element={<Transportpage />} />
    <Route path="account" element={<Accountpage />} />
    <Route path="library" element={<Librarypage />} />
    <Route
      path="view_tr_reg_student"
      element={<Viewstudenttransportregistred />}
    />
    <Route path="examschedule" element={<Examschedule />} />
    <Route path="examresult" element={<Examresult />} />

    <Route path="studentleave" element={<Leavestudent />} />
    <Route path="studentmessage" element={<Studentmessage />} />
    <Route path="teacherleave" element={<Leaveteacher />} />
    <Route path="teachermessage" element={<Teachermessage />} />
  </Route>
);
