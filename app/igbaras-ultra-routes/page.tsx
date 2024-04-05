import { Metadata } from "next";
import ImuRoutesMap from "./ImuRoutesMap";

export const metadata: Metadata = {
  title: "IMU ROUTES",
  description: "Banwa Tech Website - IMU Routes",
};

export default function IgbarasUltra() {
  return <ImuRoutesMap />;
}
