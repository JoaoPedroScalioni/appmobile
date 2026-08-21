import { Coordinates } from '../value-objects/coordinates';

export class Observation {
  public readonly id: string;
  public coordinates: Coordinates;
  public photo: string;

  constructor(id: string, coordinates: Coordinates, photo: string) {
    this.id = id;
    this.coordinates = coordinates;
    this.photo = photo;
    this.validate();
  }

  private validate(): void {
    if (!this.id) {
      throw new Error('Id is required');
    }
    if (!this.coordinates) {
      throw new Error('Coordinates are required');
    }
    // Adicione outras validações se necessário
  }

  public updatePhoto(photo: string): void {
    this.photo = photo;
    this.validate();
  }
}
