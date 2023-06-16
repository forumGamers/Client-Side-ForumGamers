"use client";

import HandleSteps from "./handleSteps";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/queries/user";
import { swalError } from "@/helper/swal";
import { useState } from "react";
import Encryption from "@/helper/encryption";
import HandlePage from "./handlepage";
import Loading from "@/components/loader";
import { useRouter } from "next/navigation";

export default function Wrapper(): JSX.Element {
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [visiblePass, setVisiblePass] = useState<boolean>(false);
  const router = useRouter();
  const [register, { loading }] = useMutation(REGISTER, {
    onError: (error) => {
      swalError(error.message);
      setPage(1);
    },
    onCompleted: () => {
      router.push("/login");
    },
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });
  };

  const setVisiblePassHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setVisiblePass(e.target.checked);
  };

  if (loading) return <Loading type="ball" />;

  const termSheetHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTermsAccepted(event.target.checked);

  const nextPage = () => (page <= 5 ? setPage(page + 1) : swalError("Limit"));

  const previousPage = () =>
    page > 1 ? setPage(page - 1) : swalError("Limit");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, username, email, password, phoneNumber } = input;

    if (!fullName) {
      swalError("please fill fullname");
      setPage(1);
      return;
    }

    if (!username) {
      swalError("please fill username");
      setPage(2);
      return;
    }

    if (!phoneNumber) {
      swalError("please fill phoneNumber");
      setPage(3);
      return;
    }

    if (!email) {
      swalError("please fill email");
      setPage(4);
      return;
    }

    if (!password) {
      swalError("please fill password");
      setPage(4);
      return;
    }

    if (!termsAccepted) {
      swalError("Please accept term and sheet");
      return;
    }

    await register({
      variables: {
        register: {
          fullName: Encryption.encrypt(fullName),
          username: Encryption.encrypt(username),
          email: Encryption.encrypt(email),
          password: Encryption.encrypt(password),
          phoneNumber: Encryption.encrypt(phoneNumber),
        },
      },
    });
  };
  return (
    <>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
          <HandleSteps page={page} />
        </div>
        <div className="divider lg:divider-horizontal">----------------</div>
        <main className="body grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
          <HandlePage
            page={page}
            input={input}
            visiblePass={visiblePass}
            termsAccepted={termsAccepted}
            onChangeHandler={onChangeHandler}
            termSheetHandler={termSheetHandler}
            nextPage={nextPage}
            previousPage={previousPage}
            handleSubmit={handleSubmit}
            setVisiblePass={setVisiblePassHandler}
          />
        </main>
      </div>
    </>
  );
}
