import { Commander } from '../src';
import { ReadCommand } from '../src/enums/ReadCommand';


const main = async () => {
  const commander = new Commander({ address: '192.168.1.10', port: 8889 });
  commander.initialise();
  const batteryLevel = await commander.read(ReadCommand.battery);

  console.log('batteryLevel');
};


main().catch(e => console.error(e));
