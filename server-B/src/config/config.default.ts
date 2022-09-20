import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1663159088865_5156',
  koa: {
    port: 7003,
  },
  cors: {
    credentials: true,
    origin: "http://test-b.com:6003"
  },
} as MidwayConfig;
