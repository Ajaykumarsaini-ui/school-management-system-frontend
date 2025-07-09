import { Route } from "react-router";
import Layout from "../Layout";
// School Dashboard
import Dashboard from "../pages/school/components/dashboard/Dashboard";
//account
import Accountpage from "../pages/school/components/account/Account";

//class
import Addclass from "../pages/school/components/class/Addclass";
import ClassPage from "../pages/school/components/class/Class";
// School Feature Modules

// Students
import AddStudents from "../pages/school/components/students/Addstudents";
import Students from "../pages/school/components/students/Student";
import Getsinglestudent from "../pages/school/components/students/getsinglestudent/Getsinglestudentdata";

// Subjects
import Subjectpage from "../pages/school/components/subject/Subject";
import AddSubject from "../pages/school/components/subject/Addsubject";
//hostle
import Hostlepage from "../pages/school/components/Hostle/Hostlepages";
import Addhostle from "../pages/school/components/Hostle/Addhostle";
//notice
import Addnotice from "../pages/school/components/Notice/Addnotices";
import Notice from "../pages/school/components/Notice/Notice";

//transport
import Transportpage from "../pages/school/components/transport/Transportdata";
import Addtransportrecord from "../pages/school/components/transport/Addtransportrecord";
import Studenttransportreg from "../pages/school/components/transport/Studenttrregister";
import Viewstudenttransportregistred from "../pages/school/components/transport/Viewsttrreg";
// library
import Librarydata from "../pages/school/components/library/Librarydata";
// Exams
import CreateExamschedule from "../pages/school/components/Exams/CreateExamschedules";
import Examschedule from "../pages/school/components/Exams/Examschedules";
import Examresult from "../pages/school/components/Exams/Examresults";
import ProtectedRoutes from "./Protectedroutes";

//student leave
import Studentleave from "../pages/school/components/studentleave/Studentleave";
//teacher leave
//student message
import Studentmessage from "../pages/school/components/studentmessage/Studentmsg";

//teacher
import Addteacherdata from "../pages/school/components/teachers/Addteacherdata";
import Teacherleavepage from "../pages/school/components/teacherleave/Teacherleaves";
import Teachermessage from "../pages/school/components/teachermessage/Teachermessages";
import Teacher from "../pages/school/components/teachers/Teachers";
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
    <Route path="addstudents" element={<AddStudents />} />
    <Route path="addteachers" element={<Addteacherdata />} />
    <Route path="addsubject" element={<AddSubject />} />
    <Route path="addhostle" element={<Addhostle />} />
    <Route path="addnotice" element={<Addnotice />} />
    <Route path="addtransport" element={<Addtransportrecord />} />
    <Route path="tr_reg_student" element={<Studenttransportreg />} />
    <Route path="addclass" element={<Addclass />} />
    <Route path="createexamschedule" element={<CreateExamschedule />} />

    <Route path="students" element={<Students />} />
    <Route path="students/:id" element={<Getsinglestudent />} />
    <Route path="teachers" element={<Teacher />} />
    <Route path="class" element={<ClassPage />} />
    <Route path="subject" element={<Subjectpage />} />
    <Route path="hostel" element={<Hostlepage />} />
    <Route path="notices" element={<Notice />} />
    <Route path="transport" element={<Transportpage />} />
    <Route path="account" element={<Accountpage />} />
    <Route path="library" element={<Librarydata />} />
    <Route
      path="view_tr_reg_student"
      element={<Viewstudenttransportregistred />}
    />
    <Route path="examschedule" element={<Examschedule />} />
    <Route path="examresult" element={<Examresult />} />

    <Route path="studentleave" element={<Studentleave />} />
    <Route path="studentmessage" element={<Studentmessage />} />
    <Route path="teacherleave" element={<Teacherleavepage />} />
    <Route path="teachermessage" element={<Teachermessage />} />
  </Route>
);
