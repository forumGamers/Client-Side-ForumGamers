import { CustomSession } from "@/interfaces/tour";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export const fixDate = (date: string): string => date.slice(0, 10);

export async function checkSession(
  ctx: NextPageContext,
  callback: (session: CustomSession | null) => any
) {
  "use server";
  const session: CustomSession | null = await getSession(ctx);

  callback(session);
}
