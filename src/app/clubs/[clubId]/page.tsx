export default async function Club({ params }: { params: { clubId: string} }) {
  const { clubId } = await params;
  return (
    <>
      <h3>Club {`${clubId}`}</h3>
    </>
  );
}
