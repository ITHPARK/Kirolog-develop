import React from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Form from '@/components/signin/Form'
import Button from '@shared/Button'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { SigninProps } from '@models/signin'

const SignIn = () => {
    //카카로 로그인 시도

    //Form 컴포넌트 앞에서
    const handleClickLogin = (userData: SigninProps) => {
        // const requestUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`
        // window.location.href = requestUrl
        console.log(userData)
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
