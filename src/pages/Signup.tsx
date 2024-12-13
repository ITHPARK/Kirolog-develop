import { useState } from 'react'
import UserTextForm from '@components/signup/UserTextForm'
import Topbar from '@shared/Topbar'
import { useNavigate } from 'react-router-dom'
import { CreateUserProps } from '@models/signup'
import { useMutation } from '@tanstack/react-query'
import { createAccount } from '@remote/user'
import { CreateUserInfo } from '@models/signup'
import Close from '@shared/ico/Close'

const Signup = () => {
    //리액트 쿼리 useMutation 설정
    const mutate = useMutation({
        mutationFn: async (data: CreateUserInfo) => {
            await createAccount(data)
        },
        onMutate: (variables) => {
            //함수에 전달되기 전에 수정할 수도 있음
            console.log('mutation이 시작되기 전:', variables)
            // 예: 로딩 상태 설정, 임시 데이터 업데이트 등
            return { username: variables.username } // context 객체 반환
        },
    })

    //폼 결과를 가져온다.
    const handleSubmit = (signupValues: CreateUserProps) => {
        console.log(signupValues)

        // 회원 가입 실행
        mutate.mutate({
            username: signupValues.username,
            password: signupValues.password,
        })
    }

    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/signin')
    }

    return (
        <div>
            <Topbar
                title="회원가입"
                right={<Close />}
                rightOnClick={handleClick}
            />
            <UserTextForm onSubmit={handleSubmit} />
        </div>
    )
}

export default Signup
