import { Outlet } from "react-router-dom";
import UserChatComponent from "../User/UserChatComponent";

const RouteWithUserChatComponent = () => {
  return (
    <>
      <UserChatComponent /> <Outlet />
    </>
  );
};

export default RouteWithUserChatComponent;
