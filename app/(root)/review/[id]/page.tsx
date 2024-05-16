import ReviewPage from '@/components/shared/ReviewPage'


const page = ({ params: { id } }: { params: { id: string } }) => {

    return (
        <ReviewPage id={id} />
    )
}

export default page