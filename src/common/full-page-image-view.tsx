import { clerkClient } from "@clerk/nextjs/server";
import { deleteImage, getImageById } from "~/server/db/queries";
import { Button } from "~/components/ui/button";
import FullImage from "./full-img";
import { notFound } from "next/navigation";

export async function FullPageImageView(props: { photoId: string }) {
  const image = await getImageById(props.photoId);

  if (!image) {
    notFound();
  }

  const userInfo = await clerkClient.users.getUser(image.userId);

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  return (
    <div className="flex h-screen w-screen min-w-0 items-center justify-center overflow-hidden text-white">
      <div className="flex h-full w-full flex-shrink flex-grow items-center justify-center">
        <FullImage image={image} />
      </div>
      <div className="flex h-full w-56 flex-shrink-0 flex-col border-l text-center">
        <div className="border-b p-2 text-xl">{image.name}</div>

        <div className="p-2">
          <div>Uploaded By:</div>
          <div>{userInfo.username ?? "Unknown"}</div>
        </div>

        <div className="p-2">
          <div>Uploaded At:</div>
          <div>
            {image.createdAt.toLocaleDateString("en-US", options as any)}
          </div>
        </div>

        <div className="p-2">
          <form
            action={async () => {
              "use server";
              await deleteImage(image.id);
            }}
          >
            <Button type="submit" variant="destructive">
              Delete
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
