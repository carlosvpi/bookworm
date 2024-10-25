import Link from 'next/link'
import { getUserFriends } from '../../../actions/auth'

export default async function User({ params }: { params: { userId: string} }) {
  const { userId } = await params;
  const user = await getUserFriends(+userId)
  return (
    <>
      <h3>User {user?.name ?? 'no name'} ({`${userId}`})</h3>
      <h5>Friends</h5>
      <ul>
        {user?.friends.map(friend => {
          return <Link key={friend.id} href={`users/{friend.id}`}>{friend.name ?? 'No name'}</Link>
        })}
      </ul>
    </>
  );
}
