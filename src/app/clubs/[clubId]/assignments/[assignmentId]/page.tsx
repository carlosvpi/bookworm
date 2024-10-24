export default async function Club({ params }: { params: { clubId: string, assignmentId: string} }) {
  const { clubId, assignmentId } = await params;
  return (
    <>
      <h3>Club {`${clubId}`}, assignment {`${assignmentId}`}</h3>
    </>
  );
}
