import { Observation } from './observation';
import { Coordinates } from '../value-objects/coordinates';

describe('Observation Entity', () => {
  it('deve criar uma observação válida', () => {
    const coords = new Coordinates(10, 20);
    const observation = new Observation('123', coords, 'minha_foto.jpg');

    expect(observation.id).toBe('123');
    expect(observation.coordinates).toBe(coords);
    expect(observation.photo).toBe('minha_foto.jpg');
  });

  it('deve retornar erro se o id estiver vazio', () => {
    const coords = new Coordinates(10, 20);
    expect(() => new Observation('', coords, 'minha_foto.jpg')).toThrow('Id is required');
  });

  it('deve retornar erro se a coordenada não for fornecida', () => {
    expect(() => new Observation('123', null as any, 'minha_foto.jpg')).toThrow('Coordinates are required');
  });

  it('deve atualizar a foto da observação com sucesso', () => {
    const coords = new Coordinates(10, 20);
    const observation = new Observation('123', coords, 'minha_foto.jpg');
    
    observation.updatePhoto('nova_foto.png');
    expect(observation.photo).toBe('nova_foto.png');
  });
});
