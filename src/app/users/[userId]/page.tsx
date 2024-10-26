import { getUser } from '../../../lib/db'
import { Friends } from '../../../components/friends'
import { Clubs } from '../../../components/clubs'

export default async function User({ params }: { params: { userId: string} }) {
  const { userId } = await params;
  const currentUser = await getUser(+userId)

  if (!currentUser) return <p>You should not be here</p>

  return (
    <>
      <h3>User {currentUser?.name ?? 'no name'} ({`${userId}`})</h3>
      <h5>Friends</h5>
      <Friends currentUserId={currentUser.id} friends={currentUser.friends}></Friends>
      <Clubs currentUserId={currentUser.id} friends={currentUser.friends}></Clubs>
    </>
  );
}
