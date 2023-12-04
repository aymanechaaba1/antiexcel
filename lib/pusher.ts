import PusherClient from 'pusher-js';
import PusherServer from 'pusher';

const pusherClient = new PusherClient('bb81355d70d378c4269b', {
  cluster: 'eu',
  forceTLS: true,
});

const pusherServer = new PusherServer({
  appId: '1717455',
  key: 'bb81355d70d378c4269b',
  secret: 'be2e3b4297207a0a4ee5',
  cluster: 'eu',
  useTLS: true,
});

export { pusherClient, pusherServer };
