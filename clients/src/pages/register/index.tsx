import { useRouter } from "next/router";
import { useState } from "react";
import "@/styles/pages/register.css";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@/queries/user";
import Loading from "@/components/loading";
import { swalError } from "@/helper/swal";
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
} from "next";
import { CustomSession } from "@/interfaces/tour";
import { getSession } from "next-auth/react";
import ErrorNotification from "@/components/errorNotification";

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    redirect?: Redirect;
    error?: {
      name: string;
      message: string;
      isError: boolean;
    };
  }>
> {
  try {
    const session: CustomSession | null = await getSession(context);

    if (!session || !session?.user)
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    return {
      props: {},
    };
  } catch (err) {
    const error = new Error(err as string);
    return {
      props: {
        error: {
          isError: true,
          message: error.message || "something went wrong",
          name: error.name || "internal server error",
        },
      },
    };
  }
}

export default function RegisterPage({
  error,
}: {
  error: {
    isError: boolean;
    message: string;
    name: string;
  };
}): JSX.Element {
  const handleError = () => {
    window.location.reload();
  };

  if (error && error?.isError)
    return (
      <ErrorNotification
        name={error.name}
        message={error.message}
        onClose={handleError}
      />
    );

  const router = useRouter();
  const [input, setInput] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [page, setPage] = useState(1);

  const [register, { loading }] = useMutation(REGISTER, {
    onError: (error) => {
      swalError(error.message);
      setPage(1);
    },
    onCompleted: (data, clientOptions) => {
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

  const nextPage = () => (page <= 5 ? setPage(page + 1) : swalError("Limit"));

  const previousPage = () =>
    page > 1 ? setPage(page - 1) : swalError("Limit");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { fullName, username, email, password, phoneNumber } = input;

    if (!fullName || !username || !email || !password || !phoneNumber) {
      swalError("Please fill all input");
      return;
    }

    if (!termsAccepted) {
      swalError("Please accept term and sheet");
      return;
    }

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
      <div className="body">
        <div className="container">
          <h2>Register your account</h2>
          <label>
            FullName
            <input
              type="text"
              value={input.fullName}
              onChange={onChangeHandler}
              required
            />
          </label>
          <button onClick={nextPage}>next</button>
        </div>
      </div>
    );
  } else if (page === 2) {
    return (
      <div className="container">
        <label>
          email
          <input
            type="text"
            value={input.email}
            onChange={onChangeHandler}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={input.password}
            onChange={onChangeHandler}
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
            value={input.username}
            onChange={onChangeHandler}
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
            value={input.phoneNumber}
            onChange={onChangeHandler}
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
