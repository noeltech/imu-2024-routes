import useResponsiveScreen from "@/app/utils/media-detect";
import React from "react";

export default function AppBar() {
  const isMobile = useResponsiveScreen();

  const heading = isMobile
    ? "IMU 2024 Trail Routes"
    : "IGBARAS MOUNTAIN ULTRA 2024 - Trail Routes";
  return (
    <div className="flex sm:justify-start md:mt-4">
      <div className="w-full sm:w-max bg-black/80 px-4 py-4 mb-2 flex justify-start">
        <h1 className="text-2xl sm:ml-20 sm:text-4xl font-semibold text-orange-500">
          {heading}
        </h1>
      </div>
    </div>
  );
}
