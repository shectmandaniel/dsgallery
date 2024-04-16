import Link from "next/link";

const mockUrls = [
  "https://utfs.io/f/6508602f-892d-4206-84b5-78d573c29fb4-5zhmuc.jpg",
  "https://utfs.io/f/a88ca50c-697d-4ce3-a53e-844281f90d57-h6wfou.jpg",
  "https://utfs.io/f/32d90919-9e92-40c6-afe7-732ca51b05fa-qmavai.jpg",
  "https://utfs.io/f/1cfe20a7-34a4-4472-9099-80f4a2b7de2d-1zqpms.jpg",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));
export default function HomePage() {
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {mockImages.map((image) => (
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
