import { SigninProps } from "@models/user"
import { useEffect } from "react"
import Flex from "@shared/Flex"
import Form from "@/components/signin/Form"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import styled from "@emotion/styled"

import { useNavigate } from "react-router-dom"
import useUserStore from "@/store/useUserStore"
import Loading from "@shared/Loading"
import useLogin from "@hooks/useLogin"
import { ReactComponent as Loginlogy } from "@assets/icons/character_login.svg"

const SignIn = () => {
    const navigate = useNavigate()
    const { user } = useUserStore()
    const loginMutate = useLogin()

    useEffect(() => {
        if (user != null) {
            navigate("/")
        }
    }, [])

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
                    <Loginlogy width={80} height={80} />
                    <Spacing size={20} />
                    <Text typography="t2" color="gray600">
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

export default SignIn
