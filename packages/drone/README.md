# `@node-tello/drone`

`@node-tello/drone` is a module for controlling a RyzeRobotics/DJI Tello drone.

It consists of a high level interface wrapping 3 core modules which are used for communication with the drone.

- `@node-tello/commander` - Sends commands to the Drone
- `@node-tello/cadet` - Receives state updates from the Drone
- `@node-tello/ensign` - [Experimental] Take photos and receive a usable video stream from the Tello cam

## Monorepo
- [Node Tello](https://github.com/moonthug/node-tello)

### Dependencies
- [Commander](https://github.com/moonthug/node-tello/tree/master/packages/commander)
- [Cadet](https://github.com/moonthug/node-tello/tree/master/packages/cadet)
- [Ensign](https://github.com/moonthug/node-tello/tree/master/packages/ensign)

### Usage

```ts
import { Drone, State } from '@node-tello/drone';

const drone = new Drone();

drone.on('state', (state: State) => {
  return console.log(state.toString())
});

await drone.initalise();

console.log('Get Battery Level');
const batteryLevel = await drone.getBattery();
console.log(batteryLevel);

console.log('takeoff');
await drone.takeoff();

console.log('land');
await drone.land();

drone.disconnect();
```

Javascript
```js
const { Drone, State } = require( '@node-tello/drone');

const drone = new Drone();

drone.on('state', state => {
  return console.log(state.toString())
});

await drone.initalise();

console.log('Get Battery Level');
const batteryLevel = await drone.getBattery();
console.log(batteryLevel);

console.log('takeoff');
await drone.takeoff();

console.log('land');
await drone.land();

drone.disconnect();
```

### Examples
- [Drone Example](https://github.com/moonthug/node-tello/tree/master/examples/drone-example)
