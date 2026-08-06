import { Outlet } from "react-router";
import NavigationBar from "../navigation-bar";

export default function HomeLayout() {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-col gap-8 h-dvh">
        <Outlet />
      </div>
    </>
  );
}
