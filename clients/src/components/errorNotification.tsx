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
    <div className="notification">
      <h1>{name || "Error"}</h1>
      <div className="message">{message}</div>
      <button className="close-button" onClick={onClose}>
        X
      </button>
    </div>
  );
}
