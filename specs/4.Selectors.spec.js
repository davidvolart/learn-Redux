import { createSelector } from 'reselect';

describe('Selectors', () => {

  it('selectors are functions that gets the state and computes a value', () => {
    const state = { name: 'Hoboken' };
    const getName = (state) => state.name;
    expect('Hoboken').toBe(getName(state));
  });

  describe('createSelector', () => {

    it('uses existing selectors to new values', () => {
      const state = { name: 'Hoboken' };
      const getName = (state) => state.name;

      const getNameLength = createSelector(
        [ getName ],
        (    name ) => {
          return name.length;
      });

      expect(7).toBe(getNameLength(state));
    });

    it('returns the same instance if input is the same instance', () => {
      const state = { name: 'Hoboken' };
      const getName = (state) => state.name;

      const getNameLengthObj = createSelector(
        [ getName ],
        (    name ) => {
          return { length: name.length };
      });

      const lengthObj1 = getNameLengthObj(state);
      const lengthObj2 = getNameLengthObj(state);

      expect(lengthObj1).toBe(lengthObj2);
    });
  });
});
