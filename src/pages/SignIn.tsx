import React, { useState, useEffect } from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Form from '@/components/signin/Form'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { SigninProps, TokenProps } from '@models/user'
import { useMutation } from '@tanstack/react-query'
import { login } from '@remote/user'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignIn = () => {
    const [loginError, setLoginError] = useState(false)
    const navigate = useNavigate()

    //로그인 mutate
    const mutate = useMutation({
        mutationFn: async (data: SigninProps) => {
            return await login(data) //로그인 api 요청
        },
        onSuccess: (data: TokenProps, variables: SigninProps) => {
            localStorage.setItem('username', variables.username)
            localStorage.setItem('accessToken', data.access)
            localStorage.setItem('refreshToken', data.refresh)
            navigate('/')
        },
        onError: (error) => {
            //axios 에러라면
            if (axios.isAxiosError(error)) {
                const response = error.response
                if (response) {
                    //아이디 비번이 틀린경우
                    if (response.status === 401) {
                        alert('아이디 및 비밀번호가 일치하지 않습니다.') // 로그인 오류 메세지 출력
                    }
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

    //로그인
    const handleClickLogin = (data: SigninProps) => {
        mutate.mutate({
            username: data.username,
            password: data.password,
        })
    }

    if (mutate.isPending) {
        return <div>로그인 중입니다,,</div>
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
