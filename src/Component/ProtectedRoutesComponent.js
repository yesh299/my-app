import { Outlet, Navigate } from "react-router-dom";
import UserChatComponent from "./User/UserChatComponent";

const ProtectedRoutesComponent = ({ admin }) => {
  // Check if user is authenticated
  const userInfo = localStorage.getItem('userInfo');
  
  if (!userInfo) {
    // Not logged in, redirect to login
    return <Navigate to="/login" />;
  }

  try {
    const user = JSON.parse(userInfo);
    
    if (admin) {
      // Admin route - check if user is admin
      const adminAuth = user && user.isAdmin === true;
      return adminAuth ? <Outlet /> : <Navigate to="/login" />;
    } else {
      // User route - just need to be logged in
      const userAuth = user && user.token;
      return userAuth ? (
        <>
          <UserChatComponent /> <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      );
    }
  } catch (error) {
    // Invalid userInfo, clear it and redirect
    localStorage.removeItem('userInfo');
    return <Navigate to="/login" />;
  }
};
export default ProtectedRoutesComponent;
