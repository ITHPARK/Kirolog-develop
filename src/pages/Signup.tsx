import UserTextForm from '@components/signup/UserTextForm'
import UserAgreeForm from '@components/signup/UserAgreeForm'

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
