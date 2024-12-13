import { useForm } from 'react-hook-form'
import { SigninProps } from '@models/signin'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Input from '@shared/Input'
import { css } from '@emotion/react'
import Button from '@shared/Button'
import { Link } from 'react-router-dom'
import Errormessage from '@shared/Errormessage'

const From = ({
    onSubmit,
}: {
    onSubmit: (signinValues: SigninProps) => void
}) => {
    const {
        register, //특정 폼의 유효성 검사 생성자
        handleSubmit, // form 전체 제출 함수 (유효성 검사가 완료되면 객체로 데이터를 반환)
        formState: { errors }, //부가적인 폼의 상태를 제공(리액트 쿼리와)
    } = useForm<SigninProps>({
        mode: 'onBlur',
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
            <Flex direction="column" align="center">
                <Input
                    type="text"
                    id="id"
                    placeholder="아이디 입력"
                    {...register('username', {
                        required: '아이디를 입력해주세요',
                    })}
                />

                <Spacing size={8} />
                <Input
                    type="password"
                    id="password"
                    placeholder="비밀번호 입력"
                    {...register('password', {
                        required: '비밀번호를 입력해주세요',
                    })}
                />

                {errors.username && (
                    <Errormessage message={errors.username?.message} />
                )}
                {errors.password && (
                    <Errormessage message={errors.password?.message} />
                )}
                <Spacing size={12} />

                <Button
                    type="submit"
                    bgColor="gray800"
                    color="white"
                    full={true}
                    css={css`
                        padding: 10px 0;
                    `}
                >
                    로그인
                </Button>
                <Spacing size={10} />
                <Link to="/signup">
                    <Text typography="t2" color="gray600">
                        회원가입
                    </Text>
                </Link>
            </Flex>
        </form>
    )
}

export default From
