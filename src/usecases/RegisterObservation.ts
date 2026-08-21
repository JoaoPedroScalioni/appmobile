import { randomUUID } from 'expo-crypto';
import { Observation } from '../domain/entities/observation';
import { Coordinates } from '../domain/value-objects/coordinates';
import { ObservationRepository } from '../domain/repositories/observationrepository';

export interface RegisterObservationDTO {
  latitude: number;
  longitude: number;
  photo: string;
}

export class RegisterObservation {
  constructor(private readonly repository: ObservationRepository) {}

  public async execute(data: RegisterObservationDTO): Promise<Observation> {
    const id = randomUUID();
    const coordinates = new Coordinates(data.latitude, data.longitude);
    const observation = new Observation(id, coordinates, data.photo);

    await this.repository.save(observation);

    return observation;
  }
}
