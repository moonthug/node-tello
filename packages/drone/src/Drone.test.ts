import { Drone } from './Drone';

import { expect } from 'chai';
import sinon from 'sinon';

describe('Drone', () => {
  afterEach(() => {
    sinon.restore();
  });

  /////////////////////////////////////
  //
  // constructor

  describe('constructor', () => {
    it('should set the options passed to it', () => {
      const drone = new Drone({
        address: '127.0.0.1',
        commandPort: 1234,
        statePort: 1235
      });
    });
  });
});
