interface User {
    id?: number;
    nama: string;
    email: string;
    password: string;
    refresh_token: string;
    access_token: string;
    avatar: string;
    role: string;
  }
  
  export interface RegisterPayload
    extends Pick<User, "nama" | "email" | "password"> {}
  export interface LoginPayload extends Pick<User, "email" | "password"> {}
  