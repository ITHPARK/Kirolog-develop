import { CreateUserInfo } from '@models/signup'
import axios from 'axios'

export const createAccount = async (userData: CreateUserInfo) => {
    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/accounts/signup/',
            userData, //{username: , password: }
            {
                headers: {
                    //api키 추가
                    Authorization: `Bearer ${process.env.REACT_APP_LOCAL_SECRET_KEY}`,
                },
            },
        )
        console.log(response.data)
    } catch (e) {
        console.log(e)
    }
}
