import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {

  const images = await db.query.images.findMany({
    orderBy: (model, {desc}) => desc(model.id),
  });

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        
        {images.map((image) => (
          <div
            key={image.id}
            className="h-auto w-48"
          >
            <img
              src={image.url}
              alt="mock"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </main>
  );
}
