import { useEffect } from "react";
import { useMap } from "react-map-gl";

export default function MapInfo() {
  const { current: map } = useMap();
  // const [viewState, setViewState] = useState();

  useEffect(() => {
    const onMoveMap = (e: mapboxgl.EventData) => {
      const { viewState } = e;
      // console.log(viewState);
      // setViewState(viewState);
    };
    map?.on("zoomend", onMoveMap);
    map?.on("pitchend", onMoveMap);
    map?.on("rotateend", onMoveMap);
    return () => {
      map?.off("zoomend", onMoveMap);
      map?.off("pitchend", onMoveMap);
      map?.off("rotateend", onMoveMap);
    };
  }, [map]);
  return null;
}
