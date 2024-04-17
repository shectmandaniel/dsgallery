import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import { getMyImages } from "~/server/db/queeries";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {images.map((image) => (
        <div key={image.id} className="size-48">
          <Image
            src={image.url}
            alt={image.name}
            width={192}
            height={192}
            className="size-full object-cover rounded-md"
          />
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full p-3 text-center text-2xl">
          Please Sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
      </SignedIn>
    </main>
  );
}
