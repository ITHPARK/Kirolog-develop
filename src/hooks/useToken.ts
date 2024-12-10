import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const useToken = () => {
    const navigate = useNavigate()

    const getToken = async (certifiCode: string) => {
        const response = await axios.post(
            'https://kauth.kakao.com/oauth/token',
            {
                //쿼리스트링을 집어넣어준다.
                grant_type: 'authorization_code',
                client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
                redirect_uri: process.env.REACT_APP_REDIRECT_URI,
                code: certifiCode,
            },
            {
                headers: {
                    'Content-type':
                        'application/x-www-form-urlencoded;charset=utf-8',
                },
            },
        )

        localStorage.setItem('accessToken', response.data.access_token)
        navigate('/')
    }

    return getToken
}

export default useToken
