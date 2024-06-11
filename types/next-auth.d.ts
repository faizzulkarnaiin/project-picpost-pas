import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number | undefined | null;
      email: string | undefined | null;
      name: string | undefined | null;
      accessToken: any;
      refreshToken: any;
      token: any;
      role?: any;
      avatar?: any;
      isBanned? : any
    };
  }
}
