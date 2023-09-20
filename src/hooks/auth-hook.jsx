import { useCallback, useEffect, useState } from "react";
export function useAuth() {
  const [user, setUser] = useState({});

  const login = useCallback((user) => {
    setUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
  }, []);
  // (userdata) => {
  //   console.log({ userdata});
  //   setUser(userdata);
  //   localStorage.setItem("currentUser", JSON.stringify(userdata));
  // };

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("currentUser");
  }, []);

  useEffect(()=>{
    const storedData = localStorage.getItem("currentUser");
    if (storedData){
      login(JSON.parse(storedData))
    }
  },[login])

  return { login, logout, user };
}
