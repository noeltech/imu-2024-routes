import { FieldValue } from "firebase/firestore";
import { truncate } from "fs/promises";
import mapboxgl from "mapbox-gl";
import React from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { Marker, Popup } from "react-map-gl";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDebouncedCallback } from "use-debounce";

export default function ElevationProfileControl({ data, mapRef }) {
  const initialMarkerCoordinates = data ? data[0].coordinates : null;
  const [currentMarker, setCurrentMarker] = useState(initialMarkerCoordinates);

  const [referenceData, setReferenceData] = useState(data[0]);
  //   console.log(data.value);
  // const handleTooltipChange = (data) => {
  //   console.log(data);

  //   if (data) {
  //     setActiveIndex(data.index);
  //   } else {
  //     setActiveIndex(null);
  //   }
  // };

  const debouncedFlyTo = useDebouncedCallback((e) => {
    const coord = e.activePayload[0].payload.coordinates;
    const payload = e.activePayload[0].payload;

    setReferenceData(payload);
    setCurrentMarker(coord);
    const center = new mapboxgl.LngLat(coord[0], coord[1]);
    mapRef.current.flyTo({
      center: center,
      zoom: 13,
      pitch: 60,
      duration: 1000,
      speed: 0.6,
    });
  }, 30);

  const effects = useCallback(
    (e) => {
      const coord = e.activePayload[0].payload.coordinates;
      const payload = e.activePayload[0].payload;

      setReferenceData(payload);
      setCurrentMarker(coord);
      const center = new mapboxgl.LngLat(coord[0], coord[1]);
      mapRef.current.flyTo({
        center: center,
        zoom: 13,
        pitch: 60,
        duration: 1000,
        speed: 0.6,
      });
    },
    [mapRef]
  );

  const onMouseMove = useCallback(
    (e) => {
      if (!e.activePayload) return;
      effects(e);
      // debouncedFlyTo(e);
    },
    [effects]
  );

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
            anchor="center"
            pitchAlignment="auto"
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
          <XAxis
            xAxisId={0}
            dataKey="x"
            minTickGap={20}
            tickFormatter={(value) => (value / 1000).toString()}
            label={{
              value: "Distance (km)",

              position: "insideBottom",
              offset: 40,
            }}
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

// const MemoizedXaxis = React.memo(function () {
//   return (

//   );
// });

// MemoizedXaxis.displayName = "xAxis";
