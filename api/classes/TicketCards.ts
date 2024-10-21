class TicketCard {
  id: number;
  start: string;
  destination: string;
  points: number;

  private static count = 0;

  constructor(start: string, destination: string, points: number) {
    this.id = TicketCard.count;
    TicketCard.count += 1;

    this.start = start;
    this.destination = destination;
    this.points = points;
  }
}