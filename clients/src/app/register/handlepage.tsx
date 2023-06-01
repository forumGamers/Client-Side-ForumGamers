"use client";

export default function HandlePage({
  page,
  input,
  termsAccepted,
  onChangeHandler,
  termSheetHandler,
  nextPage,
  previousPage,
  handleSubmit,
}: {
  page: number;
  input: {
    fullName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber: string;
  };
  termsAccepted: boolean;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  termSheetHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  nextPage: () => void;
  previousPage: () => void;
  handleSubmit: (event: React.FormEvent) => void;
}): JSX.Element {
  switch (page) {
    case 1:
      return (
        <div className="bg-cover bg-no-repeat bg-white_A700 flex flex-col font-inter h-[1024px] items-center justify-start mx-auto pb-[171px] w-full">
          <div className="container bg-pink_900_4c border-[3px] border-solid border-white_A700 flex flex-col justify-start max-w-[868px] mx-auto p-[70px] md:px-5 rounded-[50px] w-full">
            <div className="bg-pink_900_4c border-[3px] border-solid border-white_A700 flex flex-col justify-start max-w-[868px] mx-auto p-[70px] md:px-5 rounded-[50px] w-full">
              <h1 className="md:ml-[0] ml-[147px] text-center text-white_A700 w-auto">
                Register your account
              </h1>
              <label className="md:ml-[0] ml-[21px] mt-[159px] text-center text-white_A700 w-auto">
                FullName
                <input
                  className="bg-white_A700 border-[3px] border-pink_900 border-solid h-[94px] rounded-[20px] w-full"
                  type="text"
                  value={input.fullName}
                  onChange={onChangeHandler}
                  name="fullName"
                  required
                />
              </label>
            </div>
            <div className="btn-group grid grid-cols-2">
              <button
                onClick={nextPage}
                className="bg-pink_900 h-20 rounded-[30px] w-full"
              >
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
                onChange={termSheetHandler}
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
}
