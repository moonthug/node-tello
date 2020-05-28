import { expect } from 'chai';
import sinon from 'sinon';

import { Commander } from './Commander';
import { ControlCommandEnum } from './enums/ControlCommand';
import { SetCommandEnum } from './enums/SetCommand';
import { ReadCommandEnum } from './enums/ReadCommand';

describe('Commander', () => {
  afterEach(() => {
    sinon.restore();
  });

  /////////////////////////////////////
  //
  // constructor

  describe('constructor', () => {
    it('should set the options passed to it', () => {
      const commander = new Commander({
        remoteAddress: '127.0.0.1',
        remotePort: 1234,
      });
      expect(commander.remoteAddress).to.eql('127.0.0.1');
      expect(commander.remotePort).to.eql(1234);
    });
  });

  /////////////////////////////////////
  //
  // initialise

  describe('initialise', () => {
    let commander: Commander;

    beforeEach(() => {
      commander = new Commander({
        remoteAddress: '127.0.0.1',
        remotePort: 1234,
      });
    });

    it('should call _bindSocket', () => {
      // @ts-ignore
      const spy = sinon.stub(commander, '_bindSocket');
      commander.initialise();
      expect(spy.callCount).to.eql(1);
    });

    it('should set initialised to true once complete', () => {
      sinon
      // @ts-ignore
        .stub(commander, '_bindSocket');

      commander.initialise();
      expect(commander.initialised).to.eql(true);
    });

    it('should set initialised to false if binding the port fails', () => {
      sinon
        // @ts-ignore
        .stub(commander, '_bindSocket')
        .throws(new Error());

      try {
        commander.initialise();
      } catch (e) {
        expect(commander.initialised).to.equal(false);
      }
    });
  });

  /////////////////////////////////////
  //
  // close

  describe('close', () => {});

  /////////////////////////////////////
  //
  // control

  describe('control', () => {
    let commander: Commander;

    beforeEach(() => {
      commander = new Commander({
        remoteAddress: '127.0.0.1',
        remotePort: 1234,
      });
      // @ts-ignore
      sinon.stub(commander, '_bindSocket');
      commander.initialise();
    });

    it('should call _sendCommand with the correct arguments', () => {
      // @ts-ignore
      const spy = sinon.stub(commander, '_sendCommand');
      commander.control(ControlCommandEnum.takeoff);
      expect(spy.callCount).to.eql(1);
      expect(spy.calledWith('takeoff')).to.equal(true);
    });
  });

  /////////////////////////////////////
  //
  // set

  describe('set', () => {
    let commander: Commander;

    beforeEach(() => {
      commander = new Commander({
        remoteAddress: '127.0.0.1',
        remotePort: 1234,
      });
      // @ts-ignore
      sinon.stub(commander, '_bindSocket');
      commander.initialise();
    });

    it('should call _sendCommand with the correct arguments', () => {
      // @ts-ignore
      const spy = sinon.stub(commander, '_sendCommand');
      commander.set(SetCommandEnum.speed);
      expect(spy.callCount).to.eql(1);
      expect(spy.calledWith('speed')).to.equal(true);
    });
  });


  /////////////////////////////////////
  //
  // control

  describe('read', () => {
    let commander: Commander;

    beforeEach(() => {
      commander = new Commander({
        remoteAddress: '127.0.0.1',
        remotePort: 1234,
      });
      // @ts-ignore
      sinon.stub(commander, '_bindSocket');
      commander.initialise();
    });

    it('should call _sendCommand with the correct arguments', () => {
      // @ts-ignore
      const spy = sinon.stub(commander, '_sendCommand');
      commander.read(ReadCommandEnum.battery);
      expect(spy.callCount).to.eql(1);
      expect(spy.calledWith('battery')).to.equal(true);
    });
  });


});
