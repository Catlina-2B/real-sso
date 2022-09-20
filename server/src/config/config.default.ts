import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1663157970217_4581',
  koa: {
    port: 7001,
  },
  redis: {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: 'cat',
      db: 0,
      name: "liu"
    }
  },
  jwt: {
    secret: 'test123', // fs.readFileSync('xxxxx.key')
    expiresIn: '5m', // https://github.com/vercel/ms
  },
  cors: {
    credentials: true,
    origin: "http://127.0.0.1:6001"
  },
} as MidwayConfig;
