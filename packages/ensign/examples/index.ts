import { Ensign } from '../src';


const main = async () => {
  const ensign = new Ensign({
    localAddress: '0.0.0.0',
    localPort: 111111
  });
};


main().catch(e => console.error(e));
