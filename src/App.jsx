import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import MainHeader from "./navbar/MainHeader";
import StaffAuth from "./auth/StaffAuth";
import StudentAuth from "./auth/StudentAuth";
import StudentForm from "./forms/StudentForm";
import Dashboard from "./dashboard/Dashboard";
import ClassDashboard from "./classDashboard/ClassDashboard";
import StaffForm from "./forms/StaffForm";
import React from "react";
import { useAuth } from "./hooks/auth-hook";
import { AuthContext } from "./context/auth-context";

function App() {
  const {login, logout, user} = useAuth()
  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout
    }}>
      <div>
        <MainHeader />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/student/login" element={<StudentAuth />} />
            <Route path="/staff/login" element={<StaffAuth />} />
            <Route path="/staff/school/student" element={<StudentForm />} />
            <Route
              path="/staff/school/dashboard/:schoolId"
              element={<Dashboard />}
            />
            <Route
              path="/staff/school/dashboard/:schoolId/addStaff"
              element={<StaffForm />}
            />
            <Route
              path="/staff/school/dashboard/:schoolId/:schoolClass"
              element={<ClassDashboard />}
            />
          </Routes>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
