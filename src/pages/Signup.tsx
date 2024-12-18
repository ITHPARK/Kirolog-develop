import Close from '@shared/ico/Close'
import { CreateUserInfo } from '@models/user'
import Topbar from '@shared/Topbar'
import UserTextForm from '@components/signup/UserTextForm'
import axios from 'axios'
import { createAccount } from '@remote/user'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getCookie } from '@utils/cookieController'

const Signup = () => {
    const navigate = useNavigate()

    //로그인이 된 상태라면 메인페이지로 리다이렉트
    useEffect(() => {
        if (getCookie('accessToken') != null) {
            navigate('/')
        }
    }, [])

    //리액트 쿼리 useMutation 설정
    const mutate = useMutation({
        mutationFn: async (data: CreateUserInfo) => {
            await createAccount(data)
        },
        onSuccess: () => {
            alert('회원가입이 완료되었습니다.')
            navigate('/signin')
            // data: mutationFn이 반환한 데이터
            // variables: mutation에 전달된 변수
            // context: mutation 호출 전 onMutate에서 반환된 값
        },
        onError: (error) => {
            // AxiosError 타입dlfkaus
            if (axios.isAxiosError(error)) {
                const response = error.response
                if (response) {
                    alert(response.data.password) // 비밀번호 오류 메세지 출력
                } else {
                    alert('서버로부터 응답이 없습니다.') //그 외 에러
                }
            } else {
                //axios 에러가 아닌 별도의 에러
                alert('예상치 못한 오류가 발생했습니다.')
                console.error(error)
            }
        },
    })

    //폼 결과를 가져온다.
    const handleSubmit = (signupValues: CreateUserInfo) => {
        // 회원 가입 실행
        mutate.mutate({
            username: signupValues.username,
            password: signupValues.password,
        })
    }

    const handleClick = () => {
        navigate('/signin')
    }

    if (mutate.isPending) {
        return <div> ...로딩중</div>
    }
    return (
        <div>
            <Topbar
                title="회원가입"
                right={<Close />}
                rightOnClick={handleClick}
            />
            <UserTextForm onSubmit={handleSubmit} />
        </div>
    )
}

export default Signup
