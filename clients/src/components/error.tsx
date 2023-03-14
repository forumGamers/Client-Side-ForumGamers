import { useRouter } from "next/router";

export default function ErrorPage({
  message,
  url = "/",
}: {
  message: string;
  url?: string;
}) {
  const router = useRouter();
  return (
    <div className="container">
      <h1 className="title">error</h1>
      <h2 className="message">{message}</h2>
      <button onClick={() => router.push(url)} className="btn">
        Go back
      </button>
    </div>
  );
}
