import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assignment",
  description: "This is an assignment",
};

export default function ClubLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <h3>Assignment</h3>
      <hr />
      {children}
    </>
  );
}
