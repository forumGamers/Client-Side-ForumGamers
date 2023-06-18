"use client";

import { useMutation } from "@apollo/client";
import { LOGIN } from "@/queries/user";
import Link from "next/link";
import Encryption from "@/helper/encryption";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { swalError } from "@/helper/swal";
import Loading from "@/components/loader";
import ReCAPTCHA from "react-google-recaptcha";

type state = {
  email: string;
  password: string;
  recaptchaValid: boolean;
  tokenCaptcha: string;
};

export default function LoginForm(): JSX.Element {
  const router = useRouter();
  const [load, setLoad] = useState<boolean>(false);
  const [formData, setData] = useState<state>({
    email: "",
    password: "",
    recaptchaValid: false,
    tokenCaptcha: "",
  });
  const [visiblePass, setVisiblePass] = useState<boolean>(false);

  const [login, { loading }] = useMutation(LOGIN, {
    onError: (error) => {
      setData((prev: state) => ({
        ...prev,
        recaptchaValid: false,
        tokenCaptcha: "",
      }));
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

  useEffect(() => {
    setLoad(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login({
      variables: {
        login: {
          email: Encryption.encrypt(formData.email),
          password: Encryption.encrypt(formData.password),
        },
      },
      context: {
        headers: {
          access_token: formData.tokenCaptcha,
        },
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev: state) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {loading ? (
          <Loading type="ball" />
        ) : (
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
              <label className="cursor-pointer label text-sm font-semibold text-[#8648C1]">
                <span
                  className="font-sans"
                  onClick={() => {
                    setVisiblePass(!visiblePass);
                  }}
                >
                  See Password
                </span>
              </label>
              {load && (
                <ReCAPTCHA
                  sitekey="6LfV1KomAAAAACDWJoD_5v_IWsITa665j6NGMmXl"
                  onChange={(token: string | null) => {
                    if (token)
                      setData((prev: state) => ({
                        ...prev,
                        recaptchaValid: true,
                        tokenCaptcha: token,
                      }));
                  }}
                  theme="dark"
                />
              )}
              ,
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
        )}
        <button
          type="submit"
          className="btn w-full text-white bg-[#8648C1] mb-2"
          disabled={
            formData.recaptchaValid && formData.email && formData.password
              ? false
              : true
          }
        >
          Log in
        </button>
      </form>
    </>
  );
}
