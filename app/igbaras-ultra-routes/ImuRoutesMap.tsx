"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";

import { Layer, LineLayer, Map, MapRef } from "react-map-gl";
import { raceDetails } from "./race-details";
import { ScrollableDiv } from "../utils/scroll-detect";
import { viewStateMobile, raceStartView } from "./constants";
import RaceOverview from "@/components/RaceOverview";
import MapRaceOverview from "@/components/MapRaceOverview";
import Disclaimer from "@/components/Disclaimer";

import ElevationProfileControl from "@/components/ElevationProfileControl";

import useRoutes from "./routes-data";
export type RaceViews = "initial" | "imu10" | "imu21" | "imu50" | "imu80";

const myMapBoxToken = process.env.MAPBOX_TOKEN_API;
export default function IgbarasUltra() {
  const scrollContainerRef = useRef(null);
  const mapRef = useRef<MapRef | null>(null);
  const getRoute = useRoutes();
  const [routesStyle, setRoutesStyle] = useState<LineLayer>(initialStyle);
  const [currentRace, setCurrentRace] = useState<RaceViews>("initial");
  const [routeData, setRouteData] = useState([]);
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  const toggleMapInteraction = () => {
    setIsMapInteractive((prev) => !prev);
  };

  useEffect(() => {
    if (isMapInteractive) {
      mapRef.current?.flyTo({
        ...raceStartView,
        // speed: 0.2,
        // curve: 1,
        duration: 3000,
      });
    }
  }, [isMapInteractive]);

  // useEffect(() => {
  //   console.log(JSON.parse(data.value));
  // }, [data]);

  const handleChangeRoutedata = useCallback(
    async (routeName: RaceViews) => {
      if (routeName === "initial") return;
      try {
        const routeData = await getRoute(routeName);
        if (routeData) {
          setRouteData(routeData);
        }
      } catch (error) {
        throw new Error(`${error}`);
      }
    },
    [getRoute]
  );

  const handleChangeInScrollView = useCallback(
    (id: RaceViews) => {
      const layerName = id === "initial" ? "eighty" : raceDetails[id].layerName;
      const newStyle = getLayerStyle(layerName);
      setRoutesStyle(newStyle);
      setCurrentRace(id);
      // CHANGE THE MAP VIEW
      handleChangeRoutedata(id);
      const viewState = viewStateMobile[id];
      mapRef.current?.flyTo({
        ...viewState,
        // speed: 0.2,
        // curve: 1,
        duration: 3000,
      });
    },
    [handleChangeRoutedata]
  );

  return (
    <main className="min-h-screen relative">
      <div className="absolute inset-0">
        <Map
          ref={mapRef}
          mapboxAccessToken={myMapBoxToken}
          initialViewState={{
            longitude: 122.21107416260037,
            latitude: 10.781527996457342,

            zoom: 12.924023842835139,
            pitch: 65.99999999999997,
            bearing: 32.70065724310962,
          }}
          dragPan={true}
          // mapStyle="mapbox://styles/noeltech/cl3mf1zlh005w15oetwm5zrnx"
          // mapStyle="http://localhost:3000/style.json"
          mapStyle="mapbox://styles/noeltech/cluj6uxu500q701rabzh3b4xa"
          // onMouseMove={onMouseEnter}
          interactiveLayerIds={["imu-2024-routes"]}
          reuseMaps
        >
          {/* <MapInfo /> */}
          <MapRaceOverview
            isVisible={isMapInteractive}
            data={currentRace !== "initial" ? raceDetails[currentRace] : null}
            onBackToSelection={toggleMapInteraction}
          >
            <ElevationProfileControl data={routeData} mapRef={mapRef} />
          </MapRaceOverview>
          {/* <Layer {...routeBorder}></Layer> */}

          <Layer {...routesStyle}></Layer>
        </Map>
      </div>

      <div
        ref={scrollContainerRef}
        className={`  h-screen absolute inset-0 overflow-x-hidden overflow-y-scroll transition-opacity
        duration-500 ${isMapInteractive && "pointer-events-none opacity-0"}`}
      >
        <ScrollableDiv id="initial" onVisible={handleChangeInScrollView}>
          <div className="flex sm:justify-start md:mt-4">
            <div className="w-full sm:w-max bg-black/60 px-4 py-4 mb-2 flex justify-center sm:justify-self-start">
              <h1 className="text-3xl sm:ml-20 sm:text-4xl font-extrabold text-orange-500">
                IGBARAS MOUNTAIN <div>ULTRA 2024 - Trail Routes</div>
              </h1>
            </div>
          </div>
        </ScrollableDiv>
        <RaceOverview
          onVisible={handleChangeInScrollView}
          toggleMapInteraction={toggleMapInteraction}
          data={raceDetails["imu80"]}
        />
        <RaceOverview
          onVisible={handleChangeInScrollView}
          toggleMapInteraction={toggleMapInteraction}
          data={raceDetails["imu50"]}
        />
        <RaceOverview
          onVisible={handleChangeInScrollView}
          toggleMapInteraction={toggleMapInteraction}
          data={raceDetails["imu21"]}
        />
        <RaceOverview
          onVisible={handleChangeInScrollView}
          toggleMapInteraction={toggleMapInteraction}
          data={raceDetails["imu10"]}
        />
      </div>
      <Disclaimer />
    </main>
  );
}
function getLayerStyle(name: string): LineLayer {
  return {
    id: "imu-2024-routes_opacity",
    type: "line",
    source: "composite",
    "source-layer": "imu_2024_routes",
    layout: {},
    paint: {
      // "line-color": "hsl(33, 99%, 51%)",
      "line-color": "#ef6606",
      "line-dasharray": [1, 1],
      "line-width": ["interpolate", ["linear"], ["zoom"], 0, 2, 22, 5],
      "line-opacity": ["match", ["get", "Name"], [`${name}`], 1, 0],
    },
  };
}

const initialStyle: LineLayer = {
  id: "imu-2024-routes_opacity",
  type: "line",
  source: "composite",
  "source-layer": "imu_2024_routes",
  layout: {},
  paint: {
    "line-color": "#ef6606",
    "line-dasharray": [1, 1],
    "line-width": 2,
    "line-opacity": 1,
  },
};

const routeBorder: LineLayer = {
  id: "imu-2024-routes_border",
  type: "line",
  source: "composite",
  "source-layer": "imu_2024_routes",
  layout: {},
  paint: {
    "line-color": "#FFA500",
    // "line-dasharray": [1, 1],
    "line-width": 3,
    "line-opacity": 1,
  },
};

// hsl(272, 100%, 56%)
