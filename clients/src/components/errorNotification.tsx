import "@/styles/components/errorNotification.css";

export default function ErrorNotification({
  name,
  message,
  onClose,
}: {
  name?: string;
  message: string;
  onClose: () => void;
}): JSX.Element {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-actions justify-end">
          <button className="btn btn-square btn-sm" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h1>{name || "Error"}</h1>
        <p>{message}</p>
      </div>
    </div>
  );
}
