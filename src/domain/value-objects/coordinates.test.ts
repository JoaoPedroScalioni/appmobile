import { Coordinates } from './coordinates';

describe('Coordinates', () => {
  it('should create valid coordinates', () => {
    const coordinates = new Coordinates(10, 20);
    
    expect(coordinates).toBeDefined();
    expect(coordinates.latitude).toBe(10);
    expect(coordinates.longitude).toBe(20);
  });

  it('should throw an error with invalid latitude', () => {
    expect(() => new Coordinates(100, 20)).toThrow();
  });

  it('should throw an error with invalid longitude', () => {
    expect(() => new Coordinates(10, 200)).toThrow();
  });
});
