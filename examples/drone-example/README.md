# `@node-tello/drone-example`

## Usage

```
import { Ensign } from '@node-tello/drone';

const drone = new Ensign({
  localAddress: '0.0.0.0',
  localPort: 11111
});
const commander = new Commander({
  remoteAddress: '192.168.10.1',
  remotePort: 8889
});

drone.on(EnsignEventEnum.snap, (ppm) => {
  fs.writeFileSync(`snap_${Date.now()}.ppm`, ppm)
});

drone.initialise();
drone.snap();
```
