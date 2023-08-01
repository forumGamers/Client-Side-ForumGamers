"use client";

import Link from "next/link";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { useState, useEffect } from "react";
import { swalError } from "@/helper/swal";
import ReCAPTCHA from "react-google-recaptcha";
import Loading from "@/components/loader";

type state = {
  email: string;
  password: string;
  recaptchaValid: boolean;
  tokenCaptcha: string;
};

export default function LoginForm(): JSX.Element {
  const { pending } = useFormStatus();

  const [load, setLoad] = useState<boolean>(false);
  const [data, setData] = useState<state>({
    email: "",
    password: "",
    recaptchaValid: false,
    tokenCaptcha: "",
  });
  const [visiblePass, setVisiblePass] = useState<boolean>(false);

  useEffect(() => {
    setLoad(true);

    const queryParams = window.location.search;

    const query = new URLSearchParams(queryParams);

    const error = query.get("error");

    if (error) {
      swalError(error);

      query.delete("error");

      const url = window.location.pathname;

      window.history.replaceState({}, "", url);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev: state) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      {pending ? (
        <Loading type="ball" />
      ) : (
        <>
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
                value={data.email}
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
                value={data.password}
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
            disabled={
              data.recaptchaValid && data.email && data.password ? false : true
            }
          >
            Log in
          </button>
        </>
      )}
    </>
  );
}
