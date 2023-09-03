import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import MainHeader from "./navbar/MainHeader";
import StaffAuth from "./auth/StaffAuth";
import StudentAuth from "./auth/StudentAuth";
import SchoolForm from "./forms/SchoolForm";
import StudentForm from "./forms/StudentForm";
import Dashboard from "./dashboard/Dashboard";
import ClassDashboard from "./classDashboard/ClassDashboard";
import StaffForm from "./forms/StaffForm";

function App() {
  return (
    <div>
      <MainHeader />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/login" element={<StudentAuth />} />
          <Route path="/staff/login" element={<StaffAuth />} />
          <Route path="/staff/school" element={<SchoolForm />} />
          <Route path="/staff/school/student" element={<StudentForm />} />
          <Route path="/staff/school/dashboard/:schoolId" element={<Dashboard />} />
          <Route path="/staff/school/dashboard/:schoolId/addStaff" element={<StaffForm/>} />
          <Route path="/staff/school/:schoolClass" element={<ClassDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
