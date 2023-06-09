import "@/styles/pages/login.css";
import Link from "next/link";
import LoginForm from "./form";
import { checkServerSession } from "@/helper/global";
import { redirect } from "next/navigation";

export default async function LoginPage(): Promise<JSX.Element> {
  await checkServerSession((session) => {
    if (session) redirect("/");
  });
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
