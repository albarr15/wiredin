import ShapeGrid from "../ShapeGrid";
import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex flex-col gap-8 justify-center items-center -mt-8 h-full">
      <h1 className="z-10">WiredIn</h1>

      <div className="z-10 shadow-lg rounded-xl w-sm text-center">
        <Outlet />
      </div>
      <div className="fixed inset-0 ">
        <ShapeGrid
          speed={0.1}
          squareSize={30}
          direction="diagonal"
          borderColor="#E7E5E4"
          hoverFillColor="#FFB900"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>
    </div>
  );
}
