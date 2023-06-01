import "@/styles/pages/login.css";
import Link from "next/link";
import LoginForm from "./form";
import { checkSession } from "@/helper/global";
import { NextPageContext } from "next";

export default async function LoginPage(
  ctx: NextPageContext
): Promise<JSX.Element> {
  await checkSession(ctx, "/");
  return (
    <>
      <div className="body d-flex justify-content-center align-items-center">
        <div className="navbar mt-3">
          <div className="flex-1">
            <h6 className="btn btn-ghost normal-case text-xl font-sans text-white">
              Forum Gamers
            </h6>
          </div>
        </div>
        <div className="container">
          <div className="card border-sm border-2 border-white p-12 w-[30%] h-[60vh]">
            <h2 className="text-4xl text-[#8648C1] text-center mb-6">LOGIN</h2>
            <LoginForm />
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
