import { Drone, State } from '@node-tello/drone';

/**
 *
 */
const main = async () => {
  const drone = new Drone({
    address: '192.168.10.1',
    commandPort: 8889,
    statePort: 8890
  });

  await drone.initalise();

  // await drone.streamOn();

  drone.on('state', (state: State) => {
    return console.log(state.toString())
  });

  console.log('Get Battery Level');
  const batteryLevel = await drone.getBattery();
  console.log(batteryLevel);

  console.log('takeoff');
  await drone.takeoff();

  console.log('land');
  await drone.land();

  drone.disconnect();
};


main().catch(e => console.error(e));
