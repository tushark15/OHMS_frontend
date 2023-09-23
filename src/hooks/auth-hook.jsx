import { useCallback, useEffect, useState } from "react";
export function useAuth() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);


  const login = useCallback((userParam, tokenParam) => {
    setUser(userParam);
    setToken(tokenParam);
    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        user: userParam,
        token: tokenParam,
      })
    );
  }, []);


  const logout = useCallback(() => {
    setToken(null);
    setUser({});
    localStorage.removeItem("currentUser");
  }, []);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("currentUser"));
    if (storedData && storedData.token) {
      login(storedData.user, storedData.token);
    }
  }, [login]);

  return { login, logout, user, token };
}
