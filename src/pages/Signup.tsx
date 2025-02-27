import CloseButton from "@/components/shared/ico/CloseButton"
import { CreateUserInfo } from "@models/user"
import Topbar from "@shared/Topbar"
import UserTextForm from "@components/signup/UserTextForm"
import axios from "axios"
import { createAccount } from "@remote/user"
import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { getCookie } from "@utils/cookieController"
import Loading from "@shared/Loading"
import useLogin from "@hooks/useLogin"

const Signup = () => {
    const navigate = useNavigate()
    const loginMutate = useLogin()

    //로그인이 된 상태라면 메인페이지로 리다이렉트
    useEffect(() => {
        if (getCookie("accessToken") != null) {
            navigate("/")
        }
    }, [])

    //리액트 쿼리 useMutation 설정
    const signupMutate = useMutation({
        mutationFn: async (data: CreateUserInfo) => {
            await createAccount(data)
        },
        onSuccess: (data, variables: CreateUserInfo) => {
            alert("회원가입이 완료되었습니다.")
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
                }
            }
        },
    })

    //폼 결과를 가져온다.
    const handleSubmit = (signupValues: CreateUserInfo) => {
        // 회원 가입 실행
        signupMutate.mutate({
            username: signupValues.username,
            password: signupValues.password,
        })
    }

    const handleClick = () => {
        navigate("/signin")
    }

    if (signupMutate.isPending) {
        return <Loading />
    }
    return (
        <div>
            <Topbar
                title="회원가입"
                right={<CloseButton />}
                rightOnClick={handleClick}
            />
            <UserTextForm onSubmit={handleSubmit} />
        </div>
    )
}

export default Signup
