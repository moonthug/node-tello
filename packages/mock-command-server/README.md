# `@node-tello/mock-command-server`

> TODO: description

## Usage

```
import { MockCommandServer } from '@node-tello/mock-command-server';

const mockCommandServer = new MockCommandServer({ port: 8889 });
mockCommandServer.addMock('battery?', '100');
mockCommandServer.initialise();
```
