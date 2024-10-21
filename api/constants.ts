export const MAX_ITER = 99999999;

export const NUM_TRAIN_CARS = 45;

export const TRAIN_ROUTES = [
  {
    start: "Seattle",
    destination: "Vancouver",
    color: "Wild",
    numTrainCars: 1
  },
  {
    start: "Seattle",
    destination: "Vancouver",
    color: "Wild",
    numTrainCars: 1
  },
  {
    start: "Vancouver",
    destination: "Calgary",
    color: "Wild",
    numTrainCars: 3
  },
  {
    start: "Calgary",
    destination: "Winnipeg",
    color: "White",
    numTrainCars: 6
  },
  {
    start: "Calgary",
    destination: "Seattle",
    color: "Wild",
    numTrainCars: 4
  },
  {
    start: "Calgary",
    destination: "Helena",
    color: "Wild",
    numTrainCars: 4
  },
  {
    start: "Seattle",
    destination: "Portland",
    color: "Wild",
    numTrainCars: 1
  },
  {
    start: "Seattle",
    destination: "Portland",
    color: "Wild",
    numTrainCars: 1
  },
  {
    start: "Seattle",
    destination: "Helena",
    color: "Yellow",
    numTrainCars: 6
  },
  {
    start: "Winnipeg",
    destination: "Helena",
    color: "Blue",
    numTrainCars: 4
  },
  {
    start: "Portland",
    destination: "Salt Lake City",
    color: "Blue",
    numTrainCars: 6
  },
  {
    start: "Portland",
    destination: "San Francisco",
    color: "Pink",
    numTrainCars: 5
  },
  {
    start: "Portland",
    destination: "San Francisco",
    color: "Green",
    numTrainCars: 5
  },
  {
    start: "San Francisco",
    destination: "Salt Lake City",
    color: "Orange",
    numTrainCars: 5
  },
  {
    start: "San Francisco",
    destination: "Salt Lake City",
    color: "White",
    numTrainCars: 5
  },
  {
    start: "San Francisco",
    destination: "Los Angeles",
    color: "Pink",
    numTrainCars: 3
  },
  {
    start: "San Francisco",
    destination: "Los Angeles",
    color: "Yellow",
    numTrainCars: 3
  },
  {
    start: "Los Angeles",
    destination: "Las Vegas",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Las Vegas",
    destination: "Salt Lake City",
    color: "Orange",
    numTrainCars: 3
  },
  {
    start: "Salt Lake City",
    destination: "Helena",
    color: "Pink",
    numTrainCars: 3
  },
  {
    start: "Los Angeles",
    destination: "Phoenix",
    color: "Wild",
    numTrainCars: 3
  },
  {
    start: "Los Angeles",
    destination: "El Paso",
    color: "Black",
    numTrainCars: 6
  },
  {
    start: "Phoenix",
    destination: "El Paso",
    color: "Wild",
    numTrainCars: 3
  },
  {
    start: "Phoenix",
    destination: "Denver",
    color: "White",
    numTrainCars: 5
  },
  {
    start: "Phoenix",
    destination: "Santa Fe",
    color: "Wild",
    numTrainCars: 3
  },
  {
    start: "El Paso",
    destination: "Santa Fe",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Denver",
    destination: "Santa Fe",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Salt Lake City",
    destination: "Denver",
    color: "Red",
    numTrainCars: 3
  },
  {
    start: "Salt Lake City",
    destination: "Denver",
    color: "Yellow",
    numTrainCars: 3
  },
  {
    start: "Helena",
    destination: "Denver",
    color: "Green",
    numTrainCars: 4
  },
  {
    start: "Duluth",
    destination: "Helena",
    color: "Orange",
    numTrainCars: 6
  },
  {
    start: "Winnipeg",
    destination: "Sault St. Marie",
    color: "Wild",
    numTrainCars: 6
  },
  {
    start: "Duluth",
    destination: "Sault St. Marie",
    color: "Wild",
    numTrainCars: 3
  },
  {
    start: "Duluth",
    destination: "Omaha",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Duluth",
    destination: "Omaha",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Denver",
    destination: "Omaha",
    color: "Pink",
    numTrainCars: 4
  },
  {
    start: "Helena",
    destination: "Omaha",
    color: "Red",
    numTrainCars: 5
  },
  {
    start: "Omaha",
    destination: "Kansas City",
    color: "Wild",
    numTrainCars: 1
  },
  {
    start: "Omaha",
    destination: "Kansas City",
    color: "Wild",
    numTrainCars: 1
  },
  {
    start: "Denver",
    destination: "Kansas City",
    color: "Black",
    numTrainCars: 4
  },
  {
    start: "Denver",
    destination: "Kansas City",
    color: "Orange",
    numTrainCars: 4
  },
  {
    start: "Oklahoma City",
    destination: "Denver",
    color: "Red",
    numTrainCars: 4
  },
  {
    start: "Santa Fe",
    destination: "Oklahoma City",
    color: "Blue",
    numTrainCars: 3
  },
  {
    start: "El Paso",
    destination: "Oklahoma City",
    color: "Yellow",
    numTrainCars: 5
  },
  {
    start: "El Paso",
    destination: "Dallas",
    color: "Red",
    numTrainCars: 4
  },
  {
    start: "El Paso",
    destination: "Houston",
    color: "Green",
    numTrainCars: 6
  },
  {
    start: "Dallas",
    destination: "Houston",
    color: "Wild",
    numTrainCars: 1
  },
  {
    start: "Dallas",
    destination: "Houston",
    color: "Wild",
    numTrainCars: 1
  },
  {
    start: "New Orleans",
    destination: "Houston",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Dallas",
    destination: "Little Rock",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "New Orleans",
    destination: "Little Rock",
    color: "Green",
    numTrainCars: 3
  },
  {
    start: "New Orleans",
    destination: "Miami",
    color: "Red",
    numTrainCars: 6
  },
  {
    start: "New Orleans",
    destination: "Atlanta",
    color: "Yellow",
    numTrainCars: 4
  },
  {
    start: "New Orleans",
    destination: "Atlanta",
    color: "Orange",
    numTrainCars: 4
  },
  {
    start: "Miami",
    destination: "Atlanta",
    color: "Blue",
    numTrainCars: 5
  },
  {
    start: "Miami",
    destination: "Charleston",
    color: "Pink",
    numTrainCars: 4
  },
  {
    start: "Charleston",
    destination: "Atlanta",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Charleston",
    destination: "Raleigh",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Atlanta",
    destination: "Raleigh",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Atlanta",
    destination: "Raleigh",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Nashville",
    destination: "Atlanta",
    color: "Wild",
    numTrainCars: 1
  },
  {
    start: "Little Rock",
    destination: "Nashville",
    color: "White",
    numTrainCars: 3
  },
  {
    start: "Little Rock",
    destination: "Oklahoma City",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Nashville",
    destination: "Raleigh",
    color: "Black",
    numTrainCars: 3
  },
  {
    start: "Raleigh",
    destination: "Washington",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Raleigh",
    destination: "Washington",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Pittsburgh",
    destination: "Washington",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Pittsburgh",
    destination: "Saint Louis",
    color: "Green",
    numTrainCars: 5
  },
  {
    start: "Little Rock",
    destination: "Saint Louis",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Pittsburgh",
    destination: "New York",
    color: "Green",
    numTrainCars: 2
  },
  {
    start: "Pittsburgh",
    destination: "New York",
    color: "White",
    numTrainCars: 2
  },
  {
    start: "Raleigh",
    destination: "Pittsburgh",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "New York",
    destination: "Washington",
    color: "Orange",
    numTrainCars: 2
  },
  {
    start: "New York",
    destination: "Montreal",
    color: "Blue",
    numTrainCars: 3
  },
  {
    start: "New York",
    destination: "Washington",
    color: "Blue",
    numTrainCars: 2
  },
  {
    start: "Nashville",
    destination: "Pittsburgh",
    color: "Yellow",
    numTrainCars: 4
  },
  {
    start: "Oklahoma City",
    destination: "Kansas City",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Oklahoma City",
    destination: "Kansas City",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Oklahoma City",
    destination: "Dallas",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Oklahoma City",
    destination: "Dallas",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Kansas City",
    destination: "Saint Louis",
    color: "Blue",
    numTrainCars: 2
  },
  {
    start: "Kansas City",
    destination: "Saint Louis",
    color: "Pink",
    numTrainCars: 2
  },
  {
    start: "Chicago",
    destination: "Saint Louis",
    color: "Green",
    numTrainCars: 2
  },
  {
    start: "Chicago",
    destination: "Saint Louis",
    color: "White",
    numTrainCars: 2
  },
  {
    start: "Nashville",
    destination: "Saint Louis",
    color: "White",
    numTrainCars: 2
  },
  {
    start: "Chicago",
    destination: "Pittsburgh",
    color: "Black",
    numTrainCars: 3
  },
  {
    start: "Chicago",
    destination: "Pittsburgh",
    color: "Orange",
    numTrainCars: 3
  },
  {
    start: "Omaha",
    destination: "Chicago",
    color: "Blue",
    numTrainCars: 4
  },
  {
    start: "Chicago",
    destination: "Duluth",
    color: "Red",
    numTrainCars: 3
  },
  {
    start: "Duluth",
    destination: "Winnipeg",
    color: "Black",
    numTrainCars: 4
  },
  {
    start: "Chicago",
    destination: "Toronto",
    color: "White",
    numTrainCars: 4
  },
  {
    start: "Toronto",
    destination: "Duluth",
    color: "Pink",
    numTrainCars: 6
  },
  {
    start: "Toronto",
    destination: "Pittsburgh",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Toronto",
    destination: "Montreal",
    color: "Wild",
    numTrainCars: 3
  },
  {
    start: "Toronto",
    destination: "Sault St. Marie",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Sault St. Marie",
    destination: "Montreal",
    color: "Black",
    numTrainCars: 5
  },
  {
    start: "Montreal",
    destination: "Boston",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Montreal",
    destination: "Boston",
    color: "Wild",
    numTrainCars: 2
  },
  {
    start: "Boston",
    destination: "New York",
    color: "Yellow",
    numTrainCars: 2
  },
  {
    start: "Boston",
    destination: "New York",
    color: "Red",
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