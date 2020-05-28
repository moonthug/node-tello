import { Drone } from '../src';

const wait = async (ms: number) => {
  return new Promise(((resolve) => {
    setTimeout(resolve, ms)
  }))
};

/**
 *
 */
const main = async () => {
  const drone = new Drone({
    address: '192.168.10.1',
    commandPort: 8889,
    statePort: 8890
  });
  await wait(2000);

  await drone.streamOn();
  await wait(1000);

  // drone.on('state', state => {
  //   return console.log(state.toString())
  // });

  await drone.getBattery();

  // console.log('takeoff');
  // await drone.takeoff();

  await wait(600000);

  // console.log('land');
  // drone.land();

  process.exit();
};


main().catch(e => console.error(e));
