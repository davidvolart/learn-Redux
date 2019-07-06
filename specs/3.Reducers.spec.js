import { combineReducers } from 'redux';

describe("Reducers", () => {

  describe('foundation', () => {

    it('reducers are functions', () => {
      const reducer = (state, action) => state;

      expect(reducer).toBeInstanceOf(Function);
    });

    it('reducers returns state if they have nothing to do', () => {
      const reducer = (state, action) => state;

      expect('some state').toBe(reducer('some state'));
    });

    it('reducers initializes state when undefined', () => {
      const reducer = (state = 'initial', action) => state;

      expect('initial').toBe(reducer());
    });

    it('reducers applies received action', () => {
      const reducer = (state = 'initial', action) => {
        if (action.type === 'CHANGE_STATE') {
          return action.newState;
        }
        return state;
      };
      const action = {
        type: 'CHANGE_STATE', 
        newState: 'final',
      };

      expect('initial').toBe(reducer(undefined, {}));
      expect('initial').toBe(reducer('initial', {}));
      expect('final').toBe(reducer('initial', action));
    });

    it('reducers computes new state from previous', () => {
      const reducer = (state = 0, action) => {
        if (action.type === 'INCREMENT') {
          return state + 1;
        }
        return state;
      };
      const action = {
        type: 'INCREMENT', 
      };

      expect(0).toBe(reducer(undefined, {}));
      expect(0).toBe(reducer(0, {}));
      expect(1).toBe(reducer(0, action));
    });

    it('creates new objects for each possible value', () => {
      const reducer = (state = [], action) => {
        if (action.type === 'APPEND') {
          return [...state, action.value];
        }
        return state;
      };
      const action = {
        type: 'APPEND', 
        value: 1
      };

      expect([]).toEqual(reducer(undefined, {}));
      expect([]).toEqual(reducer([], {}));
      expect([1]).toEqual(reducer([], action));
    });

    it('never changes the same object', () => {
      const reducer = (state = [], action) => {
        if (action.type === 'APPEND') {
          return [...state, action.value];
        }
        return state;
      };
      const action = {
        type: 'APPEND', 
        value: 1
      };

      const prevState = [];
      const nextState = reducer(prevState, action);

      expect([]).toEqual(prevState);
      expect([1]).toEqual(nextState);
    });

    it('returns the same instance state if no action is executed', () => {
      const reducer = (state = [], action) => {
        if (action.type === 'APPEND') {
          return [...state, action.value];
        }
        
        return state;
      };

      const prevState = [];
      const nextState = reducer(prevState, {});

      expect(prevState).toBe(nextState);
    });

  });

  describe('combineReducers', () => {

    const name = (state = 'noname', action) => {
      if (action.type === 'SET_NAME') {
        return state = action.name;
      }
      return state;
    };

    const list = (state = [], action) => {
      if (action.type === 'APPEND') {
        return [...state, action.value];
      }
      return state;
    };

    const reducer = combineReducers({
      name,
      list,
    });

    it('combines both initial values into a single object with each reducers name as property key', () => {
      const state = reducer(undefined,{});
      
      expect({ name: 'noname', list: [] }).toMatchObject(state);
    });

    it('computes actions of all of its reducers [SET_NAME]', () => {
      const state = reducer(undefined, { type: 'SET_NAME', name: 'jack' });
    
      expect({ name: 'jack', list: [] }).toMatchObject(state);
    });

    it('computes actions of all of its reducers [APPEND]', () => {
      const state = reducer(undefined, { type: 'APPEND', value: 'barker' });
      expect({ name: 'noname', list: ['barker'] }).toMatchObject(state);
    });

  });


});
