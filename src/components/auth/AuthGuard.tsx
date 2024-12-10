import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useUserStore from '@store/useUserStore'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
    //인증상태 관리 및 초기화
    const [init, setInit] = useState(false)
    const token = localStorage.getItem('accessToken')

    const { user, setUser } = useUserStore()

    //로그인 유무 상관없이 전체 로그인 인증상태 초기화
    useEffect(() => {
        // console.log(user)
        //로그인을 하여 토큰이 있다면
        if (token != null) {
            // const getUser = async () => {
            //     //유저 정보 요청
            //     const response = await axios.post(
            //         'https://kapi.kakao.com/v2/user/me',
            //         {
            //             property_keys: [
            //                 'kakao_account.profile',
            //                 'kakao_account.name',
            //             ],
            //         },
            //         {
            //             headers: {
            //                 Authorization: `Bearer ${token}`,
            //                 'Content-type':
            //                     'application/x-www-form-urlencoded;charset=utf-8',
            //             },
            //         },
            //     )
            //     //zustand에 유저 정보 추가
            //     setUser({
            //         name: response.data.kakao_account.profile.nickname,
            //         profilImage:
            //             response.data.kakao_account.profile.profile_image_url,
            //     })
            // }
            // console.log(user)
            // getUser()
        } else {
            //토큰이 없으면 미로그인 상태이므로 없으면 null로 설정
            setUser(null)
        }

        //인증 상태 초기화
        setInit(true)
    }, [token, setUser])

    if (init === false) {
        return null
    }

    return <div>{children}</div>
}

export default AuthGuard
