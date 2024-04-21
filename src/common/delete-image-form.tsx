"use client";
import { useFormState } from "react-dom";
import { deleteImage } from "~/server/db/queries";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleteImageForm({ id }: { id: string }) {
  const router = useRouter();
  const imageId = parseInt(id, 10);
  if (isNaN(imageId)) throw new Error("Invalid ID");

  const [formState, formStateAction] = useFormState(
    deleteImage.bind(null, imageId),
    {
      errors: {},
      success: false,
    },
  );

  useEffect(() => {
    if (formState.success) {
      router.push("/");
    }
  }, [formState.success]);

  return (
    <form action={formStateAction}>
      <Button type="submit" variant="destructive">
        Delete
      </Button>
      {formState.errors?._form ? (
        <div className="text-red-500">{formState.errors._form.join(", ")}</div>
      ) : null}
    </form>
  );
}
