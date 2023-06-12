"use client";

import Encryption from "@/helper/encryption";
import { swalError } from "@/helper/swal";
import { USERRESETPASSWORD } from "@/queries/user";
import { useMutation } from "@apollo/client";
import { useState } from "react";

export default function FormSection(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [send] = useMutation(USERRESETPASSWORD, {
    onError(error, clientOptions) {
      swalError(error);
    },
  });

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    await send({
      variables: {
        email: Encryption.encrypt(email),
      },
    });
  };
  return (
    <>
      <form onSubmit={onSubmit}>
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
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value } = e.target;
              setEmail(value);
            }}
            required
            placeholder="Please Input Your Email"
          />
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
