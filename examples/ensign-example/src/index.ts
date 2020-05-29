import fs from 'fs';

import { Ensign, EnsignEventEnum } from '@node-tello/ensign';
import { Commander } from '@node-tello/commander';
import { ControlCommandEnum, ReadCommandEnum } from '@node-tello/commander/dist';

const wait = (ms: number) => {
  return new Promise((resolve => {
    setTimeout(resolve, ms);
  }))
};

const main = async () => {
  const ensign = new Ensign({
    localAddress: '0.0.0.0',
    localPort: 11111
  });
  const commander = new Commander({
    remoteAddress: '192.168.10.1',
    remotePort: 8889
  });
  wait(2000);

  ensign.on(EnsignEventEnum.snap, (ppm) => {
    fs.writeFileSync(`snap_${Date.now()}.ppm`, ppm)
  });

  commander.initialise();
  ensign.initialise();

  ensign.snap();

  await wait(1000);
  await commander.control(ControlCommandEnum.streamon);
  await wait(1000);
  await commander.read(ReadCommandEnum.battery);
  // await wait(1000);
  // await commander.control(ControlCommandEnum.takeoff);
  // await wait(2000);
  // await commander.control(ControlCommandEnum.land);
  await wait(1000);
  ensign.snap();

  await wait(20000);

};

main().catch(e => console.error(e));
