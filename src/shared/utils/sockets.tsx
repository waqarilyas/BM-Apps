import io from 'socket.io-client';
import defaultConfig from '../../../block.config';

export let socket = io.connect(defaultConfig.API_URL);

export const initSocket = async (address: string) => {
  try {
    if (address) {
      socket.removeEventListener(address);
    } else {
      return;
    }

    socket = io.connect(defaultConfig.API_URL, {
      query: {
        address,
      },
    });
  } catch (err) {
    console.log('---------SOCKET ERROR---------', err);
  }
};
