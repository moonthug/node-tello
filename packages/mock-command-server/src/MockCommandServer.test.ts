import { expect } from 'chai';
import sinon from 'sinon';

import { MockCommandServer } from './MockCommandServer';

describe('MockCommandServer', () => {
  afterEach(() => {
    sinon.restore();
  });

  /////////////////////////////////////
  //
  // constructor

  describe('constructor', () => {
    it('should set the options passed to it', () => {
      const mockCommandServer = new MockCommandServer({
        port: 1234,
      });
      expect(mockCommandServer.port).to.eql(1234);
    });
  });
});
