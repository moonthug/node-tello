import { Commander } from '../src';
import { ReadCommand } from '../src/enums/ReadCommand';


const main = async () => {
  const commander = new Commander({
    localPort: 18889,
    remoteAddress: '127.0.0.1',
    remotePort: 8889
  });
  commander.initialise();
  setInterval(async () => {
    const batteryLevel = await commander.read(ReadCommand.battery);

    console.log(batteryLevel);
  }, 5000);
};


main().catch(e => console.error(e));
