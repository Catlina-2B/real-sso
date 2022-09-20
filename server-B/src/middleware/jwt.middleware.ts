import { IMiddleware, makeHttpRequest } from "@midwayjs/core";
import { Middleware } from "@midwayjs/decorator";
import { NextFunction, Context } from "@midwayjs/koa";

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const cookies: { identity?: string; sid?: string; name?: string } = {};

      const keys = ctx.request.ctx.headers.cookie.trim().split(";");

      keys.forEach(i => {
        const arr = i.split("=");
        cookies[arr[0].trim()] = arr[1];
      });

      const verify = await makeHttpRequest("http://127.0.0.1:7001/api/verify", {
        data: {
          name: cookies.name,
          sid: cookies.sid,
          identity: cookies.identity
        },
        dataType: "json"
      });

      if (verify.data.success) {
        ctx.session.user = verify.data.data;
        await next();
      } else {
        return { success: false, message: verify.data.msssage };
      }
    };
  }

  static getName(): string {
    return "report";
  }
}
