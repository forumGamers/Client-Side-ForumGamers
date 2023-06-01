import "@/styles/pages/register.css";
import Wrapper from "./wrapper";
import { NextPageContext } from "next";
import { checkSession } from "@/helper/global";

export default async function RegisterPage(
  ctx: NextPageContext
): Promise<JSX.Element> {
  await checkSession(ctx, "/");
  return <Wrapper />;
}
