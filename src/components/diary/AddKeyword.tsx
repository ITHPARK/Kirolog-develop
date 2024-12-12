import { useEffect, useState } from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Spacing from '@shared/Spacing'
import FixedBottomButton from '@shared/FixedBottomButton'
import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'
import DiaryImageBox from '@components/diary/DiaryImageBox'
import { useForm } from 'react-hook-form'

const AddKeyword = () => {
    const [imageSrc, setImageSrc] = useState<string | null | ArrayBuffer>(null)
    const [keywords, setKeywords] = useState(['', '', '']) // 키워드 상태

    const { step, setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()

    useEffect(() => {
        const image = diaryData.image

        if (image) {
            //파일을 읽은 결과를 가져온다.
            const reader = new FileReader()
            reader.readAsDataURL(image)
            reader.onloadend = () => {
                setImageSrc(reader.result)
            }
        }
    }, [diaryData])

    // 키워드 입력 핸들러
    const handleKeywordChange = (index: number, value: string) => {
        setKeywords((prevKeywords) => {
            const newKeywords = [...prevKeywords]
            newKeywords[index] = value
            return newKeywords
        })
    }

    //키워드 추가
    const handleAddKeywrod = () => {
        setDiaryData({ ...diaryData, keyword: keywords })
        setStep(1)
        console.log(123123)
    }

    // 버튼 활성화 여부
    const isButtonDisabled = keywords.some((keyword) => keyword.trim() === '')

    return (
        <>
            <Flex direction="column">
                <MyMoodContainer justify="space-between" align="center">
                    <Text typography="t2" color="gray800">
                        오늘 당신의 감정은
                    </Text>
                    <Text typography="t2" color="gray800" weight="bold">
                        기쁨
                    </Text>
                </MyMoodContainer>
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

const MyMoodContainer = styled(Flex)`
    padding: 16px 30px 16px 20px;
    width: 100%;
    background: var(--gray100);
    border-radius: 8px;
`

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
