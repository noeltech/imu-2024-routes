import { RaceDetailType } from "@/app/igbaras-ultra-routes/race-details";
import { ScrollableDiv } from "@/app/utils/scroll-detect";

type MapRaceOverviewProps = {
  isVisible: boolean;
  data: RaceDetailType | null;
  onBackToSelection: () => void;
};

export default function MapRaceOverview({
  isVisible = false,
  data,
  onBackToSelection,
}: MapRaceOverviewProps) {
  if (!isVisible || !data) return null;
  const { title, distance, elevationGain, maxTime, itraPoints, layerName } =
    data;

  return (
    <div className="flex pt-4 pl-4 items-center flex-wrap gap-2 justify-start">
      <div className="w-max">
        <h2 className="text-4xl sm:text-5xl mr-4 font-extrabold text-orange-500  drop-shadow-2xl text-nowrap">
          {title}
        </h2>
      </div>
      <InfoItem info={distance} label="DISTANCE" />
      {itraPoints > 0 ? (
        <InfoItem info={itraPoints} label="ITRA POINTS" />
      ) : null}
      <InfoItem info={elevationGain} label="ELEVATION GAIN" />
      <InfoItem info={maxTime} label="MAX ALLOWED RACE TIME" />
      {/* <button
        className="px-4 py-1 bg-orange-600 z-50 rounded-sm"
        onClick={onBackToSelection}
      >
        <span className="text-black text-base"> Select Race</span>
      </button> */}
      <button
        className="px-6 py-3 bg-slate-900  z-50"
        onClick={onBackToSelection}
      >
        <span className="text-white text-sm"> SELECT RACE</span>
      </button>
    </div>
  );
}
type InfoItemProps = {
  info: string | number;
  label: string;
};
function InfoItem({ info, label }: InfoItemProps) {
  return (
    <div className="bg-black/60 w-max px-3 py-1  z-50">
      <p className="  text-white ">
        <span className="text-xs ">{label}: </span>
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
