import { CreateUserInfo } from '@models/signup'
import axios from 'axios'

//회원가입 요청
export const createAccount = async (userData: CreateUserInfo) => {
    try {
        const response = await axios.post(
            'http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/accounts/signup/',
            userData, //{유저아이디, 패스워드}
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        console.error('회원가입 요청 실패:', e)
        throw e
    }
}

export const login = async (userData: CreateUserInfo) => {
    try {
        const response = await axios.post(
            'http://ptday412-alb-1374488828.ap-northeast-2.elb.amazonaws.com/api/accounts/login/',
            userData, //{유저아이디, 패스워드}
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )

        return response.data
    } catch (e) {
        // 에러를 상위로 전달
        console.error('로그인 실패:', e)
        throw e
    }
}
