import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'

import Alert from '@shared/Alert/Alert'
import ArrowLeft from '@shared/ico/ArrowLeft'
import Close from '@shared/ico/Close'
import Topbar from '../shared/Topbar'
import { useAlertContext } from '@context/AlertContext'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { deleteDiary } from '@remote/diary'

const DiaryTop = () => {
    const { step, setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()
    const { open } = useAlertContext()
    const navigate = useNavigate()
    const location = useLocation()
    const lastSegment = location.pathname.split('/').pop()

    const deleteDiaryMutate = useMutation({
        mutationFn: async (data: number) => {
            return await deleteDiary(data) //로그인 api 요청
        },
        onSuccess: () => {
            navigate('/')
        },
    })

    //x 버튼을 클릭했을 때
    const handleClickReset = () => {
        open({
            Component: Alert,
            componentProps: {
                title: '작성을 취소할건가요?',
                description: '작성 중인 내용인 저장되지 않아요!',
            },
            onButtonClick1: () => {
                setStep(1, true)
                setDiaryData({
                    headDate: null,
                    ymd: null,
                    moods: '',
                    image: null,
                    content: '',
                    keyword: [],
                })
                //ai일기 마지막 수정 단계에서 x누르면 일기 삭제
                if (lastSegment === 'ai' && step === 4) {
                    if (diaryData.id != null) {
                        deleteDiaryMutate.mutate(diaryData.id)
                    }
                }
                navigate('/')
            },
            onButtonClick2: () => {},
            buttonLabel1: '네',
            buttonLabel2: '아니요',
        })
    }

    //뒤로가기 버튼을 클릭했을때
    const handleClickArrow = () => {
        //첫페이지면 이전 url로 이동
        if (step <= 1) {
            navigate(-1)
        } else {
            //아니면 이전 스텝으로 이동
            setStep(-1)
        }
    }

    return (
        <Topbar
            title={diaryData.headDate ? diaryData.headDate : ''}
            left={step > 1 ? <ArrowLeft /> : null}
            right={<Close />}
            leftOnClick={handleClickArrow}
            rightOnClick={handleClickReset}
        />
    )
}

export default DiaryTop
