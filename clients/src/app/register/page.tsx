import "@/styles/pages/register.css";
import Wrapper from "./wrapper";
import { NextPageContext } from "next";
import { checkSession } from "@/helper/global";
import { redirect } from "next/navigation";

export default async function RegisterPage(
  ctx: NextPageContext
): Promise<JSX.Element> {
  await checkSession(ctx, (session) => {
    if (session) redirect("/");
  });
  return <Wrapper />;
}
