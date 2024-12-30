import { addDiaryProps, responseAddDiaryProps } from '@models/addDiary'
import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'
import { useEffect, useState } from 'react'
import AiDiaryCreateLoading from '@components/diary/AiDiaryCreateLoading'

import DiaryImageBox from '@components/diary/DiaryImageBox'
import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import MyMoodContainer from '@components/diary/MyMoodContainer'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'

import { crateAiDiary } from '@remote/diary'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useMutation } from '@tanstack/react-query'
import usePreviewImage from '@hooks/usePreviewImage'

const AddKeyword = () => {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [keywords, setKeywords] = useState(['', '', '']) // 키워드 상태

    const { setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()

    //이미지 파일을 볼 수 있게 포맷하는 훅
    const preview = usePreviewImage()

    // diaryData가 업데이트된 후에 mutate.mutate를 실행하도록 useEffect 사용
    useEffect(() => {
        if (diaryData.keyword && diaryData.keyword.length > 0) {
            mutate.mutate(diaryData)
        }
    }, [diaryData]) // diaryData가 변경될 때마다 mutate 실행

    useEffect(() => {
        //이미지 뷰어 생성
        const image = diaryData.image

        if (image) {
            preview(image, (result) => {
                setImageSrc(result)
            })
        }
    }, [diaryData, preview])

    const mutate = useMutation({
        mutationFn: async (data: addDiaryProps) => {
            return await crateAiDiary(data)
        },
        onSuccess: (data) => {
            setDiaryData({ ...diaryData, content: data.content })
            setStep(1)
        },
    })

    // 키워드 입력 핸들러
    const handleKeywordChange = (index: number, value: string) => {
        setKeywords((prevKeywords) => {
            const newKeywords = [...prevKeywords]
            newKeywords[index] = value.replace(/\s+/g, '')
            return newKeywords
        })
    }

    //키워드 추가
    const handleAddKeywrod = () => {
        setDiaryData({ ...diaryData, keyword: keywords })
        // setStep(1)
    }

    // 버튼 활성화 여부
    const isButtonDisabled = keywords.some((keyword) => keyword.trim() === '')

    //AI일기 생성중일 때 뜨는 로딩화면
    if (mutate.isPending) {
        return <AiDiaryCreateLoading />
    }

    return (
        <>
            <Flex direction="column">
                <Spacing size={8} />
                <MyMoodContainer mood={diaryData.moods} />
                <Spacing size={20} />
                <DiaryImageBox imageSrc={imageSrc} />
                <Spacing size={20} />
                <Flex direction="column">
                    <Flex>
                        <Text typography="t3" weight="bold" color="gray600">
                            오늘 하루를 3가지 키워드로 표현해요.
                        </Text>
                        <Spacing size={2} direction="horizontal" />
                        <Text typography="t3" color="red500">
                            {'(필수)'}
                        </Text>
                    </Flex>
                    <Spacing size={16} />
                    <Flex>
                        <Flex direction="column">
                            {['키워드1', '키워드2', '키워드3'].map(
                                (label, index) => (
                                    <div key={index}>
                                        <Flex>
                                            <Text
                                                typography="t2"
                                                color="gray500"
                                            >
                                                {label}
                                            </Text>
                                            <Spacing
                                                size={5}
                                                direction="horizontal"
                                            />
                                            <Text typography="t2" color="red">
                                                *
                                            </Text>
                                        </Flex>
                                        <KeywordInput
                                            type="text"
                                            placeholder={`예) ${label}`}
                                            value={keywords[index]}
                                            onChange={(
                                                e: React.ChangeEvent<HTMLInputElement>,
                                            ) =>
                                                handleKeywordChange(
                                                    index,
                                                    e.target.value,
                                                )
                                            }
                                        />
                                        <Spacing size={24} />
                                    </div>
                                ),
                            )}
                        </Flex>
                    </Flex>
                    <Spacing size={36} />
                </Flex>
            </Flex>
            <FixedBottomButton
                type="button"
                label="AI생성"
                disabled={isButtonDisabled}
                css={css`
                    border-top: 1px solid var(--gray200);
                `}
                onClick={handleAddKeywrod}
            />
        </>
    )
}

const KeywordInput = styled.input`
    padding: 12px 0 8px 0;
    width: 100%;
    font-size: 20px;
    color: var(--gray600);
    border-bottom: 1px solid var(--gray200);

    ::placeholder {
        color: var(--gray300);
    }
`

export default AddKeyword
