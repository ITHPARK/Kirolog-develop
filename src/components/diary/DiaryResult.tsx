import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'
import { useEffect, useState } from 'react'

import DiaryImageBox from '@components/diary/DiaryImageBox'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import MyMoodContainer from '@components/diary/MyMoodContainer'
import Spacing from '@shared/Spacing'
import styled from '@emotion/styled'
import usePreviewImage from '@hooks/usePreviewImage'

const DiaryResult = () => {
    const [text, setText] = useState<string>('') // 초기값 설정
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [isContent, setIsContent] = useState<boolean>(true)

    const { setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()

    //이미지 파일을 볼 수 있게 포맷하는 훅
    const preview = usePreviewImage()

    useEffect(() => {
        //이미지 뷰어 생성
        const image = diaryData.image

        if (image) {
            preview(image, (result) => {
                setImageSrc(result)
            })
        }
    }, [diaryData, preview])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value) // 값 업데이트

        //값이 없으면 버튼 비활성화
        if (e.target.value.length > 0) {
            setIsContent(false)
        } else {
            setIsContent(true)
        }
    }

    const handleClick = () => {
        setStep(1)
        setDiaryData({ ...diaryData, content: text })

        console.log(diaryData)
    }

    return (
        <>
            <Spacing size={8} />
            <MyMoodContainer mood={diaryData.mood} />
            <Flex direction="column">
                <Spacing size={20} />
                <DiaryImageBox imageSrc={imageSrc} />
                <Spacing size={20} />
                <DiaryContent
                    onChange={handleChange}
                    value={text}
                    placeholder={'작성한 일기'}
                ></DiaryContent>
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

export default DiaryResult

const DiaryContent = styled.textarea`
    font-size: 16px;
    font-weight: 500;
    color: var(--gray800);
    line-height: 1.5;
    border: none;
    outline: none;
    min-height: 250px;
`
