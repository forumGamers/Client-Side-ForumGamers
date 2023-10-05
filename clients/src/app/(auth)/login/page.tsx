import "@/styles/pages/login.css";
import Link from "next/link";
import LoginForm from "./form";
import { checkServerSession } from "@/helper/global";
import { redirect } from "next/navigation";
import GoogleForm from "./googleForm";
import { signIn } from "next-auth/react";
import Encryption from "@/helper/encryption";
import { loginHandler } from "@/actions/user";
import { RedirectType } from "next/dist/client/components/redirect";

export default async function LoginPage(): Promise<JSX.Element> {
  await checkServerSession((session) => {
    if (session) redirect("/", RedirectType.replace);
  });

  const action = async (formData: FormData) => {
    "use server";
    const email = Encryption.encrypt(formData.get("email") as string);
    const password = Encryption.encrypt(formData.get("password") as string);
    const tokenCaptcha = formData.get("g-recaptcha-response");

    const { success, message, data } = await loginHandler({
      email,
      password,
      access_token: tokenCaptcha as string,
    });

    if (!success) redirect(`/login?error=${message}`, RedirectType.replace);

    await signIn("credentials", {
      access_token: data?.login.access_token,
      redirect: false,
    });

    redirect("/", RedirectType.replace);
  };

  return (
    <>
      <div className="body d-flex justify-content-center align-items-center">
        <div className="navbar mt-3">
          <div className="flex-1">
            <p className="text-xl font-sans text-white">Forum Gamers</p>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link className="font-sans text-white" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="font-sans text-white hover:bg-[#8648C1]"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrapper-login">
          <div className="card border-sm border-2 border-white p-12 w-[30%] h-[60vh]">
            <h2 className="text-4xl text-[#8648C1] text-center mb-6">LOGIN</h2>
            <form action={action}>
              <LoginForm />
            </form>
            <div className="container mt-2 cursor-pointer align-middle">
              <GoogleForm />
            </div>
            <Link href="/register" className="login-link">
              <p className="text-[#8648C1] font-semibold font-sans text-sm">
                Not have an account yet? Sign Up
              </p>
            </Link>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
}
