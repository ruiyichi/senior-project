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
      x: 2,
      y: 2
    }
  },
  {
    name: "Portland",
    marker_position: {
      x: 9.7,
      y: 18
    },
    label_offset: {
      x: 1,
      y: 2
    }
  },
  {
    name: "Seattle",
    marker_position: {
      x: 11.5,
      y: 10
    },
    label_offset: {
      x: 1,
      y: 2
    }
  },
  {
    name: "Vancouver",
    marker_position: {
      x: 11.5,
      y: 5
    },
    label_offset: {
      x: -3,
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
      x: -3,
      y: -2.5
    }
  },
  {
    name: "Winnipeg",
    marker_position: {
      x: 48.5,
      y: 12
    },
    label_offset: {
      x: -3,
      y: -2.5
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
      y: -4
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
      x: -3,
      y: 1
    }
  },
  {
    name: "Salt Lake City",
    marker_position: {
      x: 24.5,
      y: 39
    },
    label_offset: {
      x: -3,
      y: 1
    }
  },
  {
    name: "Helena",
    marker_position: {
      x: 35,
      y: 23
    },
    label_offset: {
      x: -3,
      y: 1
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
      x: -3,
      y: 1
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