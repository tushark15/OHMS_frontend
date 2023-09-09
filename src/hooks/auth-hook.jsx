import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
export function useAuth() {
    return useContext(AuthContext);
  }