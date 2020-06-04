import fs from 'fs';

import { Ensign, EnsignEventEnum } from '@node-tello/ensign';
import { Commander } from '@node-tello/commander';
import { ControlCommandEnum, ReadCommandEnum } from '@node-tello/commander';

const main = async () => {
  const ensign = new Ensign({
    localAddress: '0.0.0.0',
    localPort: 11111
  });
  const commander = new Commander({
    remoteAddress: '192.168.10.1',
    remotePort: 8889
  });
  ensign.on(EnsignEventEnum.snap, (ppm) => {
    fs.writeFileSync(`snap_${Date.now()}.ppm`, ppm)
  });

  await commander.initialise();
  ensign.initialise();

  ensign.snap();

  await commander.control(ControlCommandEnum.streamon);
  await commander.read(ReadCommandEnum.battery);
  ensign.snap();

  commander.destroy();
};

main().catch(e => console.error(e));
