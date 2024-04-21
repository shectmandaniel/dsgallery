"use client";
import { Skeleton } from "~/components/ui/skeleton";

interface ImageProps {
  id: number;
  name: string;
  url: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date | null;
}
export default function FullImage({ image }: { image: ImageProps }) {
  return (
    <img
      src={image.url}
      alt={image.name}
      className="max-h-full max-w-full object-scale-down"
      onLoadStart={() => {
        <Skeleton className="max-h-full max-w-full object-scale-down" />;
      }}
    />
  );
}
