"use client";

import Loading from "@/components/loader";
import Encryption from "@/helper/encryption";
import { swalError } from "@/helper/swal";
import { USERCHANGEFORGETPASS } from "@/queries/user";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

export default function FormSection(): JSX.Element {
  const [pass, setPass] = useState<{
    password: string;
    confirmPassword: string;
  }>({
    password: "",
    confirmPassword: "",
  });

  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const [visibleConfirm, setVisibleConfirm] = useState<boolean>(false);

  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const tokenParams = urlParams.get("token");

    setToken(tokenParams as string);
  }, []);

  const [send, { loading }] = useMutation(USERCHANGEFORGETPASS, {
    onError(error, clientOptions) {
      swalError(error);
    },
  });

  if (loading) return <Loading type="ball" />;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPass((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    await send({
      variables: {
        payload: {
          password: Encryption.encrypt(pass.password),
          confirmPassword: Encryption.encrypt(pass.confirmPassword),
        },
      },
      context: {
        headers: {
          access_token: token,
        },
      },
    });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="login-input-wrapper mb-4">
          <div className="form-control w-full">
            <label htmlFor="password" className="label">
              <span className="label-text text-sm font-semibold text-[#8648C1]">
                Password
              </span>
            </label>
            <input
              className="input input-bordered rounded-xl w-full bg-white"
              type={visiblePass ? "text" : "password"}
              name="password"
              value={pass.password}
              onChange={handleChange}
              required
              placeholder="Input Your Password"
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

            <label htmlFor="confirmPassword" className="label">
              <span className="label-text text-sm font-semibold text-[#8648C1]">
                Confirm Password
              </span>
            </label>
            <input
              className="input input-bordered rounded-xl w-full bg-white"
              type={visiblePass ? "text" : "password"}
              name="confirmPassword"
              value={pass.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Input Confirm Password"
            />
            <label className="label">
              <span className="label-text text-sm font-semibold text-[#8648C1]">
                See Confirm Password
              </span>
            </label>
            <input
              type="checkbox"
              checked={visibleConfirm}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                setVisibleConfirm(e.target.checked);
              }}
            />
          </div>
        </div>
        <button
          type="submit"
          className="btn w-full text-white bg-[#8648C1] mb-2"
        >
          Submit
        </button>
      </form>
    </>
  );
}
