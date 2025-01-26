import { SigninProps } from "@models/user"
import { useEffect } from "react"
import Flex from "@shared/Flex"
import Form from "@/components/signin/Form"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import { css } from "@emotion/react"
import styled from "@emotion/styled"

import { useNavigate } from "react-router-dom"
import useUserStore from "@/store/useUserStore"
import Loading from "@shared/Loading"
import useLogin from "@hooks/useLogin"

const SignIn = () => {
    const navigate = useNavigate()
    const { user } = useUserStore()
    const loginMutate = useLogin()

    useEffect(() => {
        if (user != null) {
            navigate("/")
        }
    }, [])

    // //로그인 mutate
    // const mutate = useMutation({
    //     mutationFn: async (data: SigninProps) => {
    //         return await login(data) //로그인 api 요청
    //     },
    //     onSuccess: (data: TokenProps, variables: SigninProps) => {
    //         document.cookie = `username=${variables.username}`
    //         document.cookie = `accessToken=${data.access}`
    //         document.cookie = `refreshToken=${data.refresh}`
    //         navigate("/")
    //     },
    // })

    //로그인
    const handleClickLogin = (data: SigninProps) => {
        loginMutate.mutate({
            username: data.username,
            password: data.password,
        })
    }

    if (loginMutate.isPending) {
        return <Loading />
    }

    return (
        <>
            <LoginContainer direction="column" align="center">
                <Flex direction="column" align="center">
                    <img
                        src="/images/character/character_login.svg"
                        alt="캐릭터 이미지"
                        css={imageStyles}
                    />
                    <Spacing size={20} />
                    <Text typography="t2" color="gray500">
                        로기와 함께하는 기로록
                        <br />
                        지금 바로 시작해보세요!
                    </Text>
                    <Spacing size={40} />
                    <Form onSubmit={handleClickLogin} />
                </Flex>
            </LoginContainer>
        </>
    )
}

const LoginContainer = styled(Flex)`
    padding-top: 112px;
`

const imageStyles = css`
    width: 80px;
    height: 80px;
`

export default SignIn
