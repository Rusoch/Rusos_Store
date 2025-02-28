// auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./authConfig";
import { callbacks } from "./callbacks";
import { authorized } from "./authorization";

export const config = {
  ...authConfig,
  callbacks,
  authorized,
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
