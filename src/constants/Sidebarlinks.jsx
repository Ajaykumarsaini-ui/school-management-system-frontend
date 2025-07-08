import {
  Home,
  User,
  Users,
  BookOpen,
  Banknote,
  LayoutGrid,
  Book,
  CalendarCheck,
  FileText,
  Bell,
  Bus,
  BedDouble,
  ChevronDown,
  ChevronUp,
  SquareChartGantt,
  MessageCircle,
  Timer,
} from "lucide-react";

export const SIDEBAR_LINKS = {
  SCHOOL: [
    { label: "Dashboard", path: "/school", icon: <Home /> },
    { label: "Classes", path: "/school/class", icon: <BookOpen /> },
    { label: "Subjects", path: "/school/subject", icon: <Banknote /> },
    { label: "Notices", path: "/school/notices", icon: <Bell /> },
    {
      label: "Examschedule",
      path: "/school/examschedule",
      icon: <FileText />,
    },
    {
      label: "Examresult",
      path: "/school/examresult",
      icon: <CalendarCheck />,
    },
    { label: "Hostel", path: "/school/hostel", icon: <LayoutGrid /> },
    { label: "Transport", path: "/school/transport", icon: <Bus /> },
    
    
    { label: "Students", path: "/school/students", icon: <Users /> },
    {
      label: "Student Leaves",
      path: "/school/studentleave",
      icon: <BedDouble />,
    },
    {
      label: "Student Message",
      path: "/school/studentmessage",
      icon: <MessageCircle />,
    },
    
    { label: "Teachers", path: "/school/teachers", icon: <User /> },

    {
      label: "Teacher Message",
      path: "/school/teachermessage",
      icon: <MessageCircle />,
    },

    {
      label: "Teacher Leave",
      path: "/school/teacherleave",
      icon: <BedDouble />,
    },

  ],
  TEACHER: [
    { label: "Dashboard", path: "/teacher", icon: <Home /> },
    {
      label: "Attendence",
      path: "/teacher/attendence",
      icon: <CalendarCheck />,
    },
    { label: "Notices", path: "/teacher/notices", icon: <Bell /> },
    {
      label: "Examschedule",
      path: "/teacher/examschedule",
      icon: <FileText />,
    },
    {
      label: "Examresult",
      path: "/teacher/examresult",
      icon: <CalendarCheck />,
    },
    { label: "Messages", path: "/teacher/messages", icon: <MessageCircle /> },
    { label: "Leave", path: "/teacher/leave", icon: <BedDouble /> },
    { label: "Students", path: "/teacher/studentdetails", icon: <Users /> },
    { label: "Timetable", path: "/teacher/timetable", icon: <Timer /> },
  ],

  STUDENT: [
    { label: "Dashboard", path: "/student", icon: <Home /> },
    { label: "Messages", path: "/student/messages", icon: <MessageCircle /> },
    {
      label: "Attendence",
      path: "/student/attendence",
      icon: <CalendarCheck />,
    },
    { label: "Notices", path: "/student/notices", icon: <Bell /> },
    { label: "Subjects", path: "/student/subjects", icon: <Book /> },
    { label: "Leave", path: "/student/leave", icon: <BedDouble /> },

    {
      label: "Examschedule",
      path: "/student/examschedule",
      icon: <FileText />,
    },
    {
      label: "Examresult",
      path: "/student/examresult",
      icon: <CalendarCheck />,
    },
  ],
};
