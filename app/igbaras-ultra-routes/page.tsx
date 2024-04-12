import { Metadata } from "next";
import ImuRoutesMap from "./ImuRoutesMap";

export const metadata: Metadata = {
  title: "IMU TRAIL ROUTES",
  description: "Banwa Tech Website - IMU Routes",
};

export default function IgbarasUltra() {
  // const data = useData();

  return (
    <>
      <ImuRoutesMap />
    </>
  );
}
