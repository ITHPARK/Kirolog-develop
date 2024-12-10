import { useState } from 'react'
import UserTextForm from '@components/signup/UserTextForm'
import Topbar from '@shared/Topbar'
import { useNavigate } from 'react-router-dom'
import { CreateUserProps } from '@models/signup'
import axios from 'axios'

const Signup = () => {
    const [first, setfirst] = useState({
        username: 'ithpark',
        password: 'test1!',
    })

    const handleSubmit = (signupValues: CreateUserProps) => {
        console.log(signupValues)
    }

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/')
    }

    const createAccount = async () => {
        try {
            const response = axios.post('')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <Topbar
                title="회원가입"
                right="홈으로"
                rightOnClick={handleClick}
            />
            <UserTextForm onSubmit={handleSubmit} />
            <button>버튼</button>
        </div>
    )
}

export default Signup
