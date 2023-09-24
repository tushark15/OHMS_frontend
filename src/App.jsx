import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import MainHeader from "./navbar/MainHeader";
import StaffAuth from "./auth/StaffAuth";
import StudentAuth from "./auth/StudentAuth";
import StudentForm from "./forms/student/StudentForm";
import StudentDashboard from "./studentDashboard/StudentDashboard";
import Dashboard from "./dashboard/Dashboard";
import ClassDashboard from "./classDashboard/ClassDashboard";
import StaffForm from "./forms/staff/StaffForm";
import React from "react";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./context/auth-context";
import SchoolForm from "./forms/school/SchoolForm";
import About from "./about/About";
import SubjectDashboard from "./subjectDashboard/SubjectDashboard"

function App() {
  const { login, logout, user, token } = useAuth();
  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
      }}
    >
      <MainHeader key={user?._id} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/student/login" element={<StudentAuth />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/student/dashboard/:subject" element={<SubjectDashboard />} />
          <Route
            path="/student/dashboard/:studentClass/:studentId"
            element={<StudentDashboard />}
          />
          <Route path="/staff/login" element={<StaffAuth />} />
          <Route path="/staff/school" element={<SchoolForm />} />
          <Route path="/staff/school/student" element={<StudentForm />} />
          <Route
            path="/staff/school/dashboard/addStaff/:schoolId"
            element={<StaffForm />}
          />
          <Route
            path="/staff/school/dashboard/:schoolId/:schoolClass"
            element={<ClassDashboard />}
          />
          <Route
            path="/staff/school/dashboard/:schoolId"
            element={<Dashboard />}
          />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
