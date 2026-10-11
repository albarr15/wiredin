import { Outlet } from "react-router";
import NavigationBar from "../NavigationBar";

export default function HomeLayout() {
  return (
    <>
      <NavigationBar />
      <div className="h-[calc(100vh-80px)]">
        <Outlet />
      </div>
    </>
  );
}
