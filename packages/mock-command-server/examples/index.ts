import { MockCommandServer } from '../src';

/**
 *
 */
const main = async () => {
  const mockCommandServer = new MockCommandServer({
    port: 8889
  });
  mockCommandServer.addMock('battery?', '100');
  mockCommandServer.initialise();
};


main().catch(e => console.error(e));
