import { Cadet } from '../src';


const main = async () => {
  const cadet = new Cadet({
    localAddress: '192.168.10.1',
    localPort: 8890
  });

  cadet.on('state', (state: any) => {
    console.log(state);
  });

  cadet.initialise();
};


main().catch(e => console.error(e));
