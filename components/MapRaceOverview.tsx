import { RaceDetailType } from "@/app/igbaras-ultra-routes/race-details";
import { ScrollableDiv } from "@/app/utils/scroll-detect";
import { ReactNode, useCallback, useState } from "react";

type MapRaceOverviewProps = {
  isVisible: boolean;
  data: RaceDetailType | null;
  onBackToSelection: () => void;
  routeData?: [];
  children: ReactNode;
};

export default function MapRaceOverview({
  isVisible = false,
  data,
  onBackToSelection,
  children,
}: MapRaceOverviewProps) {
  if (!isVisible || !data) return null;
  const { title, distance, elevationGain, maxTime, itraPoints, layerName } =
    data;

  return (
    <>
      <div className="flex sm:pt-4 sm:pl-4 sm:pr-4 items-center flex-wrap gap-2 justify-start">
        <div className="flex items-center  bg-black/80 z-50 px-8 py-3">
          <h2 className="text-4xl sm:text-5xl mr-4 font-extrabold text-orange-500  drop-shadow-2xl text-nowrap">
            {title}
          </h2>
          <div className="flex flex-wrap gap-x-4">
            <InfoItem info={distance} label="DISTANCE" />
            {itraPoints > 0 ? (
              <InfoItem info={itraPoints} label="ITRA POINTS" />
            ) : null}
            <InfoItem info={elevationGain} label="ELEVATION GAIN" />
            <InfoItem info={maxTime} label="MAX ALLOWED RACE TIME" />
          </div>
        </div>

        <button
          className="px-6 py-3 bg-slate-900  z-50"
          onClick={onBackToSelection}
        >
          <span className="text-white text-sm"> SELECT RACE</span>
        </button>
        <div className=" absolute bottom-5 z-50 w-full h-[20%] flex justify-center">
          <div className="w-full md:w-[80%]  bg-black/50 ">{children}</div>
        </div>
      </div>
    </>
  );
}
type InfoItemProps = {
  info: string | number;
  label: string;
};
function InfoItem({ info, label }: InfoItemProps) {
  return (
    <div className="w-max  ">
      <p className="  text-white ">
        <span className="text-xs text-gray-200">{label}: </span>
        <span className="text-lg">{info}</span>
      </p>
    </div>
  );
}

{
  /* <button
      //   className="px-4 py-2 bg-orange-700"
      //   onClick={toggleMapInteraction}
      // >
      //   <span className="text-black"> Explore Route</span>
      // </button> */
}
