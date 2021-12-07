//https://stackoverflow.com/questions/34097560/react-js-replace-img-src-onerror
import React, { ImgHTMLAttributes, useState } from "react";

interface Props extends ImgHTMLAttributes<any> {
  fallback: string;
}

export default function ImageWithFallback({ fallback, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const onError = () => setImgSrc(fallback);

  return <img src={imgSrc ? imgSrc : fallback} onError={onError} {...props} />;
}
