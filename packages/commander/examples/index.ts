import { Commander, ReadCommand } from '../src';

const main = async () => {
  const commander = new Commander({
    // localPort: 18889, # switch for mock
    remoteAddress: '192.168.10.1',
    remotePort: 8889
  });
  commander.initialise();
  const batteryLevel = await commander.read(ReadCommand.battery);
};


main().catch(e => console.error(e));
