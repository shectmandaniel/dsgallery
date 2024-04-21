'use client'
import Error from "next/error";

export default function GlobalError(props: { error: any }) {
  return (
    <html>
      <body>
        <Error statusCode={props.error.status} title="Error" />
      </body>
    </html>
  );
}
