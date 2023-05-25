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
      <div className="img-bg-wp d-flex justify-content-center align-items-center">
        <div className="login-wrapper">
        <div className="card border-sm border-2 border-white">
          <h2 className="text-4xl text-white text-center mb-6">LOGIN</h2>
          <form onSubmit={handleSubmit}>

            <div className="login-input-wrapper">
              <div className="form-control w-full">
              
              <label htmlFor="email" className="label">
                <span className="label-text text-lg text-white">Email</span>
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
                <span className="label-text text-lg text-white">Password</span>
              </label>
              <input className="input input-bordered rounded-xl w-full bg-white mb-3"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Masukkan Password yang Sesuai"
              />
              </div>
            </div>
            <button type="submit" className="btn btn-active w-full text-white bg-[#8d3c96] p-4 mb-5">
              Log in
            </button>
          </form>
          <div className="login-links-wrapper">
            <Link href="#" className="login-link">
              Forgot password?
            </Link>
            <span className="login-divider"> </span>
            <Link href="/register" className="login-link">
              Not have an account yet? Sign Up
            </Link>
          </div>
          <div></div>
        </div>
        </div>
      </div>
    </div>
  );
}
