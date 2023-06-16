"use client";
import { useState } from "react";
import Loading from "@/components/loading2";

export default function HandlePage({
  page,
  input,
  termsAccepted,
  visiblePass,
  onChangeHandler,
  termSheetHandler,
  nextPage,
  previousPage,
  handleSubmit,
  setVisiblePass,
}: {
  page: number;
  input: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
  };
  visiblePass: boolean;
  termsAccepted: boolean;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  termSheetHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nextPage: () => void;
  previousPage: () => void;
  handleSubmit: (event: React.FormEvent) => void;
  setVisiblePass: (event: React.ChangeEvent<HTMLInputElement>) => void;
}): JSX.Element {
  switch (page) {
    case 1:
      return (
        <div className="body d-flex justify-content-center align-items-center">
          <div className="wrapper-register">
            <div className="card border-2 border-white p-14 w-[35%] h-[50vh]">
              <h2 className="text-3xl font-semibold text-white text-center mb-16">
                Register Your Account
              </h2>
              <label className="mb-2">
                <h2 className="text-white text-sm font-semibold mb-1">
                  FullName
                </h2>
                <input
                  placeholder="Your Full Name"
                  className="input input-primary input-bordered rounded-xl w-full bg-white"
                  type="text"
                  value={input.fullName}
                  onChange={onChangeHandler}
                  name="fullName"
                  required
                />
              </label>

              <button
                onClick={nextPage}
                className="btn w-full text-white bg-[#8648C1]"
              >
              </button>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="body d-flex justify-content-center align-items-center">
          <div className="wrapper-register">
            <div className="card border-2 border-white p-14 w-[35%] h-[50vh]">
              <h2 className="text-3xl font-semibold text-white text-center mb-16">
                Register Your Account
              </h2>
              <label className="mb-2">
                <h2 className="text-white text-sm font-semibold mb-1">
                  Username
                </h2>
                <input
                  placeholder="Create Your Username"
                  className="input input-primary input-bordered rounded-xl w-full bg-white"
                  type="text"
                  value={input.username}
                  onChange={onChangeHandler}
                  name="username"
                  required
                />
              </label>
              <div className="btn-group grid grid-cols-2 gap-2">
                <button
                  onClick={previousPage}
                  className="btn btn-outline border-white text-white"
                >
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  className="btn text-white bg-[#8648C1]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="body d-flex justify-content-center align-items-center">
          <div className="wrapper-register">
            <div className="card border-2 border-white p-14 w-[35%] h-[50vh]">
              <h2 className="text-3xl font-semibold text-white text-center mb-16">
                Register Your Account
              </h2>
              <label className="mb-2">
                <h2 className="text-white text-sm font-semibold mb-1">
                  Phone Number
                </h2>
                <input
                  type="text"
                  placeholder="Your Phone Number"
                  className="input input-primary input-bordered rounded-xl w-full bg-white"
                  value={input.phoneNumber}
                  onChange={onChangeHandler}
                  name="phoneNumber"
                  required
                />
              </label>
              <div className="btn-group grid grid-cols-2 gap-2">
                <button
                  onClick={previousPage}
                  className="btn btn-outline border-white text-white"
                >
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  className="btn text-white bg-[#8648C1]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="body d-flex justify-content-center align-items-center">
          <div className="wrapper-register">
            <div className="card border-2 border-white p-14 w-[35%] h-[60vh]">
              <h2 className="text-3xl font-semibold text-white text-center mb-5">
                Register Your Account
              </h2>
              <label className="mb-2">
                <h2 className="text-white text-sm font-semibold mb-1">Email</h2>
                <input
                  placeholder="Input Your Email"
                  type="text"
                  className="input input-primary input-bordered w-full"
                  value={input.email}
                  onChange={onChangeHandler}
                  name="email"
                  required
                />
              </label>
              <label className="mb-2">
                <h2 className="text-white text-sm font-semibold mb-1">
                  Password
                </h2>
                <input
                  placeholder="Create Your Password"
                  className="input input-primary input-bordered w-full"
                  type={visiblePass ? "text" : "password"}
                  value={input.password}
                  onChange={onChangeHandler}
                  name="password"
                  required
                />
              </label>
              <label className="cursor-pointer label label-text text-sm font-semibold text-white">
                <span className="font-sans">See Password</span>
                <input
                type="checkbox"
                checked={visiblePass}
                style={{ display: 'none' }}
                onChange={setVisiblePass}
              />
              </label>
              <div className="btn-group grid grid-cols-2 gap-2">
                <button
                  onClick={previousPage}
                  className="btn btn-outline border-white text-white"
                >
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  className="btn text-white bg-[#8648C1]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      return (
        <div className="body d-flex justify-content-center align-items-center">
          <div className="wrapper-register">
            <div className="card border-2 border-white p-14 w-[35%] h-[40vh]">
              <h2 className="text-3xl font-semibold text-white text-center mb-10">
                Register Your Account
              </h2>
              <form onSubmit={handleSubmit}>
                <label className="cursor-pointer label text-white">
                  Term and Condition
                  <input
                    type="checkbox"
                    className="checkbox checkbox-success"
                    checked={termsAccepted}
                    onChange={termSheetHandler}
                  />
                </label>
                <div className="btn-group grid grid-cols-2 gap-2 mt-2">
                  <button
                    onClick={previousPage}
                    className="btn btn-outline border-white text-white"
                  >
                    Previous
                  </button>
                  <button type="submit" className="btn text-white bg-[#8648C1]">
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
  }
}
