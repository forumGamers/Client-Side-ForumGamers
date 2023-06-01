import "@/styles/pages/register.css";
import Wrapper from "./wrapper";
import { redirect } from "next/navigation";
import { NextPageContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";

export default async function RegisterPage(
  ctx: NextPageContext
): Promise<JSX.Element> {
  async function checkSession(ctx: NextPageContext) {
    "use server";
    const session: Session | null = await getSession(ctx);

    if (session) redirect("/");
  }
  await checkSession(ctx);
  return <Wrapper />;
}
