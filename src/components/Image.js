// components/Image/index.tsx

import React, { useCallback, useEffect, useState } from "react";

// interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
//   placeholderImg?: string;
//   errorImg?: string;
// }

const Image = ({ src, placeholderImg, errorImg, ...props }) => {
  const [imgSrc, setSrc] = useState(placeholderImg || src);

  const onLoad = useCallback(() => {
    setSrc(src);
  }, [src]);

  const onError = useCallback(() => {
    setSrc(errorImg || placeholderImg);
  }, [errorImg, placeholderImg]);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [src, onLoad, onError]);

  return <img {...props} alt={imgSrc} src={imgSrc} />;
};

export default Image
