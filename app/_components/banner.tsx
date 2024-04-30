import Image from "next/image";
import { cn } from "../_lib/utils";

type BannerProps = {
  imgUrl: string;
  title?: string;
  alt?: string;
  className?: string;
};

const Banner = ({ imgUrl, title, alt, className }: BannerProps) => {
  return (
    <Image
      src={imgUrl}
      alt={alt || "Banner Promocional"}
      objectFit="cover"
      width={0}
      height={0}
      sizes="100dvh"
      quality={100}
      className={cn("relative mt-5 h-auto w-full antialiased", className)}
    />
  );
};

export default Banner;
