import { CreateUserInfo } from '@models/signup'
import axios from 'axios'

export const createAccount = async (userData: CreateUserInfo) => {
    try {
        const response = await axios.post(
            'http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com//api/accounts/signup/',
            userData, //{유저아이디, 패스워드}
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        console.log(response.data)
    } catch (e) {
        console.log(e)
    }
}
