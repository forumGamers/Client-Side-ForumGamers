"use client";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@/queries/user";
import Link from "next/link";
import Encryption from "@/helper/encryption";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { swalError } from "@/helper/swal";
import Loading from "@/components/loading";

export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const [formData, setData] = useState({
    email: "",
    password: "",
  });
  const [visiblePass, setVisiblePass] = useState<boolean>(false);

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
          email: Encryption.encrypt(formData.email),
          password: Encryption.encrypt(formData.password),
        },
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <Loading />;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login-input-wrapper mb-4">
          <div className="form-control w-full">
            <label htmlFor="email" className="label">
              <span className="label-text text-sm font-semibold text-[#8648C1]">
                Email
              </span>
            </label>
            <input
              className="input input-bordered rounded-xl w-full bg-white"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Masukkan Email Anda"
            />

            <label htmlFor="password" className="label">
              <span className="label-text text-sm font-semibold text-[#8648C1]">
                Password
              </span>
            </label>
            <input
              className="input input-bordered rounded-xl w-full bg-white"
              type={visiblePass ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Masukkan Password yang Sesuai"
            />
            <label className="label">
              <span className="label-text text-sm font-semibold text-[#8648C1]">
                See Password
              </span>
            </label>
            <input
              type="checkbox"
              checked={visiblePass}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setVisiblePass(e.target.checked);
              }}
            />
          </div>
          <Link
            href="/forget-password"
            className="login-link d-flex flex-row-reverse"
          >
            <p className="text-[#8648C1]  font-semibold font-sans text-sm">
              Forgot password?
            </p>
          </Link>
        </div>
        <button
          type="submit"
          className="btn w-full text-white bg-[#8648C1] mb-2"
        >
          Log in
        </button>
      </form>
    </>
  );
}
