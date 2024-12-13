import { useState } from 'react'
import UserTextForm from '@components/signup/UserTextForm'
import Topbar from '@shared/Topbar'
import { useNavigate } from 'react-router-dom'
import { CreateUserProps } from '@models/signup'
import { useMutation } from '@tanstack/react-query'
import { createAccount } from '@remote/user'
import { CreateUserInfo } from '@models/signup'
import Close from '@shared/ico/Close'
import axios from 'axios'

const Signup = () => {
    const navigate = useNavigate()

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
        onSuccess: (data, variables, context) => {
            alert('회원가입이 완료되었습니다.')
            navigate('/signup')
            // data: mutationFn이 반환한 데이터
            // variables: mutation에 전달된 변수
            // context: mutation 호출 전 onMutate에서 반환된 값
        },
        onError: (error, variables, context) => {
            // AxiosError 타입dlfkaus
            if (axios.isAxiosError(error)) {
                const response = error.response
                if (response) {
                    alert(response.data.password) // 비밀번호 오류 메세지 출력
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

    //폼 결과를 가져온다.
    const handleSubmit = (signupValues: CreateUserProps) => {
        console.log(signupValues)

        // 회원 가입 실행
        mutate.mutate({
            username: signupValues.username,
            password: signupValues.password,
        })
    }

    const handleClick = () => {
        navigate('/signin')
    }

    if (mutate.isPending) {
        return <div> ...로딩중</div>
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
