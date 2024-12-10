import UserTextForm from '@components/signup/UserTextForm'

const Signup = () => {
    const handleSubmit = (signupValues: any) => {
        console.log(signupValues)
    }

    return (
        <div>
            <UserTextForm onSubmit={handleSubmit} />
        </div>
    )
}

export default Signup
