# node-tello

This is the `lerna` monorepo for `@node-tello`.

## Packages

- ### `@node-tello/drone`

    A high level interface for complete control of the Tello. It's built on `commander`, `cadet` and `ensign`.
    
    [@node-tello/drone](https://github.com/moonthug/node-tello/tree/master/packages/drone)
    
- ### `@node-tello/commander`

    Sends commands to the Tello drone
    
    [@node-tello/commander](https://github.com/moonthug/node-tello/tree/master/packages/commander)

- ### `@node-tello/cadet`
    
    Handles state updates from the Tello drone
    
    [@node-tello/cadet](https://github.com/moonthug/node-tello/tree/master/packages/cadet)

- ### `@node-tello/ensign` (*Experimental*)
    
    Take photos and receive a usable video stream from the Tello cam
    
    [@node-tello/ensign](https://github.com/moonthug/node-tello/tree/master/packages/ensign)

- ### `@node-tello/mock-command-server` (*Experimental*)
    
    [@node-tello/mock-command-server](https://github.com/moonthug/node-tello/tree/master/packages/mock-command-server)


## Examples

- [Drone Example](https://github.com/moonthug/node-tello/tree/master/examples/drone-example)
- [Ensign Example](https://github.com/moonthug/node-tello/tree/master/examples/ensign-example)


## Future
- Browser integration
- React Wrapper
