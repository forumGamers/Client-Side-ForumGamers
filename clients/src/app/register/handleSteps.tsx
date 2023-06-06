"use client";

export default function HandleSteps({ page }: { page: number }): JSX.Element {
  const data = [
    "Input Fullname",
    "Input Username",
    "Input PhoneNumber",
    "Input Email",
    "Submit",
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
