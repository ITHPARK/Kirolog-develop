import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { SigninProps } from '@models/signin'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Input from '@shared/Input'
import { css } from '@emotion/react'
import Button from '@shared/Button'
import FixedBottomButton from '@shared/FixedBottomButton'
import Errormessage from '../shared/Errormessage'

const UserTextForm = ({
    onSubmit,
}: {
    onSubmit: (signupValues: any) => void
}) => {
    const [isIdChecked, setIsIdChecked] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        trigger,
        getValues,
        setValue,
        setError,
    } = useForm({
        mode: 'onBlur',
    })

    const handleChechkId = () => {
        alert('사용 가능한 아이디입니다.')
        setIsIdChecked(true)
    }

    const handleBlur = async () => {
        setIsFocus(true)
        // trigger를 비동기적으로 호출하여 유효성 검사 실행
        await trigger('userId')
    }

    const handleDeleteId = () => {
        reset({
            userId: '',
        })
    }

    // const handlePasswordConfirm = () => {
    //     const { password, confirmPassword } = getValues()
    //     if (password !== confirmPassword) {
    //         setError('confirmPassword', {
    //             type: 'manual',
    //             message: '비밀번호가 일치하지 않습니다.',
    //         })
    //     }
    // }

    return (
        <div>
            <form
                id="userInfo"
                onSubmit={handleSubmit(onSubmit)}
                style={{ paddingTop: '16px' }}
            >
                <Flex direction="column">
                    <Text typography="t2" color="gray600" weight="bold">
                        아이디
                    </Text>
                    <Spacing size={8} />

                    <Flex>
                        <div
                            css={css`
                                flex: 1;
                                position: relative;
                            `}
                        >
                            <Input
                                type="text"
                                id="id"
                                placeholder="아이디"
                                {...register('userId', {
                                    required: '아이디를 입력해주세요',
                                    pattern: {
                                        value: /^[a-zA-Z][a-zA-Z0-9]{3,11}$/, // 수정된 정규식
                                        message:
                                            '영문 소문자와 대문자, 숫자만 사용하며, 영문자로 시작하는 4~12자의 아이디를 입력해주세요.',
                                    },
                                })}
                                onBlur={handleBlur}
                            />
                            <button
                                type="button"
                                onClick={handleDeleteId}
                                css={circleStyles}
                            >
                                <img src="/images/x-circle.svg" alt="이미지" />
                            </button>
                        </div>
                        <Spacing size={10} direction="horizontal" />
                        <Button
                            color="white"
                            type="button"
                            onClick={handleChechkId}
                            weight="bold"
                        >
                            중복확인
                        </Button>
                    </Flex>
                    {errors.userId?.message && (
                        <Errormessage message={String(errors.userId.message)} />
                    )}
                    {getValues('userId')?.length > 0 &&
                        isFocus &&
                        !isIdChecked && (
                            <Errormessage message="아이디 중복검사를 해주세요." />
                        )}
                </Flex>

                {/* 비밀번호 확인 */}
                <Spacing size={72} />
                <Flex direction="column">
                    <Text typography="t2" color="gray600" weight="bold">
                        비밀번호
                    </Text>
                    <Spacing size={8} />
                    <Input
                        type="password"
                        id="password"
                        placeholder="비밀번호"
                        {...register('password', {
                            required: '비밀번호를 입력해주세요',
                        })}
                    />
                </Flex>
                <Flex direction="column">
                    <Text typography="t2" color="gray600" weight="bold">
                        비밀번호 확인
                    </Text>
                    <Spacing size={8} />
                    <Input
                        type="password"
                        id="confirmPassword"
                        placeholder="비밀번호 확인"
                        {...register('confirmPassword', {
                            required: '비밀번호 확인을 입력해주세요',
                        })}
                        // onBlur={handlePasswordConfirm} // 비밀번호 확인을 검증하는 함수 호출
                    />
                    {errors.password?.message && (
                        <Errormessage
                            message={String(errors.password.message)}
                        />
                    )}
                    {errors.confirmPassword?.message && (
                        <Errormessage
                            message={String(errors.confirmPassword.message)}
                        />
                    )}
                </Flex>
            </form>
            <FixedBottomButton
                label="확인"
                type="submit"
                form="userInfo"
                disabled={!isIdChecked}
            />
        </div>
    )
}

const circleStyles = css`
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
`

export default UserTextForm
