import { Observation } from '../entities/observation';

export interface ObservationRepository {
  save(observation: Observation): Promise<void>;
  findById(id: string): Promise<Observation | null>;
  findAll(): Promise<Observation[]>;
}
