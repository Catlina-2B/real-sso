import {
  Inject,
  Controller,
  Get,
  Post
} from "@midwayjs/decorator";
import { Context } from "@midwayjs/koa";
import { UserService } from "../service/user.service";

import { RedisService } from "@midwayjs/redis";

import { JwtService } from "@midwayjs/jwt";

import { v4 as uuid } from "uuid";

@Controller("/api")
export class APIController {
  @Inject() ctx: Context;

  @Inject() userService: UserService;

  @Inject() redisService: RedisService;

  @Inject() jwtService: JwtService;

  @Get("/verify")
  async verify() {
    try {
      const {
        identity,
        sid
      }: { sid?: string; identity?: string; name?: string } = this.ctx.request.query;
      console.log(identity)
      console.log(sid)
      const tokenExists = await this.redisService.get(sid);
      if (tokenExists && identity == tokenExists) {
        console.log('相等')
        const user: any = this.jwtService.decode(identity);
        return {
          success: true,
          message: "OK",
          data: this.userService.getUser(user.username)
        };
      } else {
        return { success: false, msssage: "token is invaild." };
      }
    } catch (err) {
      return { success: false, msssage: "data is invaild." };
    }
  }

  setCookie(key, val) {
    this.ctx.response.ctx.cookies.set(key, val, {
      expires: new Date(Date.now() + 600000),
      signed: false,
      httpOnly: false,
      sameSite: "none"
    });
  }

  // 登录
  @Post("/login")
  async login(): Promise<{ success: boolean; message: string }> {
    const {
      username,
      password
    }: { username?: string; password?: string } = this.ctx.request.body;

    const user = this.userService.getUser(username);
    // 用户名密码验证
    if (user && user.password === password) {
      const token = await this.jwtService.sign({ username, password });
      // 生成随机id
      const sid = uuid();

      if (user.sid != "") {
        // 将redis中原token删除
        this.redisService.del(user.sid);
      }
      // 将新的token存入redis
      this.redisService.set(sid, token, "EX", 86400);

      this.ctx.session.user = {
        sid,
        token
      };

      // 将token信息设置到web的cookie中
      this.setCookie('sid', sid);
      this.setCookie('identity', token);
      this.setCookie('username', user.username);

      this.userService.setUserToken(username, token, sid);
      return {
        success: true,
        message: "OK"
      };
    } else {
      return { success: false, message: "username or password is invalid." };
    }
  }
}
