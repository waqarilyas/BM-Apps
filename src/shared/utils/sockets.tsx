import io from 'socket.io-client';
import blockConfig from '../../../block.config';

export let socket = io.connect(blockConfig.API_URL);

export const initSocket = async (address: string) => {
  try {
    if (address) {
      console.log('\x1b[32m', 'Removing Listener');
      socket.removeAllListeners();
    } else {
      return;
    }

    socket = io.connect(blockConfig.API_URL, {
      query: {
        address,
      },
    });
  } catch (err) {
    console.log('---------SOCKET ERROR---------', err);
  }
};
