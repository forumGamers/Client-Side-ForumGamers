import "@/styles/404.css";
const image =
  "https://ik.imagekit.io/b8ugipzgo/FrontEnd/404.png?updatedAt=1678668766605";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useRouter } from "next/router";

export default function Custom404(): JSX.Element {
  const router = useRouter();
  return (
    <div className="container">
      <div className="content">
        <div className="title">Oops!</div>
        <div className="subtitle">
          The page you're looking for doesn't exist.
        </div>
        <p onClick={() => router.back()} className="btn">
          Go back
        </p>
      </div>
      <div className="image-container">
        <LazyLoadImage
          src={image}
          alt="404 Not Found"
          className="image"
          placeholderSrc="https://ik.imagekit.io/b8ugipzgo/FrontEnd/404.png?updatedAt=1678668766605"
        />
      </div>
    </div>
  );
}
