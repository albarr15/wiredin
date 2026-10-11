import { Outlet } from "react-router";
import NavigationBar from "../NavigationBar";

export default function MainLayout() {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col gap-8 px-8 py-8 lg:px-16">
        <Outlet />
      </div>
    </>
  );
}
