import { Color, Route } from "./types";

const DEFAULT_NUM_TRAIN_CAR_CARDS = 12;

export const TRAIN_CAR_CARD_TYPES = [
  {
    color: Color.Pink,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    color: Color.White,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    color: Color.Blue,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    color: Color.Yellow,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    color: Color.Orange,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    color: Color.Black,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    color: Color.Red,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    color: Color.Green,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    color: Color.Wild,
    numCards: 14
  }
];

export const MAX_NUM_PLAYERS = 6;

export const MAX_ITER = 99999999;

export const NUM_STARTING_TRAIN_CAR_CARDS = 4;

export const NUM_PROPOSED_TICKET_CARDS = 3;

export const NUM_FACE_UP_TRAIN_CAR_CARDS = 5;

export const NUM_TRAIN_CARS = 45;

export const TURN_TIMER = 45;

export const TRAIN_ROUTES = [
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
  {
    start: "El Paso",
    destination: "Dallas",
    color: Color.Red,
    path: [
      { x: 34, y: 69, angle: 90 },
      { x: 38, y: 69, angle: 90 },
      { x: 42, y: 69, angle: 90 },
      { x: 46, y: 69, angle: 90 },
    ],
  },
  {
    start: "Dallas",
    destination: "Houston",
    color: Color.Wild,
    path: [
      { x: 51.3, y: 73.5, angle: -30 },
    ],
  },
  {
    start: "Dallas",
    destination: "Houston",
    color: Color.Wild,
    path: [
      { x: 50.2, y: 74.3, angle: -30 },
    ],
  },
  {
    start: "El Paso",
    destination: "Houston",
    color: Color.Green,
    path: [
      { x: 32, y: 71.5, angle: -50 },
      { x: 35, y: 75, angle: -60 },
      { x: 38.5, y: 77.5, angle: -75 },
      { x: 42, y: 79, angle: 100 },
      { x: 46, y: 79.5, angle: 90 },
      { x: 50, y: 79, angle: 80 },
    ],
  },
  {
    start: "Los Angeles",
    destination: "El Paso",
    color: Color.Black,
    path: [
      { x: 12, y: 62, angle: -40 },
      { x: 14.7, y: 66.2, angle: -50 },
      { x: 18, y: 69, angle: -75 },
      { x: 21.5, y: 70.5, angle: 100 },
      { x: 25, y: 71, angle: 90 },
      { x: 28.5, y: 70.5, angle: 80 },
    ],
  },
  {
    start: "Houston",
    destination: "New Orleans",
    color: Color.Wild,
    path: [
      { x: 55, y: 76.5, angle: 85 },
      { x: 58.5, y: 76, angle: 85 },
    ],
  },
  {
    start: "Oklahoma City",
    destination: "Dallas",
    color: Color.Wild,
    path: [
      { x: 47.5, y: 66.5, angle: -40 },
      { x: 47, y: 61.5, angle: 30 },
    ],
  },
  {
    start: "Oklahoma City",
    destination: "Dallas",
    color: Color.Wild,
    path: [
      { x: 49, y: 66, angle: -40 },
      { x: 48.5, y: 61.5, angle: 30 },
    ],
  },
  {
    start: "Oklahoma City",
    destination: "El Paso",
    color: Color.Yellow,
    path: [
      { x: 33.5, y: 66.3, angle: 70 },
      { x: 37, y: 65, angle: 80 },
      { x: 40.5, y: 63, angle: 65 },
      { x: 43.5, y: 60, angle: 60 },
      { x: 46.5, y: 58, angle: 80 },
    ],
  },
  {
    start: "Santa Fe",
    destination: "Oklahoma City",
    color: Color.Blue,
    path: [
      { x: 35.5, y: 58, angle: 90 },
      { x: 39.5, y: 57.5, angle: 80 },
      { x: 43.5, y: 56.5, angle: 90 },
    ],
  },
  {
    start: "Denver",
    destination: "Oklahoma City",
    color: Color.Red,
    path: [
      { x: 36.5, y: 49, angle: -30 },
      { x: 39.3, y: 52.5, angle: -70 },
      { x: 42.8, y: 54, angle: 90 },
      { x: 46.5, y: 55.2, angle: -60 },
    ],
  },
  {
    start: "Denver",
    destination: "Omaha",
    color: Color.Pink,
    path: [
      { x: 37, y: 43, angle: 60 },
      { x: 40.7, y: 40.5, angle: 80 },
      { x: 44.5, y: 40, angle: 90 },
      { x: 48.5, y: 40, angle: 90 },
    ],
  },
  {
    start: "Kansas City",
    destination: "Omaha",
    color: Color.Wild,
    path: [
      { x: 50.5, y: 44.5, angle: -10 },
    ],
  },
  {
    start: "Kansas City",
    destination: "Omaha",
    color: Color.Wild,
    path: [
      { x: 51.8, y: 44.3, angle: -10 },
    ],
  },
  {
    start: "Kansas City",
    destination: "Oklahoma City",
    color: Color.Wild,
    path: [
      { x: 51.5, y: 51.7, angle: 10 },
      { x: 50.4, y: 56.7, angle: 30 },
    ],
  },
  {
    start: "Kansas City",
    destination: "Oklahoma City",
    color: Color.Wild,
    path: [
      { x: 50.2, y: 51, angle: 10 },
      { x: 49, y: 56.2, angle: 30 },
    ],
  },
  {
    start: "Denver",
    destination: "Kansas City",
    color: Color.Black,
    path: [
      { x: 39.2, y: 44, angle: 70 },
      { x: 42.2, y: 43, angle: 90 },
      { x: 45.2, y: 43.5, angle: 100 },
      { x: 48.2, y: 45.5, angle: 120 },
    ],
  },
  {
    start: "Denver",
    destination: "Kansas City",
    color: Color.Orange,
    path: [
      { x: 38, y: 47.3, angle: -60 },
      { x: 41, y: 49.8, angle: -70 },
      { x: 44.5, y: 51, angle: 90 },
      { x: 48, y: 50, angle: 60 },
    ],
  },
  {
    start: "Helena",
    destination: "Omaha",
    color: Color.Red,
    path: [
      { x: 37, y: 24, angle: -58 },
      { x: 40, y: 27, angle: -58 },
      { x: 43, y: 30.2, angle: -58 },
      { x: 46, y: 33.5, angle: -58 },
      { x: 49, y: 37, angle: -58 },
    ],
  },
  {
    start: "Helena",
    destination: "Duluth",
    color: Color.Orange,
    path: [
      { x: 38.5, y: 22.3, angle: 100 },
      { x: 41.5, y: 23.3, angle: 100 },
      { x: 44.5, y: 24.3, angle: 100 },
      { x: 47.5, y: 25.3, angle: 100 },
      { x: 50.5, y: 26.3, angle: 100 },
      { x: 53.5, y: 27.3, angle: 100 },
    ],
  },
  {
    start: "Winnipeg",
    destination: "Duluth",
    color: Color.Black,
    path: [
      { x: 54.5, y: 25, angle: -70 },
      { x: 51.5, y: 23.4, angle: -80 },
      { x: 49, y: 19.8, angle: -30 },
      { x: 48.5, y: 14, angle: 0 },
    ],
  },
  {
    start: "Sault St. Marie",
    destination: "Duluth",
    color: Color.Wild,
    path: [
      { x: 58, y: 26, angle: 70 },
      { x: 62, y: 23.5, angle: 70 },
      { x: 66, y: 21, angle: 70 },
    ],
  },
  {
    start: "Sault St. Marie",
    destination: "Toronto",
    color: Color.Wild,
    path: [
      { x: 71, y: 21, angle: -60 },
      { x: 74.5, y: 24.5, angle: -60 },
    ],
  },
  {
    start: "Duluth",
    destination: "Toronto",
    color: Color.Pink,
    path: [
      { x: 58.5, y: 28.5, angle: 90 },
      { x: 61.7, y: 28.5, angle: 90 },
      { x: 64.9, y: 28.5, angle: 90 },
      { x: 68.1, y: 28.5, angle: 90 },
      { x: 71.3, y: 28.5, angle: 90 },
      { x: 74.5, y: 28.5, angle: 90 },
    ],
  },
  {
    start: "Duluth",
    destination: "Omaha",
    color: Color.Wild,
    path: [
      { x: 55.5, y: 31.5, angle: 30 },
      { x: 53.5, y: 37, angle: 33 },
    ],
  },
  {
    start: "Duluth",
    destination: "Omaha",
    color: Color.Wild,
    path: [
      { x: 53.5, y: 31.5, angle: 30 },
      { x: 51.8, y: 36.5, angle: 33 },
    ],
  },
  {
    start: "Chicago",
    destination: "Omaha",
    color: Color.Blue,
    path: [
      { x: 53, y: 40.5, angle: 90 },
      { x: 56.3, y: 40.5, angle: 90 },
      { x: 59.6, y: 40.5, angle: 90 },
      { x: 62.9, y: 40.5, angle: 90 },
    ],
  },
  {
    start: "Chicago",
    destination: "Duluth",
    color: Color.Red,
    path: [
      { x: 57.2, y: 30, angle: -55 },
      { x: 60.2, y: 33.5, angle: -55 },
      { x: 63.2, y: 37, angle: -55 },
    ],
  },
  {
    start: "Chicago",
    destination: "Saint Louis",
    color: Color.White,
    path: [
      { x: 65, y: 44.5, angle: 35 },
      { x: 63, y: 48.5, angle: 40 },
    ],
  },
  {
    start: "Chicago",
    destination: "Saint Louis",
    color: Color.Green,
    path: [
      { x: 63.5, y: 44, angle: 35 },
      { x: 61.5, y: 47.8, angle: 40 },
    ],
  },
  {
    start: "Kansas City",
    destination: "Saint Louis",
    color: Color.Blue,
    path: [
      { x: 54.5, y: 48.5, angle: 90 },
      { x: 58, y: 49, angle: 100 },
    ],
  },
  {
    start: "Kansas City",
    destination: "Saint Louis",
    color: Color.Pink,
    path: [
      { x: 54.5, y: 50.5, angle: 90 },
      { x: 58, y: 51, angle: 100 },
    ],
  },
  {
    start: "Nashville",
    destination: "Saint Louis",
    color: Color.Wild,
    path: [
      { x: 64, y: 53, angle: 110 },
      { x: 68, y: 55, angle: 105 },
    ],
  },
  {
    start: "Little Rock",
    destination: "Saint Louis",
    color: Color.Wild,
    path: [
      { x: 59.5, y: 55, angle: 40 },
      { x: 57.5, y: 59, angle: 40 },
    ],
  },
  {
    start: "Little Rock",
    destination: "Oklahoma City",
    color: Color.Wild,
    path: [
      { x: 51, y: 60.5, angle: 100 },
      { x: 54, y: 61.5, angle: 100 },
    ],
  },
  {
    start: "Little Rock",
    destination: "Dallas",
    color: Color.Wild,
    path: [
      { x: 51.5, y: 68.5, angle: 55 },
      { x: 54, y: 65.5, angle: 50 },
    ],
  },
  {
    start: "Little Rock",
    destination: "New Orleans",
    color: Color.Green,
    path: [
      { x: 57.5, y: 64.5, angle: -35 },
      { x: 59.2, y: 68.5, angle: -35 },
      { x: 60.8, y: 72.5, angle: -35 },
    ],
  },
  {
    start: "Little Rock",
    destination: "Nashville",
    color: Color.White,
    path: [
      { x: 59.5, y: 62, angle: 90 },
      { x: 64.2, y: 62, angle: 90 },
      { x: 68.5, y: 60, angle: 45 },
    ],
  },
  {
    start: "Atlanta",
    destination: "Nashville",
    color: Color.Wild,
    path: [
      { x: 72.5, y: 58.7, angle: -45 },
    ],
  },
  {
    start: "Saint Louis",
    destination: "Pittsburgh",
    color: Color.Green,
    path: [
      { x: 65, y: 49.5, angle: 70 },
      { x: 67.8, y: 47.5, angle: 66 },
      { x: 70.5, y: 45.3, angle: 62 },
      { x: 73.2, y: 42.8, angle: 62 },
      { x: 76, y: 40.5, angle: 62 },
    ],
  },
  {
    start: "Toronto",
    destination: "Pittsburgh",
    color: Color.Wild,
    path: [
      { x: 78, y: 35, angle: 0 },
      { x: 78, y: 30, angle: 0 },
    ],
  },
  {
    start: "Atlanta",
    destination: "Charleston",
    color: Color.Wild,
    path: [
      { x: 76.2, y: 61.3, angle: 90 },
      { x: 79, y: 61.3, angle: 90 },
    ],
  },
  {
    start: "Raleigh",
    destination: "Charleston",
    color: Color.Wild,
    path: [
      { x: 82.2, y: 59.3, angle: 45 },
      { x: 83.2, y: 55.4, angle: -45 },
    ],
  },
  {
    start: "Raleigh",
    destination: "Atlanta",
    color: Color.Wild,
    path: [
      { x: 77, y: 58, angle: 55 },
      { x: 79.5, y: 55.3, angle: 55 },
    ],
  },
  {
    start: "Raleigh",
    destination: "Atlanta",
    color: Color.Wild,
    path: [
      { x: 76.2, y: 56.6, angle: 55 },
      { x: 78.8, y: 53.5, angle: 55 },
    ],
  },
  {
    start: "Raleigh",
    destination: "Pittsburgh",
    color: Color.Wild,
    path: [
      { x: 78.8, y: 42.6, angle: -20 },
      { x: 80, y: 48, angle: -20 },
    ],
  },
  {
    start: "Chicago",
    destination: "Pittsburgh",
    color: Color.Orange,
    path: [
      { x: 67.5, y: 38, angle: 70 },
      { x: 71.5, y: 36.5, angle: 85 },
      { x: 75.5, y: 36.5, angle: 100 },
    ],
  },
  {
    start: "Chicago",
    destination: "Pittsburgh",
    color: Color.Black,
    path: [
      { x: 67.5, y: 42, angle: 105 },
      { x: 70.8, y: 41.5, angle: 70 },
      { x: 74, y: 39.5, angle: 70 },
    ],
  },
  {
    start: "Chicago",
    destination: "Toronto",
    color: Color.White,
    path: [
      { x: 65.7, y: 36, angle: 20 },
      { x: 68.5, y: 33.3, angle: 90 },
      { x: 72, y: 33.3, angle: 90 },
      { x: 75.5, y: 32, angle: 45 },
    ],
  },
  {
    start: "Montreal",
    destination: "Toronto",
    color: Color.Wild,
    path: [
      { x: 79, y: 25.2, angle: 58 },
      { x: 81.4, y: 22.6, angle: 58 },
      { x: 83.8, y: 20, angle: 58 },
    ],
  },
  {
    start: "Sault St. Marie",
    destination: "Montreal",
    color: Color.Black,
    path: [
      { x: 70.3, y: 18, angle: 89 },
      { x: 73.3, y: 18, angle: 89 },
      { x: 76.3, y: 18, angle: 89 },
      { x: 79.3, y: 18, angle: 89 },
      { x: 82.3, y: 18, angle: 89 },
    ],
  },
  {
    start: "Boston",
    destination: "Montreal",
    color: Color.Wild,
    path: [
      { x: 87, y: 20.5, angle: -45 },
      { x: 89.3, y: 24.5, angle: -45 },
    ],
  },
  {
    start: "Boston",
    destination: "Montreal",
    color: Color.Wild,
    path: [
      { x: 88, y: 19, angle: -45 },
      { x: 90.3, y: 23, angle: -45 },
    ],
  },
  {
    start: "New York",
    destination: "Montreal",
    color: Color.Blue,
    path: [
      { x: 84.6, y: 22.8, angle: 50 },
      { x: 84, y: 27.4, angle: -10 },
      { x: 86, y: 31, angle: -45 },
    ],
  },
  {
    start: "New York",
    destination: "Boston",
    color: Color.Red,
    path: [
      { x: 92.8, y: 29, angle: -45 },
      { x: 91.7, y: 32.5, angle: 45 },
    ],
  },
  {
    start: "New York",
    destination: "Boston",
    color: Color.Yellow,
    path: [
      { x: 90.8, y: 29, angle: -45 },
      { x: 89.7, y: 32.5, angle: 45 },
    ],
  },
  {
    start: "New York",
    destination: "Pittsburgh",
    color: Color.White,
    path: [
      { x: 81, y: 36, angle: 70 },
      { x: 84, y: 34, angle: 70 },
    ],
  },
  {
    start: "New York",
    destination: "Pittsburgh",
    color: Color.Green,
    path: [
      { x: 81.5, y: 38.2, angle: 70 },
      { x: 84.5, y: 36.2, angle: 70 },
    ],
  },
  {
    start: "Washington",
    destination: "Pittsburgh",
    color: Color.Wild,
    path: [
      { x: 81, y: 41, angle: -70 },
      { x: 84, y: 43, angle: -70 },
    ],
  },
  {
    start: "Washington",
    destination: "New York",
    color: Color.Orange,
    path: [
      { x: 87, y: 36.6, angle: 10 },
      { x: 86.5, y: 41.5, angle: 10 },
    ],
  },
  {
    start: "Washington",
    destination: "New York",
    color: Color.Black,
    path: [
      { x: 88.2, y: 36.8, angle: 10 },
      { x: 87.8, y: 41.7, angle: 10 },
    ],
  },
  {
    start: "Washington",
    destination: "Raleigh",
    color: Color.Wild,
    path: [
      { x: 84.8, y: 46.8, angle: 45 },
      { x: 82.6, y: 50.8, angle: 45 },
    ],
  },
  {
    start: "Washington",
    destination: "Raleigh",
    color: Color.Wild,
    path: [
      { x: 86.2, y: 48, angle: 45 },
      { x: 84, y: 52, angle: 45 },
    ],
  },
  {
    start: "Nashville",
    destination: "Pittsburgh",
    color: Color.Yellow,
    path: [
      { x: 76.5, y: 43.5, angle: 55 },
      { x: 74.3, y: 46.3, angle: 55 },
      { x: 72, y: 49, angle: 55 },
      { x: 70.8, y: 53, angle: 0 },
    ],
  },
  {
    start: "Nashville",
    destination: "Raleigh",
    color: Color.Black,
    path: [
      { x: 72.8, y: 53.8, angle: 35 },
      { x: 75, y: 49.5, angle: 55 },
      { x: 78, y: 49.5, angle: -60 },
    ],
  },
  {
    start: "New Orleans",
    destination: "Atlanta",
    color: Color.Yellow,
    path: [
      { x: 63.5, y: 73, angle: 55 },
      { x: 66.5, y: 69.8, angle: 55 },
      { x: 69.5, y: 66.6, angle: 55 },
      { x: 72.5, y: 63.4, angle: 55 },
    ],
  },
  {
    start: "New Orleans",
    destination: "Atlanta",
    color: Color.Orange,
    path: [
      { x: 64.3, y: 74.5, angle: 60 },
      { x: 67.3, y: 71.8, angle: 55 },
      { x: 70.3, y: 68.7, angle: 55 },
      { x: 73.3, y: 65.4, angle: 55 },
    ],
  },
  {
    start: "New Orleans",
    destination: "Miami",
    color: Color.Red,
    path: [
      { x: 63.5, y: 77.5, angle: 90 },
      { x: 67, y: 77.5, angle: 90 },
      { x: 70.5, y: 77.5, angle: 90 },
      { x: 74, y: 78.3, angle: -70 },
      { x: 77.5, y: 81.3, angle: -55 },
      { x: 80.5, y: 85.3, angle: -45 },
    ],
  },
  {
    start: "Atlanta",
    destination: "Miami",
    color: Color.Blue,
    path: [
      { x: 76, y: 65, angle: -30 },
      { x: 77.5, y: 69.5, angle: -30 },
      { x: 79, y: 74, angle: -30 },
      { x: 80.5, y: 78.5, angle: -30 },
      { x: 82, y: 83, angle: -30 },
    ],
  },
  {
    start: "Miami",
    destination: "Charleston",
    color: Color.Pink,
    path: [
      { x: 81, y: 65, angle: 5 },
      { x: 81, y: 71, angle: 0 },
      { x: 82, y: 77, angle: -25 },
      { x: 83.5, y: 83, angle: -20 },
    ],
  },
] as Route[];

export const TRAIN_TICKETS = [
  {
    start: "Boston",
    destination: "Miami",
    points: 12
  },
  {
    start: "Calgary",
    destination: "Phoenix",
    points: 13
  },
  {
    start: "Calgary",
    destination: "Salt Lake City",
    points: 7
  },
  {
    start: "Chicago",
    destination: "New Orleans",
    points: 7
  },
  {
    start: "Chicago",
    destination: "Santa Fe",
    points: 9
  },
  {
    start: "Dallas",
    destination: "New York",
    points: 11
  },
  {
    start: "Denver",
    destination: "El Paso",
    points: 4
  },
  {
    start: "Denver",
    destination: "Pittsburgh",
    points: 11
  },
  {
    start: "Duluth",
    destination: "Houston",
    points: 8
  },
  {
    start: "Helena",
    destination: "Los Angeles",
    points: 8
  },
  {
    start: "Kansas City",
    destination: "Houston",
    points: 5
  },
  {
    start: "Los Angeles",
    destination: "Chicago",
    points: 16
  },
  {
    start: "Los Angeles",
    destination: "Miami",
    points: 20
  },
  {
    start: "Los Angeles",
    destination: "New York",
    points: 21
  },
  {
    start: "Montreal",
    destination: "Atlanta",
    points: 9
  },
  {
    start: "Montreal",
    destination: "New Orleans",
    points: 13
  },
  {
    start: "New York",
    destination: "Atlanta",
    points: 6
  },
  {
    start: "Portland",
    destination: "Nashville",
    points: 17
  },
  {
    start: "Portland",
    destination: "Phoenix",
    points: 11
  },
  {
    start: "San Francisco",
    destination: "Atlanta",
    points: 17
  },
  {
    start: "Sault St. Marie",
    destination: "Nashville",
    points: 8
  },
  {
    start: "Sault St. Marie",
    destination: "Oklahoma City",
    points: 9
  },
  {
    start: "Seattle",
    destination: "Los Angeles",
    points: 9
  },
  {
    start: "Seattle",
    destination: "New York",
    points: 22
  },
  {
    start: "Toronto",
    destination: "Miami",
    points: 10
  },
  {
    start: "Vancouver",
    destination: "Montreal",
    points: 20
  },
  {
    start: "Vancouver",
    destination: "Santa Fe",
    points: 13
  },
  {
    start: "Winnipeg",
    destination: "Houston",
    points: 12
  },
  {
    start: "Winnipeg",
    destination: "Little Rock",
    points: 7
  },
];

export enum ACTION {
  NO_ACTION,
  DRAW_CARDS,
  DRAW_TICKETS,
  CLAIM_ROUTE
};

export const ROUTE_LENGTH_TO_POINTS = {
  1: 1,
  2: 2,
  3: 4,
  4: 7,
  5: 10,
  6: 15
};