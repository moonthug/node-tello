import { Drone } from '../src';

/**
 *
 */
const main = async () => {
  const drone = new Drone({
    address: '192.168.1.1',
    commandPort: 8889,
    statePort: 8890
  });

  drone.takeoff();
};


main().catch(e => console.error(e));
