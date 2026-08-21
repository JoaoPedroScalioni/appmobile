import { Observation } from '../domain/entities/observation';
import { ObservationRepository } from '../domain/repositories/observationrepository';

export class ListObservations {
  constructor(private readonly observationRepository: ObservationRepository) {}

  public async execute(): Promise<Observation[]> {
    return await this.observationRepository.findAll();
  }
}
