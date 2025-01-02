import { useEffect, useState } from 'react'

import DiaryImageBox from '@components/diary/DiaryImageBox'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import MyMoodContainer from '@components/diary/MyMoodContainer'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { addDiaryProps } from '@models/addDiary'
import { crateMyDiary, updateDiary } from '@remote/diary'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAddDiaryData } from '@store/useAddDiary'
import { useAddDiaryStep } from '@store/useAddDiary'
import { useLocation } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import usePreviewImage from '@hooks/usePreviewImage'
import MyDiaryCreateLoading from '@components/diary/MyDiaryCreateLoading'

const DiaryResult = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [isContent, setIsContent] = useState<boolean>(true)
    const [isPlaceholder, setIsPlaceholder] = useState<boolean>(true)

    const { setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()
    const location = useLocation()
    const lastSegment = location.pathname.split('/').pop()

    //이미지 파일을 볼 수 있게 포맷하는 훅
    const preview = usePreviewImage()

    const myMutate = useMutation({
        mutationFn: async (data: addDiaryProps) => {
            return await crateMyDiary(data)
        },
        onSuccess: () => {
            setStep(1)
        },
    })

    const aiMutate = useMutation({
        mutationFn: async (data: addDiaryProps) => {
            return await updateDiary(data)
        },
        onSuccess: () => {
            setStep(1)
        },
    })

    useEffect(() => {
        //이미지 뷰어 생성
        const image = diaryData.image

        if (image) {
            preview(image, (result) => {
                setImageSrc(result)
            })
        }
    }, [diaryData, preview])

    useEffect(() => {
        console.log(diaryData)
        if (diaryData.content != null) {
            if (diaryData.content.length > 0) {
                setIsPlaceholder(false)
            } else {
                setIsPlaceholder(true)
            }
        }
    }, [diaryData])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDiaryData({ ...diaryData, content: e.target.value })

        //값이 없으면 버튼 비활성화
        if (e.target.value.length > 0) {
            setIsContent(false)
        } else {
            setIsContent(true)
        }
    }

    const handleClick = () => {
        if (lastSegment === 'my') {
            myMutate.mutate(diaryData)
        } else if (lastSegment === 'ai') {
            aiMutate.mutate(diaryData)
        }
    }

    if (myMutate.isPending) {
        return <MyDiaryCreateLoading />
    }

    return (
        <>
            <Spacing size={8} />
            <MyMoodContainer mood={diaryData.moods} />
            <Flex direction="column">
                <Spacing size={20} />
                {imageSrc !== null && (
                    <>
                        <DiaryImageBox imageSrc={imageSrc} />
                        <Spacing size={20} />
                    </>
                )}
                <div
                    css={css`
                        position: relative;
                    `}
                >
                    <DiaryContent
                        onChange={handleChange}
                        value={diaryData.content}
                    />
                    {isPlaceholder && (
                        <PlaceholderWrap direction="column">
                            <Text typography="t3" color="gray300">
                                오늘은 어떤 하루였나요?
                            </Text>
                            <Text
                                typography="t1"
                                weight="regular"
                                color="gray300"
                            >
                                오늘느낀 감정을 세세하고 솔직하게 기록해보세요.
                            </Text>
                        </PlaceholderWrap>
                    )}
                </div>
            </Flex>
            <FixedBottomButton
                type="button"
                label="완료"
                onClick={handleClick}
                disabled={isContent}
            />
        </>
    )
}

const DiaryContent = styled.textarea`
    position: relative;
    width: 100%;
    background-color: transparent;
    font-size: 16px;
    font-weight: 500;
    color: var(--gray800);
    line-height: 1.5;
    border: none;
    outline: none;
    min-height: 250px;
    z-index: 10;
`

const ContentContainer = styled.div`
    position: relative;
`

const PlaceholderWrap = styled(Flex)`
    position: absolute;
    left: 0;
    top: 0;
    z-index: 9;
`

export default DiaryResult
