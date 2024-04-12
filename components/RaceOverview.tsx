import { RaceViews } from "@/app/igbaras-ultra-routes/ImuRoutesMap";
import { RaceDetailType } from "@/app/igbaras-ultra-routes/race-details";
import { ScrollableDiv } from "@/app/utils/scroll-detect";
import { MouseEventHandler } from "react";

type RaceOverviewProps = {
  onVisible: (id: RaceViews) => void;
  data: RaceDetailType;
  toggleMapInteraction: (id: RaceViews) => void;
};
export default function RaceOverview({
  onVisible,
  toggleMapInteraction,
  data,
}: RaceOverviewProps) {
  const { title, distance, elevationGain, maxTime, itraPoints, id } = data;

  return (
    <ScrollableDiv id={id} onVisible={onVisible}>
      <div className="pl-3 sm:pl-10 pt-3 sm:pt-10 ">
        <div className="bg-orange-500 w-max px-4 py-1 mb-3">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white ">
            {title}
          </h2>
        </div>
        <InfoItem info={distance} label="DISTANCE" />
        <InfoItem info={elevationGain} label="ELEVATION GAIN" />
        <InfoItem info={maxTime} label="MAX ALLOWED RACE TIME" />
        {itraPoints > 0 ? (
          <InfoItem info={itraPoints} label="ITRA POINTS" />
        ) : null}
        <button
          className="px-6 py-3 bg-slate-900 mt-4"
          onClick={() => toggleMapInteraction(id)}
        >
          <span className="text-white text-sm">Explore Route</span>
        </button>
      </div>
    </ScrollableDiv>
  );
}
type InfoItemProps = {
  info: string | number;
  label: string;
};
function InfoItem({ info, label }: InfoItemProps) {
  return (
    <div className="bg-black/60 w-max px-4 py-1 mb-2">
      <p className=" text-white ">
        <span className="text-base text-gray-300 font-medium">{label}: </span>
        <span className="text-xl font-medium">{info}</span>
      </p>
    </div>
  );
}
