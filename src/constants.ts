import { Color } from "../api/types";

export const SERVER_URI = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_DEV_SERVER_URI : import.meta.env.VITE_PROD_SERVER_URI;
export const SOCKET_SERVER_URI = import.meta.env.VITE_NODE_ENV === "development" ? import.meta.env.VITE_DEV_SOCKET_SERVER_URI : import.meta.env.VITE_PROD_SOCKET_SERVER_URI;

export const CityMarkers = [
  {
    name: "Los Angeles",
    marker_position: {
      x: 11.5,
      y: 60
    },
    label_offset: {
      x: -4.5,
      y: 1.5
    }
  },
  {
    name: "San Francisco",
    marker_position: {
      x: 5,
      y: 43
    },
    label_offset: {
      x: 3,
      y: 3
    }
  },
  {
    name: "Portland",
    marker_position: {
      x: 9.7,
      y: 18
    },
    label_offset: {
      x: 0,
      y: 3
    }
  },
  {
    name: "Seattle",
    marker_position: {
      x: 11.5,
      y: 11
    },
    label_offset: {
      x: -5.5,
      y: -1.7
    }
  },
  {
    name: "Vancouver",
    marker_position: {
      x: 11.5,
      y: 4
    },
    label_offset: {
      x: -5,
      y: -2.5
    }
  },
  {
    name: "Calgary",
    marker_position: {
      x: 25,
      y: 5
    },
    label_offset: {
      x: -1.8,
      y: -3
    }
  },
  {
    name: "Winnipeg",
    marker_position: {
      x: 48.5,
      y: 12
    },
    label_offset: {
      x: 0.5,
      y: -3
    }
  },
  {
    name: "Sault St. Marie",
    marker_position: {
      x: 68.7,
      y: 20.5
    },
    label_offset: {
      x: -3,
      y: -5
    }
  },
  {
    name: "Montreal",
    marker_position: {
      x: 85.5,
      y: 19.5
    },
    label_offset: {
      x: -.5,
      y: -2.5
    }
  },
  {
    name: "Toronto",
    marker_position: {
      x: 77.3,
      y: 28.5
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "Boston",
    marker_position: {
      x: 91,
      y: 28.5
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "New York",
    marker_position: {
      x: 87.5,
      y: 35.5
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "Washington",
    marker_position: {
      x: 85,
      y: 44.5
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "Raleigh",
    marker_position: {
      x: 81.2,
      y: 55
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "Charleston",
    marker_position: {
      x: 81.2,
      y: 63
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "Miami",
    marker_position: {
      x: 82.5,
      y: 88
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "New Orleans",
    marker_position: {
      x: 61.5,
      y: 77.5
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "Houston",
    marker_position: {
      x: 52.5,
      y: 79
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "El Paso",
    marker_position: {
      x: 31,
      y: 70
    },
    label_offset: {
      x: 1,
      y: -0.5
    }
  },
  {
    name: "Phoenix",
    marker_position: {
      x: 21.5,
      y: 63
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Las Vegas",
    marker_position: {
      x: 17,
      y: 52.5
    },
    label_offset: {
      x: -2,
      y: 2.5
    }
  },
  {
    name: "Salt Lake City",
    marker_position: {
      x: 24.5,
      y: 40
    },
    label_offset: {
      x: -8.5,
      y: -4
    }
  },
  {
    name: "Helena",
    marker_position: {
      x: 35,
      y: 23
    },
    label_offset: {
      x: -6.5,
      y: 2
    }
  },
  {
    name: "Duluth",
    marker_position: {
      x: 55.3,
      y: 28.5
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Denver",
    marker_position: {
      x: 35.5,
      y: 46
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Santa Fe",
    marker_position: {
      x: 33.5,
      y: 59.5
    },
    label_offset: {
      x: -5,
      y: -3
    }
  },
  {
    name: "Omaha",
    marker_position: {
      x: 51,
      y: 42
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Kansas City",
    marker_position: {
      x: 51.5,
      y: 50
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Oklahoma City",
    marker_position: {
      x: 49,
      y: 60
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Dallas",
    marker_position: {
      x: 49.5,
      y: 71
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Little Rock",
    marker_position: {
      x: 56,
      y: 64
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Saint Louis",
    marker_position: {
      x: 61.5,
      y: 53
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Nashville",
    marker_position: {
      x: 71,
      y: 58
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Atlanta",
    marker_position: {
      x: 74.5,
      y: 63
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Chicago",
    marker_position: {
      x: 65.2,
      y: 41.5
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Pittsburgh",
    marker_position: {
      x: 78,
      y: 40
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
];

export const Routes = [
  {
    start: "Los Angeles",
    destination: "San Francisco",
    color: Color.Pink,
    path: [
      { x: 10, y: 55, angle: -35 },
      { x: 8.2, y: 50, angle: -30 },
      { x: 6.5, y: 45, angle: -25 }
    ],
  },
  {
    start: "Los Angeles",
    destination: "San Francisco",
    color: Color.Yellow,
    path: [
      { x: 9, y: 56, angle: -35 },
      { x: 7, y: 51, angle: -30 },
      { x: 5.5, y: 45.5, angle: -25 }
    ],
  },
  {
    start: "Portland",
    destination: "San Francisco",
    color: Color.Pink,
    path: [
      { x: 5, y: 38, angle: -10 },
      { x: 4.7, y: 32.8, angle: 0 },
      { x: 5, y: 27.5, angle: 15 },
      { x: 6.3, y: 22.7, angle: 30 },
      { x: 8, y: 18.5, angle: 35 },
    ],
  },
  {
    start: "Portland",
    destination: "San Francisco",
    color: Color.Green,
    path: [
      { x: 3.7, y: 38, angle: -10 },
      { x: 3.4, y: 32.8, angle: 0 },
      { x: 3.7, y: 27.5, angle: 15 },
      { x: 4.8, y: 22.7, angle: 30 },
      { x: 6.4, y: 18.3, angle: 35 },
    ],
  },
  {
    start: "Portland",
    destination: "Seattle",
    color: Color.Wild,
    path: [
      { x: 11, y: 13, angle: 20 },
    ],
  },
  {
    start: "Portland",
    destination: "Seattle",
    color: Color.Wild,
    path: [
      { x: 9.8, y: 12.3, angle: 20 },
    ],
  },
  {
    start: "Vancouver",
    destination: "Seattle",
    color: Color.Wild,
    path: [
      { x: 12, y: 5.8, angle: -2 },
    ],
  },
  {
    start: "Vancouver",
    destination: "Seattle",
    color: Color.Wild,
    path: [
      { x: 10.8, y: 5.8, angle: -2 },
    ],
  },
  {
    start: "Vancouver",
    destination: "Calgary",
    color: Color.Wild,
    path: [
      { x: 15, y: 2, angle: 91 },
      { x: 18, y: 2.2, angle: 92 },
      { x: 21, y: 2.5, angle: 93 },
    ],
  },
  {
    start: "Winnipeg",
    destination: "Sault St. Marie",
    color: Color.Wild,
    path: [
      { x: 51, y: 11.2, angle: 102 },
      { x: 54, y: 12.4, angle: 102 },
      { x: 57, y: 13.6, angle: 102 },
      { x: 60, y: 14.8, angle: 102 },
      { x: 63, y: 16.1, angle: 102 },
      { x: 66, y: 17.3, angle: 102 },
    ],
  },
  {
    start: "Winnipeg",
    destination: "Calgary",
    color: Color.White,
    path: [
      { x: 28, y: 3.5, angle: 90 },
      { x: 31.5, y: 3.7, angle: 91 },
      { x: 35, y: 4, angle: 92 },
      { x: 38.5, y: 4.7, angle: 95 },
      { x: 42, y: 6, angle: 105 },
      { x: 45.5, y: 8, angle: 110 },
    ],
  },
  {
    start: "Helena",
    destination: "Calgary",
    color: Color.Wild,
    path: [
      { x: 26.3, y: 7.1, angle: 135 },
      { x: 28.6, y: 11, angle: 135 },
      { x: 30.8, y: 14.7, angle: 135 },
      { x: 33, y: 18.5, angle: 135 },
    ],
  },
  {
    start: "Helena",
    destination: "Seattle",
    color: Color.Yellow,
    path: [
      { x: 14, y: 10.5, angle: 105 },
      { x: 17.5, y: 12.2, angle: 107 },
      { x: 21, y: 14.2, angle: 109 },
      { x: 24.5, y: 16.5, angle: 112 },
      { x: 28, y: 19, angle: 109 },
      { x: 31.5, y: 21, angle: 105 },
    ],
  },
  {
    start: "Helena",
    destination: "Salt Lake City",
    color: Color.Pink,
    path: [
      { x: 26.8, y: 34.5, angle: 50 },
      { x: 30, y: 30, angle: 45 },
      { x: 33, y: 25, angle: 41 },
    ],
  },
  {
    start: "Portland",
    destination: "Salt Lake City",
    color: Color.Blue,
    path: [
      { x: 24, y: 34, angle: -10 },
      { x: 23, y: 28, angle: -25 },
      { x: 21, y: 23, angle: -45 },
      { x: 18.2, y: 19.2, angle: -60 },
      { x: 15, y: 17.5, angle: -80 },
      { x: 11.8, y: 17, angle: 90 },
    ],
  },
  {
    start: "San Francisco",
    destination: "Salt Lake City",
    color: Color.Orange,
    path: [
      { x: 7.5, y: 40.8, angle: 85 },
      { x: 11, y: 40.5, angle: 85 },
      { x: 14.5, y: 39.8, angle: 85 },
      { x: 18, y: 39, angle: 81 },
      { x: 21.5, y: 38, angle: 80 },
    ],
  },
  {
    start: "San Francisco",
    destination: "Salt Lake City",
    color: Color.White,
    path: [
      { x: 8.2, y: 42.8, angle: 85 },
      { x: 11.7, y: 42.5, angle: 85 },
      { x: 15.2, y: 41.8, angle: 85 },
      { x: 18.7, y: 41, angle: 81 },
      { x: 22.2, y: 40, angle: 80 },
    ],
  },
  {
    start: "Los Angeles",
    destination: "Las Vegas",
    color: Color.Wild,
    path: [
      { x: 12.5, y: 55, angle: 20 },
      { x: 14.5, y: 51.5, angle: 80 },
    ],
  },
  {
    start: "Salt Lake City",
    destination: "Las Vegas",
    color: Color.Orange,
    path: [
      { x: 19.2, y: 50.3, angle: 90 },
      { x: 22.2, y: 48.3, angle: 40 },
      { x: 23.8, y: 43.5, angle: 10 },
    ],
  },
  {
    start: "Salt Lake City",
    destination: "Denver",
    color: Color.Red,
    path: [
      { x: 26.5, y: 39, angle: 107 },
      { x: 29.7, y: 40.8, angle: 107 },
      { x: 33, y: 42.5, angle: 107 },
    ],
  },
  {
    start: "Salt Lake City",
    destination: "Denver",
    color: Color.Yellow,
    path: [
      { x: 26.1, y: 41, angle: 107 },
      { x: 29.3, y: 42.8, angle: 107 },
      { x: 32.6, y: 44.5, angle: 107 },
    ],
  },
  {
    start: "Los Angeles",
    destination: "Phoenix",
    color: Color.Wild,
    path: [
      { x: 13.5, y: 59, angle: 97 },
      { x: 16.5, y: 59.5, angle: 97 },
      { x: 19.5, y: 60.2, angle: 97 },
    ],
  },
  {
    start: "Denver",
    destination: "Santa Fe",
    color: Color.Wild,
    path: [
      { x: 34.5, y: 48.5, angle: 12 },
      { x: 33.8, y: 54, angle: 12 },
    ],
  },
  {
    start: "El Paso",
    destination: "Santa Fe",
    color: Color.Wild,
    path: [
      { x: 32.4, y: 60.8, angle: 18 },
      { x: 31.5, y: 65.5, angle: 18 },
    ],
  },
  {
    start: "El Paso",
    destination: "Phoenix",
    color: Color.Wild,
    path: [
      { x: 23.3, y: 62.5, angle: 113 },
      { x: 26.2, y: 64.8, angle: 113 },
      { x: 29, y: 67, angle: 113 },
    ],
  },
  {
    start: "Santa Fe",
    destination: "Phoenix",
    color: Color.Wild,
    path: [
      { x: 23.6, y: 59, angle: 85 },
      { x: 27, y: 58.5, angle: 85 },
      { x: 30.5, y: 58, angle: 85 },
    ],
  },
  {
    start: "Denver",
    destination: "Phoenix",
    color: Color.White,
    path: [
      { x: 21.5, y: 57, angle: 15 },
      { x: 23.2, y: 52, angle: 50 },
      { x: 26, y: 49, angle: 70 },
      { x: 29, y: 47.8, angle: 80 },
      { x: 32, y: 47, angle: 85 },
    ],
  },
  {
    start: "Denver",
    destination: "Helena",
    color: Color.Green,
    path: [
      { x: 35.3, y: 40.5, angle: -2 },
      { x: 35.2, y: 35.5, angle: -2 },
      { x: 35.1, y: 30.5, angle: -2 },
      { x: 35, y: 25.5, angle: -2 },
    ],
  },
  {
    start: "Winnipeg",
    destination: "Helena",
    color: Color.Blue,
    path: [
      { x: 36.8, y: 20, angle: 63 },
      { x: 39.8, y: 17.4, angle: 63 },
      { x: 42.8, y: 15, angle: 63 },
      { x: 45.8, y: 12.5, angle: 63 },
    ],
  },
];