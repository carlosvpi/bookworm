import { getUser } from '../../../lib/db'
import { Button } from '../../../components/button'
import { Clubs } from '../../../components/clubs'
import { gotoNewClub } from '../../../actions/club'

export default async function User({ params }: { params: { userId: string} }) {
  const { userId } = await params;
  const currentUser = await getUser(+userId)

  if (!currentUser) return <p>You should not be here</p>

  return (
    <>
      <h3>User {currentUser?.name ?? 'no name'} ({`${userId}`})</h3>
      <Clubs
        currentUserId={currentUser.id}
        creatorClubs={currentUser.clubs.creator}
        adminClubs={currentUser.clubs.admin}
        memberClubs={currentUser.clubs.member}
      ></Clubs>
      <Button onClick={gotoNewClub}>Create a club</Button>
    </>
  );
}
