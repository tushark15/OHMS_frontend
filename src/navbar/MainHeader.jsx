import Navbar from "react-bootstrap/Navbar";
import { useState, useEffect, useContext } from "react";
import Navlinks from "./Navlinks";
const MainHeader = () => {
  const [currentStaff, setCurrentStaff] = useState({});

  useEffect(() => {
    const staff = localStorage.getItem("currentUser");
    if (staff) {
      setCurrentStaff(JSON.parse(staff));
    }
  }, []);

  
  return (
    <Navbar collapseOnSelect expand="md" className="navbar" fixed="top">
      <Navlinks currentStaff={currentStaff}/>
    </Navbar>
  );
};

export default MainHeader;
