import { Provide } from "@midwayjs/decorator";

const users = {
  userA: {
    username: "userA",
    password: "123456",
    phone: "12345678901",
    email: "a.xxx@xxx.com",
    lastToken: "",
    sid: "",
  },
  userB: {
    username: "userB",
    password: "123456",
    phone: "12345678901",
    email: "b.xxx@xxx.com",
    lastToken: "",
    sid: "",
  }
};

@Provide()
export class UserService {
  getUser(user: string) {
    return users[user];
  }
  async setUserToken(name: string, token: string, sid: string) {
    users[name].lastToken = token;
    users[name].sid = sid;
  }
}
