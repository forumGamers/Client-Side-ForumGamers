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

function handleSteps(page: number): JSX.Element {
  const data = [
    "Input Fullname",
    "Input Username",
    "Input PhoneNumber",
    "Input Email",
    "Input Password",
  ];
  return (
    <ul className="steps">
      {data.map((el: string, idx: number) => {
        const classStep = page >= idx + 1 ? "step step-primary" : "step";
        return (
          <li key={idx} className={classStep}>
            {el}
          </li>
        );
      })}
    </ul>
  );
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

  const handlePage = (page: number): JSX.Element => {
    switch (page) {
      case 1:
        return (
          <div className="body">
            <div className="container artboard artboard-horizontal phone-1">
              <h2>Register your account</h2>
              <label>
                FullName
                <input
                  className="input input-bordered input-accent w-full max-w-xs"
                  type="text"
                  value={input.fullName}
                  onChange={onChangeHandler}
                  name="fullName"
                  required
                />
              </label>
              <div className="btn-group grid grid-cols-2">
                <button onClick={nextPage} className="btn btn-outline">
                  Next
                </button>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="container artboard artboard-horizontal phone-1">
            <label>
              username
              <input
                className="input input-bordered input-accent w-full max-w-xs"
                type="text"
                value={input.username}
                onChange={onChangeHandler}
                name="username"
                required
              />
            </label>
            <div className="btn-group grid grid-cols-2">
              <button onClick={previousPage} className="btn btn-outline">
                Previous
              </button>
              <button onClick={nextPage} className="btn btn-outline">
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="container artboard artboard-horizontal phone-1">
            <label>
              PhoneNumber
              <input
                type="text"
                className="input input-bordered input-accent w-full max-w-xs"
                value={input.phoneNumber}
                onChange={onChangeHandler}
                name="phoneNumber"
                required
              />
            </label>
            <div className="btn-group grid grid-cols-2">
              <button onClick={previousPage} className="btn btn-outline">
                Previous
              </button>
              <button onClick={nextPage} className="btn btn-outline">
                Next
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="container artboard artboard-horizontal phone-1">
            <label>
              email
              <input
                type="text"
                className="input input-bordered input-accent w-full max-w-xs"
                value={input.email}
                onChange={onChangeHandler}
                name="email"
                required
              />
            </label>
            <label>
              Password
              <input
                className="input input-bordered input-accent w-full max-w-xs"
                type="password"
                value={input.password}
                onChange={onChangeHandler}
                name="password"
                required
              />
            </label>
            <div className="btn-group grid grid-cols-2">
              <button onClick={previousPage} className="btn btn-outline">
                Previous
              </button>
              <button onClick={nextPage} className="btn btn-outline">
                Next
              </button>
            </div>
          </div>
        );
      default:
        return (
          <div className="container artboard artboard-horizontal phone-1">
            <form onSubmit={handleSubmit}>
              <label>
                Term and sheet
                <input
                  type="checkbox"
                  className="checkbox checkbox-accent"
                  checked={termsAccepted}
                  onChange={(event) => setTermsAccepted(event.target.checked)}
                />
              </label>
              <div className="btn-group grid grid-cols-2">
                <button type="submit" className="btn btn-outline">
                  Sign Up
                </button>
                <button onClick={previousPage} className="btn btn-outline">
                  previous
                </button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex flex-col w-full lg:flex-row">
        <div className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
          {handleSteps(page)}
        </div>
        <div className="divider lg:divider-horizontal">----------------</div>
        <main className="grid flex-grow h-32 card bg-base-300 rounded-box place-items-center">
          {handlePage(page)}
        </main>
      </div>
    </>
  );
}
