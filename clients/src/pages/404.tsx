import Link from "next/link";
import "@/styles/404.css";
const image = "../../public/404.png";

export default function Custom404() {
  return (
    <div className="container body">
      <div className="content">
        <div className="title">Oops!</div>
        <div className="subtitle">
          The page you're looking for doesn't exist.
        </div>
        <Link href="/">
          <h6 className="btn">Go back home</h6>
        </Link>
      </div>
      <div className="image-container">
        <img src={image} alt="404 Not Found" className="image" />
      </div>
    </div>
  );
}
