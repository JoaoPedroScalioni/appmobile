import { Observation } from '../domain/entities/observation';
import { ObservationRepository } from '../domain/repositories/observationrepository';

export class InMemoryObservationRepository implements ObservationRepository {
  private observations: Observation[] = [];
  private static instance: InMemoryObservationRepository;

  private constructor() {}

  public static getInstance(): InMemoryObservationRepository {
    if (!InMemoryObservationRepository.instance) {
      InMemoryObservationRepository.instance = new InMemoryObservationRepository();
    }
    return InMemoryObservationRepository.instance;
  }

  async save(observation: Observation): Promise<void> {
    this.observations.push(observation);
  }

  async findById(id: string): Promise<Observation | null> {
    return this.observations.find(o => o.id === id) || null;
  }

  async findAll(): Promise<Observation[]> {
    return this.observations;
  }
}
