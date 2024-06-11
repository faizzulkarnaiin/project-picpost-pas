import { BaseResponseSuccess } from "@/app/lib/axiosClient";

interface User {
  id?: number;
  nama: string;
  email: string;
  password: string;
  refresh_token: string;
  access_token: string;
  avatar: string;
  role: string;
  provider?: "credentials";
  isBanned : boolean
}

export interface RegisterPayload
  extends Pick<User, "nama" | "email" | "password" | "provider"> {}
export interface LoginPayload extends Pick<User, "email" | "password"> {}
export interface RegisterResponse extends BaseResponseSuccess {}
export interface ProfileResponse extends BaseResponseSuccess {
  data: User;
}
export interface LoginResponse extends BaseResponseSuccess {
  data: User;
}
export interface ForgetPwPayload extends Pick<User, "email"> {}
export interface ResetPwPayload extends Pick<User, "password"> {}
export interface ProfileUpdatePayload
  extends Pick<User, "avatar" | "nama" | "id"> {
  file?: File;
}
