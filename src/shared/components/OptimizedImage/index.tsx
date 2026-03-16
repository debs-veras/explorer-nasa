import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import notFoundImg from "../../assets/not_found.png";
import LoadingImg from "../LoadingImg";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-video",
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden ${aspectRatio} ${className}`}>
      {/* Skeleton / Loading State */}
      <AnimatePresence>
        {isLoading && !hasError && <LoadingImg />}
      </AnimatePresence>

      <motion.img
        src={hasError ? notFoundImg : src}
        alt={alt}
        loading="lazy"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        className={`w-full h-full object-cover ${className}`}
      />
    </div>
  );
}
