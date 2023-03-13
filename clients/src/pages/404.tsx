import Link from "next/link";
import "@/styles/404.css";
const image =
  "https://ik.imagekit.io/b8ugipzgo/FrontEnd/404.png?updatedAt=1678668766605";

export default function Custom404(): JSX.Element {
  return (
    <div className="container">
      <div className="content">
        <div className="title">Oops!</div>
        <div className="subtitle">
          The page you're looking for doesn't exist.
        </div>
        <Link href="/">
          <p className="btn">Go back home</p>
        </Link>
      </div>
      <div className="image-container">
        <img src={image} alt="404 Not Found" className="image" />
      </div>
    </div>
  );
}
