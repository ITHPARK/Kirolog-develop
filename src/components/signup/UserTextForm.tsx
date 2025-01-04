import React, { useEffect, useState } from 'react'

import AgreeText from '@components/signup/AgreeText'
import Button from '@shared/Button'
import Errormessage from '../shared/Errormessage'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Input from '@shared/Input'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAlertContext } from '@context/AlertContext'
import { useForm } from 'react-hook-form'
import { duplicationCheck } from '@remote/user'
import { useMutation, useQuery } from '@tanstack/react-query'

const UserTextForm = ({
    onSubmit,
}: {
    onSubmit: (signupValues: any) => void
}) => {
    const [isIdChecked, setIsIdChecked] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState<boolean>(false)
    const [check, setCheck] = useState(false)

    const { open } = useAlertContext()

    const {
        register, //특정 폼의 유효성 검사 생성자
        handleSubmit, // form 전체 제출 함수 (유효성 검사가 완료되면 객체로 데이터를 반환)
        formState: { errors, isValid }, //부가적인 폼의 상태를 제공(리액트 쿼리와 유사)
        reset, //각 폼의  데이터를 초기화시킴
        trigger, //실행시 유효성 검사를 실행하는 수동 검사
        setError, //에러 생성자
        getValues, //각 폼의 데이터를 가져오는 함수
        setValue, //각 폼의 데이터를 set하는 setter
        watch, //폼 변화 추적
        clearErrors,
    } = useForm({
        mode: 'onChange', // 유효성 검사 즉시 실행 (onChange로 변경)
        reValidateMode: 'onChange', // 필드 값이 변경될 때마다 유효성 검사
    })
    const formValues = watch()

    const handleChechkId = async () => {
        if (formValues.username.length === 0) {
            alert('아이디를 입력해 주세요.')
        } else {
            const data = await duplicationCheck(formValues.username)

            if (data.available) {
                alert('사용 가능한 아이디 입니다.')
                setIsIdChecked(true)
            } else {
                alert(data.message)
            }
        }
    }

    //유저 아이디 검사
    const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsIdChecked(false)
        setValue('username', e.target.value)
        //최초 포커스 했을 이후에는 중복검사 메세지 출력
        setIsFocus(true)
        // onChange 시 유효성 검사 실행
        trigger('username')
    }

    const handleDeleteId = () => {
        //아이디 입력란 초기화
        reset({
            username: '',
        })
    }

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        //현재 입력한 패스워드 확인
        const pass = e.target.value

        //입력한 패스워드 추적
        const conPass = watch('confirmPassword')

        //일치하지 않는다면
        if (conPass !== pass) {
            setError('confirmPassword', {
                type: 'manual',
                message: '비밀번호가 일치하지 않습니다.',
            })
        } else {
            clearErrors('confirmPassword')
        }
    }

    //비밀번호 유효성검사
    const handleChangePasswordConfirm = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        //현재 입력한 패스워드 확인
        const conPass = e.target.value

        //입력한 패스워드 추적
        const pass = watch('password')

        //일치하지 않는다면
        if (conPass !== pass) {
            setError('confirmPassword', {
                type: 'manual',
                message: '비밀번호가 일치하지 않습니다.',
            })
        } else {
            clearErrors('confirmPassword')
        }
    }

    const handleChangeAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target

        // react-hook-form에 체크 상태 반영
        setValue('agree', checked)

        // 즉시 유효성 검사 실행
        trigger('agree')
    }

    //약관동의 처리방침 알럿을 여는 함수
    const handleClickAgree = (type: number) => {
        open({
            Component: AgreeText,
            componentProps: { type: type },
            onButtonClick1: () => {},
        })
    }

    return (
        <div>
            <form
                id="userInfo"
                onSubmit={handleSubmit(onSubmit)}
                style={{ paddingTop: '16px' }}
            >
                <Flex
                    direction="column"
                    css={css`
                        position: relative;
                    `}
                >
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
                                {...register('username', {
                                    required: '아이디를 입력해주세요',
                                    pattern: {
                                        value: /^[a-zA-Z][a-zA-Z0-9]{3,11}$/, // 수정된 정규식
                                        message:
                                            '영문 소문자와 대문자, 숫자만 사용하며, 영문자로 시작하는 4~12자의 아이디를 입력해주세요.',
                                    },
                                })}
                                onChange={handleChangeUserId} // onChange로 유효성 검사
                            />
                            <button
                                type="button"
                                onClick={handleDeleteId}
                                css={circleStyles}
                            >
                                <img
                                    src="/images/circle/x-circle.svg"
                                    alt="이미지"
                                />
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
                    <ErrorMessageContainer>
                        {errors.username?.message && (
                            <Errormessage
                                message={String(errors.username.message)}
                            />
                        )}
                        {getValues('username')?.length > 0 &&
                            !errors.username?.message &&
                            isFocus &&
                            !isIdChecked && (
                                <Errormessage message="아이디 중복검사를 해주세요." />
                            )}
                    </ErrorMessageContainer>
                </Flex>

                {/* 비밀번호 확인 */}
                <Spacing size={72} />
                <Flex
                    direction="column"
                    css={css`
                        position: relative;
                    `}
                >
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
                            minLength: {
                                value: 8,
                                message:
                                    '비밀번호는 최소 8자 이상이어야 합니다',
                            },
                            validate: {
                                noOnlyNumbers: (value) =>
                                    !/^\d+$/.test(value) ||
                                    '숫자만 있는 비밀번호는 사용할 수 없습니다',
                                noEmailFormat: (value) =>
                                    !/^[^@]+@[^@]+\.[^@]+$/.test(value) ||
                                    '이메일 형식의 비밀번호는 사용할 수 없습니다',
                                noCommonPasswords: (value) => {
                                    const commonPasswords = [
                                        'password',
                                        '123456',
                                        'qwerty',
                                        '12345678',
                                    ]
                                    return (
                                        !commonPasswords.includes(value) ||
                                        '흔한 비밀번호는 사용할 수 없습니다'
                                    )
                                },
                            },
                        })}
                        onChange={handleChangePassword}
                    />
                    <Spacing size={8} />
                    <Input
                        type="password"
                        id="confirmPassword"
                        placeholder="비밀번호 확인"
                        {...register('confirmPassword', {
                            required: '비밀번호 확인을 입력해주세요',
                        })}
                        onChange={handleChangePasswordConfirm} // onChange로 비밀번호 확인
                    />
                    <ErrorMessageContainer>
                        {errors.password?.message && (
                            <Errormessage
                                message={String(errors.password.message)}
                            />
                        )}
                        {errors.confirmPassword?.message &&
                            formValues.password.length > 0 && (
                                <Errormessage
                                    message={String(
                                        errors.confirmPassword.message,
                                    )}
                                />
                            )}
                    </ErrorMessageContainer>
                </Flex>

                <Spacing size={166} />

                <Flex
                    direction="column"
                    align="center"
                    css={css`
                        padding: 0 12px;
                    `}
                >
                    <AgreeContainer justify="space-between">
                        <Flex align="center">
                            <Text typography="t2" color="gray800" weight="bold">
                                서비스 이용약관 동의
                            </Text>
                            <Spacing size={4} direction="horizontal" />
                            <Text typography="t1" color="red">
                                (필수)
                            </Text>
                        </Flex>
                        <div>
                            <Input
                                type="checkbox"
                                id="agree"
                                {...register('agree', {
                                    required: '약관에 동의해주세요.', // 필수 체크 메시지 설정
                                })}
                                onChange={handleChangeAgree}
                                css={inputCheck}
                            />
                            <label htmlFor="agree" css={checkLabel}></label>
                        </div>
                    </AgreeContainer>

                    <Flex
                        as="ul"
                        direction="column"
                        css={css`
                            margin-top: 12px;
                            gap: 12px;
                        `}
                    >
                        <li onClick={() => handleClickAgree(1)}>
                            <Flex justify="space-between">
                                <Text
                                    typography="t1"
                                    color="gray800"
                                    weight="regular"
                                >
                                    서비스 이용약관에 동의합니다.
                                </Text>
                                <AgreeArrow></AgreeArrow>
                            </Flex>
                        </li>
                        <li onClick={() => handleClickAgree(2)}>
                            <Flex justify="space-between">
                                <Text
                                    typography="t1"
                                    color="gray800"
                                    weight="regular"
                                >
                                    개인정보 수집ㆍ이용에 동의합니다.
                                </Text>
                                <AgreeArrow></AgreeArrow>
                            </Flex>
                        </li>
                        <li onClick={() => handleClickAgree(3)}>
                            <Flex justify="space-between">
                                <Text
                                    typography="t1"
                                    color="gray800"
                                    weight="regular"
                                >
                                    개인정보 제 3자 제공 동의합니다.
                                </Text>
                                <AgreeArrow></AgreeArrow>
                            </Flex>
                        </li>
                    </Flex>
                </Flex>
            </form>
            <FixedBottomButton
                label="확인"
                type="submit"
                form="userInfo"
                disabled={!isValid || !isIdChecked}
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

const inputCheck = css`
    &:checked + label {
        background-position: right center;
    }
`

const checkLabel = css`
    display: block;
    width: 20px;
    height: 20px;
    background: url('/images/login/check.png') no-repeat left center;
    background-size: auto 100%;
`

const AgreeContainer = styled(Flex)`
    padding-bottom: 12px;
    border-bottom: 1px solid var(--gray200);
`

const ErrorMessageContainer = styled.div`
    position: absolute;
    left: 10px;
    top: calc(100% + 8px);
`

const AgreeArrow = styled.span`
    display: block;
    width: 16px;
    height: 16px;
    background: url('/images/arrow/arrow_right_16.svg') no-repeat center;
    background-size: 100% 100%;
`

export default UserTextForm
