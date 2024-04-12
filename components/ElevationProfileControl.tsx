import useResponsiveScreen from "@/app/utils/media-detect";
import mapboxgl from "mapbox-gl";
import React, { useEffect } from "react";
import { memo, useCallback, useMemo, useState } from "react";
import { Marker, Popup } from "react-map-gl";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

let isFirstRender = true;
export default function ElevationProfileControl({ data, mapRef }) {
  const { isMobile } = useResponsiveScreen();
  const initialMarkerCoordinates = data ? data[0].coordinates : null;
  const [currentMarker, setCurrentMarker] = useState(initialMarkerCoordinates);
  const [referenceData, setReferenceData] = useState(data[0]);

  const effects = useCallback(
    (e) => {
      const coord = e.activePayload[0].payload.coordinates;
      const payload = e.activePayload[0].payload;
      isFirstRender = false;
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

  useEffect(() => {
    return () => {
      isFirstRender = true;
    };
  }, []);
  const customTooltip = (
    <div className="bg-white rounded-sm border-slate-800 p-2 text-black">
      <p className="font-semibold">Distance: {referenceData.x / 1000} km</p>
      <p className="font-semibold">Elevation: {referenceData.y} m </p>
    </div>
  );

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
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          onMouseMove={onMouseMove}
          // onMouseEnter={onMouseMove}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}

          {!isMobile && (
            <>
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
            </>
          )}
          <Tooltip
            // onMouseEnter={handleTooltipChange}
            // onMouseLeave={handleTooltipChange}

            cursor={{ stroke: "red", strokeWidth: 1 }}
            active={true}
            content={customTooltip}
            allowEscapeViewBox={{ x: false, y: false }}
            isAnimationActive={false}
          />
          {isFirstRender && (
            <ReferenceLine
              x={0}
              stroke="red"
              label={{
                value: "Start",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fontSize: 16,
              }}
            />
          )}
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
