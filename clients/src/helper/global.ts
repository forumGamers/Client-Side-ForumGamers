import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export const fixDate = (date: string): string => date.slice(0, 10);

export async function checkSession(ctx: NextPageContext, redirectUrl: string) {
  "use server";
  const session: Session | null = await getSession(ctx);

  if (session) redirect(redirectUrl);
}
