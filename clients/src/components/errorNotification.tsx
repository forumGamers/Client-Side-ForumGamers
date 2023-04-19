import "@/styles/components/errorNotification.css";

export default function ErrorNotification({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}): JSX.Element {
  return (
    <div className="notification">
      <div className="message">{message}</div>
      <button className="close-button" onClick={onClose}>
        X
      </button>
    </div>
  );
}
