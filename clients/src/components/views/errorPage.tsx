"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}): JSX.Element {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <h6>{error.message}</h6>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
