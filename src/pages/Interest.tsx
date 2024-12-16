import { useEffect, useState } from 'react'

import ArrowLeft from '@components/shared/ico/ArrowLeft'
import { InterestProps } from '@models/interest'
import Myinterest from '@components/interest/Myinterest'
import Topbar from '@components/shared/Topbar'
import { addOnboarding } from '@remote/user'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useUserStore from '@store/useUserStore'

const selet: { [key: string]: InterestProps } = {
    type1: {
        type: 'personality',
        title: '나의 성격을 \n 최대 3개 선택해주세요',
        subTitle: '선택한 성격은 활동 추천에 사용돼요!',
        tag: [
            '외향적',
            '내향적',
            '감성적',
            '계획적',
            '즉흥적',
            '창의적',
            '논리적',
            '신중함',
            '도전정신',
        ],
    },
    type2: {
        type: 'interest',
        title: '나의 관심사\n 최대 3개 선택해주세요',
        subTitle: '선택한 성격은 활동 추천에 사용돼요!',
        tag: [
            '음식',
            '음악',
            '영화',
            '독서',
            '운동',
            '건강',
            '여행',
            '패션',
            '예술',
            '취미',
            '기술',
            '뷰티',
            '재테크',
            '자기계발',
        ],
    },
}

const Interest = () => {
    const [step, setStep] = useState<number>(1)
    const [personality, setPersonality] = useState<string[]>([])
    const [interest, setInterest] = useState<string[]>([])
    const navigate = useNavigate()

    const { user, setUser } = useUserStore()

    const mutate = useMutation({
        mutationFn: async (data: { [key: string]: string[] }) => {
            return await addOnboarding(data)
        },
        onSuccess(data, variables, context) {
            setUser({
                interests: data.interests,
                personalities: data.personalities,
            })

            alert('관심사 추가를 완료했습니다.')
            navigate('/')
        },
    })

    const putInterest = () => {
        mutate.mutate({
            interests: interest,
            personalities: personality,
        })
    }

    useEffect(() => {
        if (step === 3) {
            putInterest()
        }
    }, [step])

    return (
        <div>
            <Topbar
                title=""
                left={<ArrowLeft />}
                leftOnClick={() => navigate(-1)}
            />
            {step === 1 && (
                <Myinterest
                    interest={selet.type1}
                    setStep={setStep}
                    setData={setPersonality}
                    data={personality}
                />
            )}
            {(step === 2 || step === 3) && (
                <Myinterest
                    interest={selet.type2}
                    setStep={setStep}
                    setData={setInterest}
                    data={interest}
                />
            )}
        </div>
    )
}

export default Interest
