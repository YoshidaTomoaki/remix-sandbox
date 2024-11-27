"use client";

import { useState } from "react";

interface CircularAvatarProps {
  src: string;
  name: string;
  size?: number;
}

export default function CircularAvatar({
  src,
  name,
  size = 64,
}: CircularAvatarProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative rounded-full overflow-hidden"
        style={{ width: size, height: size }}
      >
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        {!hasError ? (
          <img
            src={src}
            alt={name}
            width={size}
            height={size}
            className={`rounded-full ${isLoading ? "invisible" : "visible"}`}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600 font-semibold text-xl">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <p className="mt-2 text-center font-medium">{name}</p>
    </div>
  );
}
