import "@/styles/components/loading.css";

export default function Loading({
  type,
}: {
  type?: "ball" | "pulse" | "pulsating" | "bar" | "spinner";
}): JSX.Element {
  switch (type) {
    case "ball":
      return (
        <div className="loading bg">
          <div className="loading-ball"></div>
        </div>
      );
    case "spinner":
      return (
        <div className="loading bg">
          <div className="spinner"></div>
        </div>
      );
    case "bar":
      return (
        <div className="loading bg">
          <div className="bar"></div>
        </div>
      );
    case "pulsating":
      return (
        <div className="loading bg">
          <div className="pulsating-circle"></div>
        </div>
      );
    case "pulse":
      return (
        <div className="loading bg">
          <div className="pulse"></div>
        </div>
      );
    default:
      return (
        <div className="loading bg">
          <div className="spinner"></div>
        </div>
      );
  }
}
