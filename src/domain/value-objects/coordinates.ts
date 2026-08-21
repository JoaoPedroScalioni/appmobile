export class Coordinates {
  constructor(
    public readonly latitude: number,
    public readonly longitude: number
  ) {
    if (latitude < -90 || latitude > 90) {
      throw new Error('Invalid latitude');
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error('Invalid longitude');
    }
  }

  public equals(other: Coordinates): boolean {
    return this.latitude === other.latitude && this.longitude === other.longitude;
  }
}
