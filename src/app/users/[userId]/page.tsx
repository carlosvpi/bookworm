import { getUserFriends, getUsers } from '../../../lib/db'
import { Friends } from '../../../components/friends'

export default async function User({ params }: { params: { userId: string} }) {
  const { userId } = await params;
  const currentUser = await getUserFriends(+userId)

  if (!currentUser) return <p>You should not be here</p>

  const users = (await getUsers()).filter(user => user.id !== currentUser.id)

  if (!currentUser) {
    return <h3>No user</h3>
  }

  return (
    <>
      <h3>User {currentUser?.name ?? 'no name'} ({`${userId}`})</h3>
      <h5>Friends</h5>
      <Friends users={users.map(({ id, name }) => ({ id, name }))} currentUser={{ id: currentUser.id, friends: currentUser.friends.map(({ id }) => id) }}></Friends>
    </>
  );
}
