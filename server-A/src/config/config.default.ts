import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1663159088865_5155',
  koa: {
    port: 7002,
  },
  cors: {
    credentials: true,
    origin: "http://test-a.com:6002"
  },
} as MidwayConfig;
