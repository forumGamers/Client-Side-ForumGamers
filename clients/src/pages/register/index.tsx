import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import "@/styles/pages/register.css";
import "/dist/output.css";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/queries/user";
import Loading from "@/components/loading";
import { swalError } from "@/helper/swal";

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [page, setPage] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("access_token") || null;

    if (user) router.replace("/");
  }, [router]);

  const [register, { loading }] = useMutation(REGISTER, {
    onError: (error) => {
      setErrorMsg(error.message);
      swalError(errorMsg);
      setPage(1);
    },
    onCompleted(data, clientOptions) {
      router.push("/login");
    },
  });

  const nextPage = () => (page <= 5 ? setPage(page + 1) : setErrorMsg("Limit"));

  const previousPage = () =>
    page > 1 ? setPage(page - 1) : setErrorMsg("Limit");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await register({
      variables: {
        register: {
          fullName,
          username,
          email,
          password,
          phoneNumber,
        },
      },
    });
  };

  if (loading) return <Loading />;

  if (page === 1) {
    return (
      <div className="body mx-auto px-4 lg:px-8 py-20 w-full">
        <div className="wrapper">
          <h2>Register your account</h2>
          <label>
            {errorMsg ? (
              <div className="errorMsg">{errorMsg}</div>
            ) : (
              <div></div>
            )}
            FullName
            <input
              type="text"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </label>
          <button onClick={nextPage}>next</button>
        </div>
      </div>
    );
  } else if (page === 2) {
    return (
      <div className="body mx-auto px-4 lg:px-8 py-20">
        <label>
          {errorMsg ? <div className="errorMsg">{errorMsg}</div> : <div></div>}
          email
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          {errorMsg ? <div className="errorMsg">{errorMsg}</div> : <div></div>}
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
          {errorMsg ? <div className="errorMsg">{errorMsg}</div> : <div></div>}
          username
          <input
            type="text"
            value={username}
            onChange={(event) => setUserName(event.target.value)}
            required
          />
        </label>
        <button className="btn btn-active" onClick={nextPage}>next</button>
        <button onClick={previousPage}>previous</button>
      </div>
    );
  } else if (page === 4) {
    return (
      <div className="container">
        <label>
          {errorMsg ? <div className="errorMsg">{errorMsg}</div> : <div></div>}
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
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <label>
            {errorMsg ? (
              <div className="errorMsg">{errorMsg}</div>
            ) : (
              <div></div>
            )}
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
