import "@/styles/pages/register.css";
import Wrapper from "./wrapper";
import { checkServerSession } from "@/helper/global";
import { redirect } from "next/navigation";

export default async function RegisterPage(): Promise<JSX.Element> {
  await checkServerSession((session) => {
    if (session !== null) redirect("/");
  });
  return <Wrapper />;
}
