import { expect } from 'chai';
import sinon from 'sinon';

import { Cadet } from './Cadet';

describe('Cadet', () => {
  afterEach(() => {
    sinon.restore();
  });

  /////////////////////////////////////
  //
  // constructor

  describe('constructor', () => {
    it('should set the options passed to it', () => {
      const cadet = new Cadet({
        localAddress: '0.0.0.0',
        localPort: 1234,
      });
      expect(cadet.localAddress).to.equal('0.0.0.0');
      expect(cadet.localPort).to.equal(1234);
    });
  });

  /////////////////////////////////////
  //
  // initialise

  describe('initialise', () => {
    let cadet: Cadet;

    beforeEach(() => {
      cadet = new Cadet({
        localAddress: '0.0.0.0',
        localPort: 1234
      });
    });

    it('should call _bindSocket', () => {
      // @ts-ignore
      const spy = sinon.stub(cadet, '_bindSocket');
      cadet.initialise();
      expect(spy.callCount).to.eql(1);
    });

    it('should set initialised to true once complete', () => {
      sinon
      // @ts-ignore
        .stub(cadet, '_bindSocket');

      cadet.initialise();
      expect(cadet.initialised).to.eql(true);
    });

    it('should set initialised to false if binding the port fails', () => {
      sinon
        // @ts-ignore
        .stub(cadet, '_bindSocket')
        .throws(new Error());

      try {
        cadet.initialise();
      } catch (e) {
        expect(cadet.initialised).to.equal(false);
      }
    });
  });
});
