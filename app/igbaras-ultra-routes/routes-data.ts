"use client";
// import distance from "@turf/distance";
// import { promises as fs } from "fs";
// import { point } from "@turf/helpers";
import db from "../config";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { useRef } from "react";

// export default async function useData() {
//   const file = await fs.readFile(
//     process.cwd() + "/race-routes/imu80.json",
//     "utf8"
//   );

//   const data = JSON.parse(file);
//   //   //...
//   //   console.log(typeof data.geometry.coordinates);
//   const coordinates = data.geometry.coordinates;
//   const distances = [];
//   const elevationProfile = [];
//   let totalDistance = 0;
//   for (let i = 1; i < coordinates.length; i++) {
//     const [x1, y1, z1] = coordinates[i - 1];
//     const [x2, y2, z2] = coordinates[i];
//     // const distance = Math.sqrt(
//     //   Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
//     // );
//     const dist = distance(point([x1, y1, z1]), point([x2, y2, z2]), "meters");
//     totalDistance = totalDistance + dist;

//     const profile = {
//       x: Math.round(totalDistance * 1000),
//       y: z2,
//       coordinates: [x2, y2],
//     };
//     elevationProfile.push(profile);
//     // distances.push(totalDistance);
//   }
//   let allowed = 0;
//   let reducer = 50;
//   const reducedEP = elevationProfile.filter((item, index) => {
//     if (index === allowed) {
//       // console.log(allowed);
//       allowed += reducer;
//       return item;
//     }
//   });

//   console.log(reducedEP.length);
//   console.log(reducedEP[reducedEP.length - 1]);
//   saveData(reducedEP);
//   console.log(elevationProfile.length);
//   return elevationProfile;
// }

// const saveData = async (data) => {
//   // const parsedData = JSON.parse(data.value);
//   // console.log(data);
//   try {
//     await setDoc(doc(db, "imu-routes", "imu80"), {
//       route: data,
//     });
//     console.log("Data saved to Firestore");
//   } catch (error) {
//     console.error("Error saving data:", error);
//   }
// };

let initialRoutesRef = { imu10: null, imu21: null, imu50: null, imu80: null };
export default function useRoutes() {
  const routesRef = useRef(initialRoutesRef);
  const { current: routes } = routesRef;
  const getRoute = async (routeName: string) => {
    if (routes[routeName]) return routes[routeName];

    try {
      const docRef = doc(db, "imu-routes", routeName);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        routesRef.current[routeName] = data.route;
        return data.route;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return getRoute;
}
