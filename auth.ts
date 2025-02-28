import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts-edge";
import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";
import {midd}
  
export const config = {
	pages: {
		signIn: "/sign-in",
		error: "/sign-in",
	},
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60,
	},

	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			credentials: {
				email: { type: "email" },
				password: { type: "password" },
			},
			async authorize(credentials) {
				if (credentials == null) return null;

				// Find user in database
				const user = await prisma.user.findFirst({
					where: {
						email: credentials.email as string,
					},
				});

				// Check if user exists and if the password matches
				if (user && user.password) {
					const isMatch = await compareSync(
						credentials.password as string,
						user.password
					);

					// If password is correct, return user
					if (isMatch) {
						return {
							id: user.id,
							name: user.name,
							email: user.email,
							role: user.role,
						};
					}
				}
				// If user does not exist or password does not match return null
				return null;
			},
		}),
	],
	callbacks: {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async session({ session, user, trigger, token }: any) {
			// set the user id from token
			session.user.id = token.sub;
			session.user.role = token.role;
			session.user.name = token.name;
			// if there is an projectUpdate, set the user name
			if (trigger == "update") {
				session.user.name = user.name;
			}
			return session;
		},
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		async jwt({ token, user }: any) {
			// Assign user fields to token
			if (user) {
				token.id = user.id;
				token.role = user.role;

				// If user has no name then use the email
				if (user.name === "NO_NAME") {
					token.name = user.email!.split("@")[0];

					// Update database to reflect the token name
					await prisma.user.update({
						where: { id: user.id },
						data: { name: token.name },
					});
				}
				return token;
			}
		},
		// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
		authorized({ request, auth }: any) {
			if (!request.cookies.get("sessionCartId")) {
				// Generate new session cart id cookie
				const sessionCartId = crypto.randomUUID();

				// Clone the req headers
				const newRequestHeaders = new Headers(request.headers);

				// Create new response and add the new headers
				const response = NextResponse.next({
					request: {
						headers: newRequestHeaders,
					},
				});

				// Set newly generated sessionCartId in the response cookies
				response.cookies.set("sessionCartId", sessionCartId);

				return response;
			} else {
				return true;
			}
		},
	},
} satisfies NextAuthConfig;
export const { handlers, auth, signIn, signOut } = NextAuth(config);
