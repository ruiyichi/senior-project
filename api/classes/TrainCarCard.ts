class TrainCarCard {
  id: number;
  color: string;

  private static count = 0;

  constructor(color: string) {
    this.id = TrainCarCard.count;
    TrainCarCard.count += 1;

    this.color = color;
  }
}