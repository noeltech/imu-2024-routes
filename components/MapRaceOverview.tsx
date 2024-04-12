import { RaceDetailType } from "@/app/igbaras-ultra-routes/race-details";
import { ScrollableDiv } from "@/app/utils/scroll-detect";
import { ReactNode, useCallback, useState } from "react";
import Legend from "./Legend";
import { RaceViews } from "@/app/igbaras-ultra-routes/ImuRoutesMap";
import goBackIcon from "../public/back.svg";
import Image from "next/image";

type MapRaceOverviewProps = {
  isVisible: boolean;
  data: RaceDetailType | null;
  onBackToSelection: (id: RaceViews) => void;
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
  const { title, distance, elevationGain, maxTime, itraPoints, id, layerName } =
    data;

  return (
    <>
      <div className="flex sm:pt-4 sm:pl-4 sm:pr-4 items-center flex-wrap gap-2 justify-start  z-50 ">
        <div className="w-full sm:w-max flex justify-between z-50  bg-black/80 px-4 py-2">
          <div className="flex items-center w-full mr-4 gap-4 ">
            <h2 className="text-2xl sm:text-4xl mr-4 font-extrabold text-orange-500  drop-shadow-2xl text-nowrap">
              {title}
            </h2>
            <div className="flex flex-wrap gap-x-4">
              <InfoItem info={distance} label="DISTANCE" />
              {itraPoints > 0 ? (
                <InfoItem
                  info={`${itraPoints} ITRA POINTS`}
                  label="ITRA POINTS"
                />
              ) : null}
              <InfoItem info={elevationGain} label="ELEVATION GAIN" />
              <InfoItem info={maxTime} label="MAX ALLOWED RACE TIME" />
            </div>
          </div>
          <div>
            <button
              className=" bg-slate-900  z-50 rounded-full w-12 h-12 p-0 flex justify-center items-center"
              onClick={() => onBackToSelection(id)}
            >
              <span className="text-white text-sm">
                <Image
                  src={goBackIcon}
                  alt="Trail Routes Image"
                  color="white"
                  width={18}
                  height={18}
                />
              </span>
            </button>
          </div>
        </div>

        <div className="z-50 absolute right-0 bottom-[20%]">
          <Legend />
        </div>
        {/* ELEVATION PROFILE CONTROL CONTAINER */}
        <div className=" absolute bottom-2 z-50 w-full h-[16%]  flex justify-center ">
          <div className="w-[96%]  md:w-[80%] rounded-md overflow-hidden bg-black/70 ">
            {children}
          </div>
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
        {/* <span className="text-xs text-gray-200">{label}: </span> */}
        <span className="text-md sm:text-base">{info}</span>
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
