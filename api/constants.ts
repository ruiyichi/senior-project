import { Color, Route } from "./types";

const DEFAULT_NUM_TRAIN_CAR_CARDS = 12;

export const TRAIN_CAR_CARD_TYPES = [
  {
    type: "Box",
    color: Color.Pink,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    type: "Passenger",
    color: Color.White,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    type: "Tanker",
    color: Color.Blue,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    type: "Reefer",
    color: Color.Yellow,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    type: "Freight",
    color: Color.Orange,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    type: "Hopper",
    color: Color.Black,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    type: "Coal",
    color: Color.Red,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    type: "Caboose",
    color: Color.Green,
    numCards: DEFAULT_NUM_TRAIN_CAR_CARDS
  },
  {
    type: "Locomotive",
    color: Color.Wild,
    numCards: 14
  }
];

export const MAX_ITER = 99999999;

export const NUM_STARTING_TRAIN_CAR_CARDS = 4;

export const NUM_PROPOSED_TICKET_CARDS = 3;

export const NUM_TRAIN_CARS = 45;

export const TRAIN_ROUTES = [
  {
    start: "Seattle",
    destination: "Vancouver",
    color: Color.Wild,
    numTrainCars: 1
  },
  {
    start: "Seattle",
    destination: "Vancouver",
    color: Color.Wild,
    numTrainCars: 1
  },
  {
    start: "Vancouver",
    destination: "Calgary",
    color: Color.Wild,
    numTrainCars: 3
  },
  {
    start: "Calgary",
    destination: "Winnipeg",
    color: Color.White,
    numTrainCars: 6
  },
  {
    start: "Calgary",
    destination: "Seattle",
    color: Color.Wild,
    numTrainCars: 4
  },
  {
    start: "Calgary",
    destination: "Helena",
    color: Color.Wild,
    numTrainCars: 4
  },
  {
    start: "Seattle",
    destination: "Portland",
    color: Color.Wild,
    numTrainCars: 1
  },
  {
    start: "Seattle",
    destination: "Portland",
    color: Color.Wild,
    numTrainCars: 1
  },
  {
    start: "Seattle",
    destination: "Helena",
    color: Color.Yellow,
    numTrainCars: 6
  },
  {
    start: "Winnipeg",
    destination: "Helena",
    color: Color.Blue,
    numTrainCars: 4
  },
  {
    start: "Portland",
    destination: "Salt Lake City",
    color: Color.Blue,
    numTrainCars: 6
  },
  {
    start: "Portland",
    destination: "San Francisco",
    color: Color.Pink,
    numTrainCars: 5
  },
  {
    start: "Portland",
    destination: "San Francisco",
    color: Color.Green,
    numTrainCars: 5
  },
  {
    start: "San Francisco",
    destination: "Salt Lake City",
    color: Color.Orange,
    numTrainCars: 5
  },
  {
    start: "San Francisco",
    destination: "Salt Lake City",
    color: Color.White,
    numTrainCars: 5
  },
  {
    start: "San Francisco",
    destination: "Los Angeles",
    color: Color.Pink,
    numTrainCars: 3
  },
  {
    start: "San Francisco",
    destination: "Los Angeles",
    color: Color.Yellow,
    numTrainCars: 3
  },
  {
    start: "Los Angeles",
    destination: "Las Vegas",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Las Vegas",
    destination: "Salt Lake City",
    color: Color.Orange,
    numTrainCars: 3
  },
  {
    start: "Salt Lake City",
    destination: "Helena",
    color: Color.Pink,
    numTrainCars: 3
  },
  {
    start: "Los Angeles",
    destination: "Phoenix",
    color: Color.Wild,
    numTrainCars: 3
  },
  {
    start: "Los Angeles",
    destination: "El Paso",
    color: Color.Black,
    numTrainCars: 6
  },
  {
    start: "Phoenix",
    destination: "El Paso",
    color: Color.Wild,
    numTrainCars: 3
  },
  {
    start: "Phoenix",
    destination: "Denver",
    color: Color.White,
    numTrainCars: 5
  },
  {
    start: "Phoenix",
    destination: "Santa Fe",
    color: Color.Wild,
    numTrainCars: 3
  },
  {
    start: "El Paso",
    destination: "Santa Fe",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Denver",
    destination: "Santa Fe",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Salt Lake City",
    destination: "Denver",
    color: Color.Red,
    numTrainCars: 3
  },
  {
    start: "Salt Lake City",
    destination: "Denver",
    color: Color.Yellow,
    numTrainCars: 3
  },
  {
    start: "Helena",
    destination: "Denver",
    color: Color.Green,
    numTrainCars: 4
  },
  {
    start: "Duluth",
    destination: "Helena",
    color: Color.Orange,
    numTrainCars: 6
  },
  {
    start: "Winnipeg",
    destination: "Sault St. Marie",
    color: Color.Wild,
    numTrainCars: 6
  },
  {
    start: "Duluth",
    destination: "Sault St. Marie",
    color: Color.Wild,
    numTrainCars: 3
  },
  {
    start: "Duluth",
    destination: "Omaha",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Duluth",
    destination: "Omaha",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Denver",
    destination: "Omaha",
    color: Color.Pink,
    numTrainCars: 4
  },
  {
    start: "Helena",
    destination: "Omaha",
    color: Color.Red,
    numTrainCars: 5
  },
  {
    start: "Omaha",
    destination: "Kansas City",
    color: Color.Wild,
    numTrainCars: 1
  },
  {
    start: "Omaha",
    destination: "Kansas City",
    color: Color.Wild,
    numTrainCars: 1
  },
  {
    start: "Denver",
    destination: "Kansas City",
    color: Color.Black,
    numTrainCars: 4
  },
  {
    start: "Denver",
    destination: "Kansas City",
    color: Color.Orange,
    numTrainCars: 4
  },
  {
    start: "Oklahoma City",
    destination: "Denver",
    color: Color.Red,
    numTrainCars: 4
  },
  {
    start: "Santa Fe",
    destination: "Oklahoma City",
    color: Color.Blue,
    numTrainCars: 3
  },
  {
    start: "El Paso",
    destination: "Oklahoma City",
    color: Color.Yellow,
    numTrainCars: 5
  },
  {
    start: "El Paso",
    destination: "Dallas",
    color: Color.Red,
    numTrainCars: 4
  },
  {
    start: "El Paso",
    destination: "Houston",
    color: Color.Green,
    numTrainCars: 6
  },
  {
    start: "Dallas",
    destination: "Houston",
    color: Color.Wild,
    numTrainCars: 1
  },
  {
    start: "Dallas",
    destination: "Houston",
    color: Color.Wild,
    numTrainCars: 1
  },
  {
    start: "New Orleans",
    destination: "Houston",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Dallas",
    destination: "Little Rock",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "New Orleans",
    destination: "Little Rock",
    color: Color.Green,
    numTrainCars: 3
  },
  {
    start: "New Orleans",
    destination: "Miami",
    color: Color.Red,
    numTrainCars: 6
  },
  {
    start: "New Orleans",
    destination: "Atlanta",
    color: Color.Yellow,
    numTrainCars: 4
  },
  {
    start: "New Orleans",
    destination: "Atlanta",
    color: Color.Orange,
    numTrainCars: 4
  },
  {
    start: "Miami",
    destination: "Atlanta",
    color: Color.Blue,
    numTrainCars: 5
  },
  {
    start: "Miami",
    destination: "Charleston",
    color: Color.Pink,
    numTrainCars: 4
  },
  {
    start: "Charleston",
    destination: "Atlanta",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Charleston",
    destination: "Raleigh",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Atlanta",
    destination: "Raleigh",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Atlanta",
    destination: "Raleigh",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Nashville",
    destination: "Atlanta",
    color: Color.Wild,
    numTrainCars: 1
  },
  {
    start: "Little Rock",
    destination: "Nashville",
    color: Color.White,
    numTrainCars: 3
  },
  {
    start: "Little Rock",
    destination: "Oklahoma City",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Nashville",
    destination: "Raleigh",
    color: Color.Black,
    numTrainCars: 3
  },
  {
    start: "Raleigh",
    destination: "Washington",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Raleigh",
    destination: "Washington",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Pittsburgh",
    destination: "Washington",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Pittsburgh",
    destination: "Saint Louis",
    color: Color.Green,
    numTrainCars: 5
  },
  {
    start: "Little Rock",
    destination: "Saint Louis",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Pittsburgh",
    destination: "New York",
    color: Color.Green,
    numTrainCars: 2
  },
  {
    start: "Pittsburgh",
    destination: "New York",
    color: Color.White,
    numTrainCars: 2
  },
  {
    start: "Raleigh",
    destination: "Pittsburgh",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "New York",
    destination: "Washington",
    color: Color.Orange,
    numTrainCars: 2
  },
  {
    start: "New York",
    destination: "Montreal",
    color: Color.Blue,
    numTrainCars: 3
  },
  {
    start: "New York",
    destination: "Washington",
    color: Color.Blue,
    numTrainCars: 2
  },
  {
    start: "Nashville",
    destination: "Pittsburgh",
    color: Color.Yellow,
    numTrainCars: 4
  },
  {
    start: "Oklahoma City",
    destination: "Kansas City",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Oklahoma City",
    destination: "Kansas City",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Oklahoma City",
    destination: "Dallas",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Oklahoma City",
    destination: "Dallas",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Kansas City",
    destination: "Saint Louis",
    color: Color.Blue,
    numTrainCars: 2
  },
  {
    start: "Kansas City",
    destination: "Saint Louis",
    color: Color.Pink,
    numTrainCars: 2
  },
  {
    start: "Chicago",
    destination: "Saint Louis",
    color: Color.Green,
    numTrainCars: 2
  },
  {
    start: "Chicago",
    destination: "Saint Louis",
    color: Color.White,
    numTrainCars: 2
  },
  {
    start: "Nashville",
    destination: "Saint Louis",
    color: Color.White,
    numTrainCars: 2
  },
  {
    start: "Chicago",
    destination: "Pittsburgh",
    color: Color.Black,
    numTrainCars: 3
  },
  {
    start: "Chicago",
    destination: "Pittsburgh",
    color: Color.Orange,
    numTrainCars: 3
  },
  {
    start: "Omaha",
    destination: "Chicago",
    color: Color.Blue,
    numTrainCars: 4
  },
  {
    start: "Chicago",
    destination: "Duluth",
    color: Color.Red,
    numTrainCars: 3
  },
  {
    start: "Duluth",
    destination: "Winnipeg",
    color: Color.Black,
    numTrainCars: 4
  },
  {
    start: "Chicago",
    destination: "Toronto",
    color: Color.White,
    numTrainCars: 4
  },
  {
    start: "Toronto",
    destination: "Duluth",
    color: Color.Pink,
    numTrainCars: 6
  },
  {
    start: "Toronto",
    destination: "Pittsburgh",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Toronto",
    destination: "Montreal",
    color: Color.Wild,
    numTrainCars: 3
  },
  {
    start: "Toronto",
    destination: "Sault St. Marie",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Sault St. Marie",
    destination: "Montreal",
    color: Color.Black,
    numTrainCars: 5
  },
  {
    start: "Montreal",
    destination: "Boston",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Montreal",
    destination: "Boston",
    color: Color.Wild,
    numTrainCars: 2
  },
  {
    start: "Boston",
    destination: "New York",
    color: Color.Yellow,
    numTrainCars: 2
  },
  {
    start: "Boston",
    destination: "New York",
    color: Color.Red,
    numTrainCars: 2
  }
];

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