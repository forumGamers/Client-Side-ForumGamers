import { useState } from "react";
import "@/styles/pages/login.css";
import Loading from "@/components/loading";
import { swalError } from "@/helper/swal";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
} from "next";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/queries/user";
import Link from "next/link";
import Encryption from "@/helper/encryption";


export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<{ keys: string; redirect?: Redirect }>> {
  const session = (await getSession(context)) || null;

  if (session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  const keys = process.env.ENCRYPTION_KEY as string;

  return {
    props: { keys },
  };
}

export default function LoginPage({ keys }: { keys: string }): JSX.Element {
  const router = useRouter();
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN, {
    onError: (error) => {
      swalError(error.message);
    },
    async onCompleted(data, clientOptions) {
      await signIn("credentials", {
        access_token: data.login.access_token,
        redirect: false,
      });
      router.push("/");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login({
      variables: {
        login: {
          email: Encryption.encrypt(formData.email, keys),
          password: Encryption.encrypt(formData.password, keys),
        },
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <Loading />;

  return (
    <div className="body d-flex justify-content-center align-items-center">
     <div className="navbar mt-3">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl font-sans text-white">Forum Gamers</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
          <li><a className="font-sans text-white">About</a></li>
          <li><a href="../register" className="font-sans text-white hover:bg-[#8648C1]">Sign Up</a></li>
          </ul>
        </div>
    </div>
        <div className="container">
        <div className="card border-sm border-2 border-white p-12 w-[30%] h-[60vh]">
          <h2 className="text-4xl text-[#8648C1] text-center mb-6">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-input-wrapper mb-4">
              <div className="form-control w-full">
              
              <label htmlFor="email" className="label">
                <span className="label-text text-sm font-semibold text-[#8648C1]">Email</span>
              </label>
                <input className="input input-bordered rounded-xl w-full bg-white"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Masukkan Email Anda"
                />

              <label htmlFor="email" className="label">
                <span className="label-text text-sm font-semibold text-[#8648C1]">Password</span>
              </label>
              <input className="input input-bordered rounded-xl w-full bg-white"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Masukkan Password yang Sesuai"
              />
              </div>
              <Link href="#" className="login-link d-flex flex-row-reverse">
              <p className="text-[#8648C1]  font-semibold font-sans text-sm">Forgot password?</p>
            </Link>
            </div>
            <button type="submit" className="btn w-full text-white bg-[#8648C1] mb-2">
              Log in
            </button>
          </form>
            <Link href="../register" className="login-link">
              <p className="text-[#8648C1] font-semibold font-sans text-sm">Not have an account yet? Sign Up</p>
            </Link>
          <div></div>
        </div>
        </div>
      </div>
  );
}
