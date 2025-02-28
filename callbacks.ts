// callbacks.ts
import { prisma } from "@/db/prisma";
import { cookies } from "next/headers";

export const callbacks = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async session({ session, token }: any) {
    session.user.id = token.sub;
    session.user.role = token.role;
    session.user.name = token.name;
    return session;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async jwt({ token, user, trigger, session }: any) {
    if (user) {
      token.id = user.id;
      token.role = user.role;
      if (user.name === "NO_NAME") {
        token.name = user.email!.split("@")[0];
        await prisma.user.update({ where: { id: user.id }, data: { name: token.name } });
      }

      if (trigger === "signIn" || trigger === "signUp") {
        const sessionCartId = (await cookies()).get("sessionCartId")?.value;
        if (sessionCartId) {
          const sessionCart = await prisma.cart.findFirst({ where: { sessionCartId } });
          if (sessionCart) {
            await prisma.cart.deleteMany({ where: { userId: user.id } });
            await prisma.cart.update({ where: { id: sessionCart.id }, data: { userId: user.id } });
          }
        }
      }
    }

    if (session?.user.name && trigger === "update") {
      token.name = session.user.name;
    }

    return token;
  },
};
