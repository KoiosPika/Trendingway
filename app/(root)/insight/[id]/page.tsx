import InsightPage from '@/components/shared/InsightPage'
import { auth } from '@clerk/nextjs/server';


const page = ({ params: { id } }: { params: { id: string } }) => {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string;

    return (
        <InsightPage id={id} userId={userId} />
    )
}

export default page