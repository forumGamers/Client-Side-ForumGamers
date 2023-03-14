import { useRouter } from "next/router";
import { useState } from "react";
import "@/styles/pages/register.css";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/queries/user";
import Loading from "@/components/loading";
import { swalError } from "@/helper/swal";

export function getStaticProps() {
  const { auth } = require("../../constant/index");

  return {
    props: {
      access: auth,
    },
  };
}

export default function RegisterPage({
  access,
}: {
  access: string;
}): JSX.Element {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [page, setPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [register, { data }] = useMutation(REGISTER, {
    onError: (error) => {
      setErrorMsg(error.name);
      swalError(errorMsg);
      setPage(1);
    },
    onCompleted(data, clientOptions) {
      router.push("/");
    },
  });

  const nextPage = () => (page <= 5 ? setPage(page + 1) : setErrorMsg("Limit"));

  const previousPage = () =>
    page <= 1 ? setPage(page - 1) : setErrorMsg("Limit");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = JSON.stringify({
      fullName,
      username,
      email,
      password,
      phoneNumber,
    });

    const resp = await fetch("/api/encrypt", {
      method: "post",
      body: payload,
      headers: {
        "Content-Type": "application/json",
        access,
      },
    });

    const data = await resp.json();

    await register({
      variables: {
        fn: data.fullName,
        un: data.username,
        e: data.email,
        p: data.password,
        pn: data.phoneNumber,
      },
    });

    setLoading(false);
  };

  if (loading) return <Loading />;

  if (page === 1) {
    return (
      <div className="container">
        <h2>Register your account</h2>
        <label>
          Nama lengkap
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            required
          />
        </label>
        <button onClick={nextPage}>next</button>
      </div>
    );
  } else if (page === 2) {
    return (
      <div className="container">
        <label>
          email
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button onClick={nextPage}>next</button>
        <button onClick={previousPage}>previous</button>
      </div>
    );
  } else if (page === 3) {
    return (
      <div className="container">
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </label>
        <button onClick={nextPage}>next</button>
        <button onClick={previousPage}>previous</button>
      </div>
    );
  } else if (page === 4) {
    return (
      <div className="container">
        <label>
          PhoneNumber
          <input
            type="text"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
            required
          />
        </label>
        <button onClick={nextPage}>next</button>
        <button onClick={previousPage}>previous</button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <form onSubmit={handleSubmit}>
          <label>
            Term and sheet
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(event) => setTermsAccepted(event.target.checked)}
            />
          </label>
          <button type="submit">Daftar</button>
          <button onClick={previousPage}>previous</button>
        </form>
      </div>
    );
  }
}
