import { useMutation } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { login } from "@remote/user"
import { SigninProps, TokenProps } from "@models/user"

const useLogin = () => {
    const navigate = useNavigate()

    const loginMutate = useMutation({
        mutationFn: async (data: SigninProps) => {
            return await login(data) //로그인 api 요청
        },
        onSuccess: (data: TokenProps, variables: SigninProps) => {
            document.cookie = `username=${variables.username}`
            document.cookie = `accessToken=${data.access}`
            document.cookie = `refreshToken=${data.refresh}`
            navigate("/")
        },
    })

    return loginMutate
}

export default useLogin
