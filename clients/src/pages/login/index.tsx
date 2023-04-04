import { useState } from "react";
import "@/styles/pages/login.css";
import Loading from "@/components/loading";
import { swalError } from "@/helper/swal";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/queries/user";
import Link from "next/link";

export async function getServerSideProps(context: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session = (await getSession(context)) || null;

  if (session)
    return {
      redirect: {
        destination: "/",
      },
    };

  return {
    props: {},
  };
}

export default function LoginPage() {
  const router = useRouter();
  const [formData, setData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const [login, { loading }] = useMutation(LOGIN, {
    onError: (error) => {
      setErrorMsg(error.message);
      swalError(errorMsg);
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
          email: formData.email,
          password: formData.password,
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

  if (errorMsg) swalError(errorMsg);

  return (
    <div className="login-container">
      <h2 className="login-title">Log in to your account</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-input-container">
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="login-input"
          />
        </div>
        <div className="login-input-container">
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="login-input"
          />
        </div>
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
      <div className="login-links-container">
        <Link href="#" className="login-link">
          Forgot password?
        </Link>
        <span className="login-divider">·</span>
        <Link href="/register" className="login-link">
          Not have an account yet? Sign Up
        </Link>
      </div>
    </div>
  );
}
