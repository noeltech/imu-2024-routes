export const viewStateMobile = {
  initial: {
    center: [122.21107416260037, 10.781527996457342],
    zoom: 12.924023842835139,
    pitch: 65.99999999999997,
    bearing: 32.70065724310962,
  },
  imu10: {
    zoom: 13.815980309942598,
    pitch: 20.531208813126092,
    bearing: -105.06925334471771,

    center: [122.25249862129169, 10.716028585212769],
  },
  imu21: {
    zoom: 12.63998149523305,
    pitch: 0.04004869922405907,
    bearing: -77.06202611307197,

    center: [122.23667562269958, 10.728241004860607],
  },
  imu50: {
    center: [122.2266510331844, 10.755530058978621],
    zoom: 11.967043298619616,
    pitch: 0.5000000000000002,
    bearing: -51.89779285056272,
  },
  imu80: {
    center: [122.21851076330023, 10.763579411585496],

    zoom: 11.748106272163664,
    pitch: 15.99999999999997,
    bearing: -10.39999999999975,
  },
};

// export const viewStateMobile = {
//   initial: {
//     center: [122.21107416260037, 10.781527996457342],
//     zoom: 12.924023842835139,
//     pitch: 65.99999999999997,
//     bearing: 32.70065724310962,
//   },
//   imu10: {
//     center: [122.2684564700678, 10.712138621471126],
//     zoom: 15.279675692910523,
//     pitch: 73.49999999999997,
//     bearing: -73.9644161589776,
//   },
//   imu21: {
//     center: [122.25590806783379, 10.715834241133194],
//     zoom: 14.311262486607964,
//     pitch: 77,
//     bearing: -44.000000000000114,
//   },
//   imu50: {
//     center: [122.23200475905298, 10.748773346294897],

//     zoom: 14.742900636114136,
//     pitch: 80.00000000000017,
//     bearing: 0,
//   },
//   imu80: {
//     center: [122.2178944527119, 10.802123043602563],

//     zoom: 13.4298798545256,
//     pitch: 72.99999999999991,
//     bearing: 179.9999999999999,
//   },
// };

export const scrollThreshold = {
  initial: { min: 0, max: 200 },
  ten: { min: 201, max: 800 },
  "twenty-one": { min: 801, max: 1600 },
  fifty: { min: 1601, max: 2200 },
  eighty: { min: 2201, max: 5000 },
};

const findThreshold = (value: number) => {
  if (value >= 0 && value <= 200) {
    return "initial";
  } else if (value >= 201 && value <= 800) {
    return "ten";
  } else if (value >= 801 && value <= 1600) {
    return "twenty-one";
  } else if (value >= 1601 && value <= 2200) {
    return "fifty";
  } else {
    return "eighty";
  }
};

export const raceStartView = {
  center: [122.26065647406756, 10.721877104718047],
  zoom: 13.195584147955165,
  pitch: 72.99999999999991,
  bearing: -31.2000000000005,
};
