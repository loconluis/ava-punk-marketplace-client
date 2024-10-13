import { Suspense } from "react";
import Loader from "./Loader";

interface ImageProps {
  srcImg: string;
  alt: string;
  isActive?: boolean;
}

const Image = (props: ImageProps) => {
  return (
    <Suspense fallback={<Loader size={8} />}>
      <img className="h-80" src={props.srcImg} alt={props.alt || "Image"} />
    </Suspense>
  );
};

export default Image;
