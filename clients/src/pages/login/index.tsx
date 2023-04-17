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
import { LazyLoadImage } from "react-lazy-load-image-component";
const joystickImage =
  "https://ik.imagekit.io/b8ugipzgo/FrontEnd/joystick.png?updatedAt=1681635187372";

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

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div className="img-bg-wp d-flex justify-content-center align-items-center">
        <div className="login-wrapper">
          <h2 className="login-title">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="login-input-wrapper">
              <label htmlFor="email" className="login-label">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="login-input border border-secondary rounded-3"
                placeholder="Masukkan Email Anda"
              />
            </div>
            <div className="login-input-wrapper">
              <label htmlFor="password" className="login-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="login-input border border-secondary rounded-3"
                placeholder="Masukkan Password yang Sesuai"
              />
            </div>
            <button type="submit" className="login-button ">
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
          <div>
            <LazyLoadImage
              src={joystickImage}
              className="joystick"
              placeholderSrc={joystickImage}
              alt="joystick"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
