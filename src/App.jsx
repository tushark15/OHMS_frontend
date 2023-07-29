import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./home/Home";
import MainHeader from "./navbar/MainHeader";
import StaffAuth from "./auth/StaffAuth";
import StudentAuth from "./auth/StudentAuth";
import SchoolForm from "./forms/SchoolForm";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
