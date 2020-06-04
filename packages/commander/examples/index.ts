import { Commander, ControlCommandEnum, ReadCommandEnum } from '../src';

const main = async () => {
  const commander = new Commander({
    // localPort: 18889, # switch for mock
    remoteAddress: '192.168.10.1',
    remotePort: 8889
  });
  await commander.initialise();

  const batteryLevel = await commander.read(ReadCommandEnum.battery);
  console.log(batteryLevel);

  const time = await commander.read(ReadCommandEnum.time);
  console.log(time);

  console.log('takeoff!');
  await commander.control(ControlCommandEnum.takeoff);

  try {
    console.log('flip!');
    await commander.control(ControlCommandEnum.flip, [ 'l' ]);
  } catch (e) {
    console.log(e);
  }

  console.log('land!');
  await commander.control(ControlCommandEnum.land);

  await commander.destroy();
};


main().catch(e => console.error(e));
