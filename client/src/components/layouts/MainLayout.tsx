import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      {/* TODO: NAVBAR HERE */}
      <div className="w-full px-8 py-6 bg-amber-700"></div>

      <div className="flex flex-col gap-8 px-8 py-8 lg:px-16">
        <Outlet />
      </div>
    </>
  );
}
