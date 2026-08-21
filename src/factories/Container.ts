import { InMemoryObservationRepository } from '../infra/InMemoryObservationRepository';
import { RegisterObservation } from '../usecases/RegisterObservation';
import { ListObservations } from '../usecases/ListObservations';

export class Container {
  private static instance: Container;

  public readonly observationRepository: InMemoryObservationRepository;
  public readonly registerObservation: RegisterObservation;
  public readonly listObservations: ListObservations;

  private constructor() {
    this.observationRepository = InMemoryObservationRepository.getInstance();
    
    this.registerObservation = new RegisterObservation(this.observationRepository);
    this.listObservations = new ListObservations(this.observationRepository);
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }
}
