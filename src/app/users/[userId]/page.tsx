export default async function User({ params }: { params: { userId: string} }) {
  const { userId } = await params;
  return (
    <>
      <h3>User {`${userId}`}</h3>
    </>
  );
}
