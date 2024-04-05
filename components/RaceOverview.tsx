import { ScrollableDiv } from "@/app/utils/scroll-detect";

export default function RaceOverview({
  onVisible,
  toggleMapInteraction,
  data,
}) {
  const { title, distance, elevationGain, maxTime, itraPoints, id } = data;
  console.log(id);
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
          className="px-4 py-2 bg-slate-900"
          onClick={toggleMapInteraction}
        >
          <span className="text-white text-sm"> EXPLORE ROUTE</span>
        </button>
      </div>
    </ScrollableDiv>
  );
}

function InfoItem({ info, label }) {
  return (
    <div className="bg-black/60 w-max px-4 py-1 mb-2">
      <p className=" text-white ">
        <span className="text-base text-gray-300 font-medium">{label}: </span>
        <span className="text-xl font-medium">{info}</span>
      </p>
    </div>
  );
}
