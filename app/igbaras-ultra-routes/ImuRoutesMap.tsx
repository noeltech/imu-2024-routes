"use client";

import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";

import { Layer, LineLayer, Map, MapRef, SymbolLayer } from "react-map-gl";
import { raceDetails } from "./race-details";
import { ScrollableDiv } from "../utils/scroll-detect";
import { viewStateMobile, raceStartView } from "./constants";
import RaceOverview from "@/components/RaceOverview";
import MapRaceOverview from "@/components/MapRaceOverview";
import Disclaimer from "@/components/Disclaimer";
import {
  imuPoiStyle as initialImuPoiStyle,
  getImuPoiStyle,
} from "./routes-poi";
import ElevationProfileControl from "@/components/ElevationProfileControl";

import useRoutes from "./routes-data";
import AppBar from "@/components/AppBar";
import { settings } from "firebase/analytics";
import useResponsiveScreen from "../utils/media-detect";
export type RaceViews = "initial" | "imu10" | "imu21" | "imu50" | "imu80";

const myMapBoxToken = process.env.MAPBOX_TOKEN_API;

export default function IgbarasUltra() {
  const scrollContainerRef = useRef(null);
  const mapRef = useRef<MapRef | null>(null);
  const getRoute = useRoutes();
  const [routesStyle, setRoutesStyle] = useState<LineLayer>(initialStyle);
  const [imuPoiStyle, setImuPoiStyle] =
    useState<SymbolLayer>(initialImuPoiStyle);
  const [currentRace, setCurrentRace] = useState<RaceViews>("initial");
  const [routeData, setRouteData] = useState([]);
  const [isMapInteractive, setIsMapInteractive] = useState(false);

  const toggleMapInteraction = (id: RaceViews) => {
    if (isMapInteractive) {
      setImuPoiStyle(initialImuPoiStyle);
      const viewState = viewStateMobile[id];
      mapRef.current?.flyTo({
        ...viewState,
        // speed: 0.2,
        // curve: 1,
        duration: 3000,
      });
    } else {
      mapRef.current?.flyTo({
        ...raceStartView,
        // speed: 0.2,
        // curve: 1,
        duration: 3000,
      });
      const newStyle = getImuPoiStyle(id);
      setImuPoiStyle(newStyle);
    }
    setIsMapInteractive((prev) => !prev);
  };

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
      // const routeName = id === "initial" ? "imu80" : id;
      // const newPoiStyle = getImuPoiStyle(id);
      setRoutesStyle(newStyle);

      const viewState = viewStateMobile[id];
      mapRef.current?.flyTo({
        ...viewState,
        // speed: 0.2,
        // curve: 1,
        duration: 3000,
      });
      setCurrentRace(id);
      // console.log(newPoiStyle);
      // setImuPoiStyle(newPoiStyle);
      // CHANGE THE MAP VIEW
      handleChangeRoutedata(id);
    },
    [handleChangeRoutedata]
  );

  return (
    <main className="h-svh  relative">
      <div className="h-full absolute inset-0">
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
          <Layer {...imuPoiStyle}></Layer>
        </Map>
      </div>

      <div
        ref={scrollContainerRef}
        className={`  h-screen absolute inset-0 overflow-x-hidden overflow-y-scroll transition-opacity
        duration-500 ${isMapInteractive && "pointer-events-none opacity-0"}`}
      >
        <ScrollableDiv id="initial" onVisible={handleChangeInScrollView}>
          <AppBar />
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
