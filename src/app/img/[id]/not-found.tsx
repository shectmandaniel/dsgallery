import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
    return (
      <main className="flex h-full flex-col items-center justify-center gap-2">
        <h2 className="text-xl font-semibold">404 Image Not Found</h2>
        <p>Could not find the requested image.</p>
        <Link
          href="/"
          
        >
            <Button variant='secondary'>Go Back</Button>
        </Link>
      </main>
    );
  }