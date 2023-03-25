import { useEffect, useState } from "react";
import "@/styles/pages/login.css";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/queries/user";
import Loading from "@/components/loading";
import { swalError } from "@/helper/swal";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { NextApiRequest, NextApiResponse } from "next";

export async function getServerSideProps(context: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const session = await getSession(context);
  console.log(session);

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
  const [loading, setLoading] = useState(false);

  // const [login, { data, loading }] = useMutation(LOGIN, {
  //   onError: (error) => {
  //     setErrorMsg(error.message);
  //     swalError(errorMsg);
  //   },
  //   onCompleted(data, clientOptions) {
  //     // localStorage.setItem("email", data.login.email);
  //     // localStorage.setItem("access_token", data.login.access_token);
  //     // localStorage.setItem("username", data.login.username);
  //     // localStorage.setItem("imageUrl", data.login.imageUrl);
  //     router.push("/");
  //   },
  // });

  useEffect(() => {
    const user = localStorage.getItem("access_token") || null;

    if (user) router.replace("/");
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // await login({
    //   variables: {
    //     login: {
    //       email: formData.email,
    //       password: formData.password,
    //     },
    //   },
    // });
    await signIn("credentials", {
      email: formData.email,
      password: formData.password,
      redirect: true,
      callbackUrl: "/",
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
        <a href="#" className="login-link">
          Forgot password?
        </a>
        <span className="login-divider">·</span>
        <a href="/register" className="login-link">
          Not have an account yet? Sign Up
        </a>
      </div>
    </div>
  );
}
