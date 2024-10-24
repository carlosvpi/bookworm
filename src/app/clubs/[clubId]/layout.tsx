import type { Metadata } from "next";
import "../../globals.css";

export const metadata: Metadata = {
  title: "Club",
  description: "This is a book club",
};

export default async function ClubLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: { clubId: string }
}>) {
  const { clubId } = await params;
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <h1>Club {`${clubId}`}</h1>
        <hr></hr>
        {children}
      </body>
    </html>
  );
}
