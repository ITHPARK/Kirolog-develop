import Button from '@shared/Button'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Input from '@shared/Input'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const UserinfoForm = ({
    onSubmit,
}: {
    onSubmit: (signupValues: any) => void
}) => {
    const [isIdChecked, setIsIdChecked] = useState<boolean>(false)
    const [isFocus, setIsFocus] = useState<boolean>(false)

    const {
        register, //특정 폼의 유효성 검사 생성자
        handleSubmit, // form 전체 제출 함수 (유효성 검사가 완료되면 객체로 데이터를 반환)
        formState: { errors }, //부가적인 폼의 상태를 제공(리액트 쿼리와 유사)
        reset,
        trigger,
        getValues,
    } = useForm({
        mode: 'onBlur',
    })

    const handleChechkId = () => {
        //백엔드에 아이디 중복검사 요청
        alert('사용가능한 아이디입니다.')
        setIsIdChecked(true)
    }

    const handleBlur = async () => {
        setIsFocus(true)
        // onBlur 시 유효성 검사 실행
        await trigger('userId')
    }

    const handleDeleteId = () => {
        //아이디 입력란 초기화
        reset({
            userId: '',
        })
    }

    return (
        <div>
            <form id="userInfo" onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column">
                    <Text>아이디</Text>
                    <Flex>
                        <div
                            css={css`
                                flex: 1;
                            `}
                        >
                            <Input
                                type="text"
                                id="id"
                                placeholder="아이디"
                                {...register('userId', {
                                    required: '아이디를 입력해주세요',
                                })}
                                onBlur={handleBlur}
                            />
                            <Button type="button" onClick={handleDeleteId}>
                                x
                            </Button>
                        </div>
                        <Button type="button" onClick={handleChechkId}>
                            중복확인
                        </Button>
                    </Flex>
                    {errors.userId?.message && (
                        <Text>{String(errors.userId.message)}</Text>
                    )}
                    {getValues('userId')?.length > 0 &&
                        isFocus &&
                        !isIdChecked && (
                            <Text>아이디 중복검사를 해주세요.</Text>
                        )}
                </Flex>
                <Flex direction="column">
                    <Text>비밀번호</Text>
                    <Input
                        type="password"
                        id="password"
                        placeholder="비밀번호"
                        {...register('password', {
                            required: '아이디를 입력해주세요',
                        })}
                    />
                    {errors.password?.message && (
                        <Text>{String(errors.password.message)}</Text>
                    )}
                </Flex>
                <Flex direction="column">
                    <Text>이름</Text>
                    <Input
                        type="text"
                        id="name"
                        placeholder="이름"
                        {...register('name', {
                            required: '아이디를 입력해주세요',
                        })}
                    />
                    {errors.name?.message && (
                        <Text>{String(errors.name.message)}</Text>
                    )}
                </Flex>
                <Flex direction="column">
                    <Text>성별</Text>
                    <Flex as="ul">
                        <li>
                            <Input
                                type="radio"
                                id="male"
                                value="남성"
                                {...register('gender', {
                                    required: '성별을 선택해주세요',
                                })}
                            />
                            <label htmlFor="male">남성</label>
                        </li>
                        <li>
                            <Input
                                type="radio"
                                {...register('gender', {
                                    required: '성별을 선택해주세요',
                                })}
                                id="female"
                                value="여성"
                            />
                            <label htmlFor="female">여성</label>
                        </li>
                    </Flex>
                    {errors.gender?.message && (
                        <Text>{String(errors.gender.message)}</Text>
                    )}
                </Flex>
                <Flex direction="column">
                    <Text>닉네임</Text>
                    <Input
                        type="text"
                        id="nickname"
                        placeholder="닉네임"
                        {...register('nickname', {
                            required: '닉네임을 입력해주세요',
                        })}
                    />
                    {errors.nickname?.message && (
                        <Text>{String(errors.nickname.message)}</Text>
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

export default UserinfoForm
