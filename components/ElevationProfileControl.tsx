import { FieldValue } from "firebase/firestore";
import { truncate } from "fs/promises";
import mapboxgl from "mapbox-gl";
import { useCallback, useState } from "react";
import { Marker, Popup } from "react-map-gl";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

export default function ElevationProfileControl({ data }) {
  const initialMarkerCoordinates = data ? data[0].coordinates : null;
  const [currentMarker, setCurrentMarker] = useState(initialMarkerCoordinates);

  const [referenceData, setReferenceData] = useState({});
  //   console.log(data.value);
  // const handleTooltipChange = (data) => {
  //   console.log(data);

  //   if (data) {
  //     setActiveIndex(data.index);
  //   } else {
  //     setActiveIndex(null);
  //   }
  // };

  const onMouseMove = useCallback((e) => {
    console.log(e);

    if (!e.activePayload) return;
    const coord = e.activePayload[0].payload.coordinates;
    const payload = e.activePayload[0].payload;

    setReferenceData(payload);
    setCurrentMarker(coord);
  }, []);

  const customTooltip = (
    <div className="bg-white rounded-sm border-slate-800 p-2">
      <p className="font-semibold">Distance: {referenceData.x / 1000} km</p>
      <p className="font-semibold">Elevation: {referenceData.y} m </p>
    </div>
  );

  // const customPopup = (
  //   <Popup
  //     anchor="top-right"
  //     offset={10}
  //     longitude={currentMarker[0]}
  //     latitude={currentMarker[1]}
  //   >
  //     {customTooltip}
  //   </Popup>
  // );

  return (
    <>
      {currentMarker ? (
        <>
          <Marker
            longitude={currentMarker[0]}
            latitude={currentMarker[1]}
            color="red"
            anchor="top"
          />
          {/* <Popup
            anchor="top-right"
            offset={10}
            longitude={currentMarker[0]}
            latitude={currentMarker[1]}
          >
            {customTooltip}
          </Popup> */}
        </>
      ) : null}
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
          onMouseMove={onMouseMove}
          // onMouseEnter={onMouseMove}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            xAxisId={0}
            dataKey="x"
            minTickGap={20}
            tickFormatter={(value, i) => (value / 1000).toString()}
            label={{
              value: "Distance (km)",

              position: "insideBottom",
              offset: 40,
            }}
          />
          <YAxis
            type="number"
            dataKey="y"
            label={{
              value: "Elevation (m)",
              angle: -90,
              position: "insideBottomLeft",
              offset: 15,
            }}
            // tickCount={5}
            // interval={"equidistantPreserveStart"}
          />

          <Tooltip
            // onMouseEnter={handleTooltipChange}
            // onMouseLeave={handleTooltipChange}
            cursor={{ stroke: "red", strokeWidth: 1 }}
            active={true}
            content={customTooltip}
            itemStyle={{ color: "black" }}
            allowEscapeViewBox={{ x: false, y: false }}
          />
          <Area
            type="linear"
            dataKey="y"
            stroke="rgb(249 115 22)"
            fill="rgba(15 23 42)"
            strokeWidth={1}
            // fill="#8884d8"s
            activeDot={{ stroke: "red", strokeWidth: 2, r: 5 }}

            // strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
