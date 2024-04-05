import { RaceViews } from "./ImuRoutesMap";

export type RaceDetailType = {
  title: string;
  maxTime: string;
  elevationGain: string;
  distance: string;
  itraPoints: number;
  layerName: string;
  id: RaceViews;
};

type raceDetailsType = {
  imu10: RaceDetailType;
  imu21: RaceDetailType;
  imu50: RaceDetailType;
  imu80: RaceDetailType;
};
export const raceDetails: raceDetailsType = {
  imu10: {
    title: "IMU 10",
    maxTime: "4 HRS",
    elevationGain: "310 M+",
    distance: "10 KM",
    itraPoints: 0,
    layerName: "ten",
    id: "imu10",
  },
  imu21: {
    title: "IMU 21",
    maxTime: "6 HRS",
    elevationGain: "570 M+",
    distance: "19.80 KM",
    itraPoints: 0,
    layerName: "twenty-one",
    id: "imu21",
  },
  imu50: {
    title: "IMU 50",
    maxTime: "16 HRS",
    elevationGain: "2860 M+",
    distance: "52.80 KM",
    itraPoints: 3,
    layerName: "fifty",
    id: "imu50",
  },
  imu80: {
    title: "IMU 80",
    maxTime: "26 HRS",
    elevationGain: "4400 M+",
    distance: "79.80 KM",
    itraPoints: 4,
    layerName: "eighty",
    id: "imu80",
  },
};
