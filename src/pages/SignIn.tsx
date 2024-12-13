import React from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Form from '@/components/signin/Form'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { SigninProps } from '@models/signin'
import { useMutation } from '@tanstack/react-query'
import { login } from '@remote/user'
import { CreateUserProps } from '@models/signup'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {
    const navigate = useNavigate()

    //로그인 mutate
    const mutate = useMutation({
        mutationFn: async (data: CreateUserProps) => {
            await login(data)
        },
        onSuccess: (data, variables, context) => {
            navigate('/')
            // data: mutationFn이 반환한 데이터
            // variables: mutation에 전달된 변수
            // context: mutation 호출 전 onMutate에서 반환된 값
        },
        onError: (error) => {
            //axios 에러라면
            if (axios.isAxiosError(error)) {
                const response = error.response
                if (response) {
                    alert(response.data.password) // 로그인 오류 메세지 출력
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

    const handleClickLogin = (data: SigninProps) => {
        console.log(data)
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

                {/* <Flex direction="column">
                    <Text>SNS 계정으로 로그인</Text>
                    <Spacing size={60} />
                    <Button
                        color="#FFEB03"
                        css={css`
                            padding: 15px 0;
                        `}
                    >
                        카카오 로그인
                    </Button>
                </Flex> */}
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
