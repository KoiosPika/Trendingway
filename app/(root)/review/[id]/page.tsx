import ReviewPage from '@/components/shared/ReviewPage'
import { auth } from '@clerk/nextjs/server';


const page = ({ params: { id } }: { params: { id: string } }) => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <ReviewPage id={id} userId={userId} />
    )
}

export default page