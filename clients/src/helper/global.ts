import { CustomSession } from "@/interfaces/tour";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Encryption from "./encryption";

export const fixDate = (date: string): string => date.slice(0, 10);

export async function checkSession(
  ctx: NextPageContext,
  callback: (session: CustomSession | null) => any
) {
  "use server";
  const session: CustomSession | null = await getSession(ctx);

  callback(session);
}

export async function checkServerSession(
  callback: (session: CustomSession | null) => any
) {
  "use server";
  const session: CustomSession | null = await getServerSession(authOptions);

  callback(session);
}

export async function encryptDataSend(
  data: Record<string, string>
): Promise<Record<string, string>> {
  "use server";
  const result: any = {};
  for (const key in data) {
    result[key] = Encryption.encrypt(data[key]);
  }

  return result;
}
