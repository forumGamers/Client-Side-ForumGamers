import { NextApiResponse } from "next";

export function getInitialProps({
  res,
  err,
}: {
  res: NextApiResponse;
  err?: Error & { statusCode?: number };
}) {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
}

export default function Error({
  statusCode,
}: {
  statusCode: number;
}): JSX.Element {
  return (
    <>
      <h1>Error {statusCode}</h1>
      <p>Oops! Something went wrong.</p>
    </>
  );
}
