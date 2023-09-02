import { useEffect, useState } from "react";
import { validateToken } from "../modules/fetch";
import { useNavigate } from "react-router-dom";

export default function PrivateRoute({children}){
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const checkToken = await validateToken()
        if (checkToken) {
          setIsAuthenticated(true)
        } else if (!checkToken) {
          navigate("/")
        }
      } catch (e) {
        console.log(e);
      }
    }
    checkLoginStatus()
  }, []);
  
  return (
    <div>
      {isAuthenticated && children }
    </div>
  )
}