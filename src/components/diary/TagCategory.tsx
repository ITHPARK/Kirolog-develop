import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'
import Flex from '@shared/Flex'
import Input from '@shared/Input'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import LabelBox from '@shared/LabelBox'
import { mood } from '@utils/moodContent'

const TagCategory = () => {
    const { step, setStep } = useAddDiaryStep()
    const { diaryData, setDiaryData } = useAddDiaryData()

    // 폼 데이터 타입 지정
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<{ emotion: string }>({
        mode: 'onChange',
    })

    // 폼 제출 함수
    // 감정 선택 핸들러
    const handleEmotionChange = (emotion: string) => {
        setDiaryData({ ...diaryData, moods: emotion })
        setStep(1) // 바로 다음 스텝으로 이동
    }

    return (
        <>
            <Spacing size={30} />
            <Flex direction="column">
                <Text typography="t4" weight="bold" color="gray800">
                    지금 느끼는 감정을 선택해주세요.
                </Text>
                <Spacing size={4} />
                <Text typography="t2" weight="regular" color="gray500">
                    1가지 감정만 선택할 수 있어요.
                </Text>
            </Flex>
            <Spacing size={29} />

            {Object.keys(mood).map((typeKey) => {
                const { title, subMood } = mood[typeKey as keyof typeof mood]

                return (
                    <CatgoryContainer key={typeKey} direction="column">
                        <CategoryTitle
                            typography="t2"
                            weight="bold"
                            color="gray700"
                            type={title}
                        >
                            {title}
                        </CategoryTitle>
                        <Spacing size={16} />
                        <LabelContainer as="ul">
                            {subMood.map((emotion: string, index: number) => (
                                <li key={index}>
                                    <Input
                                        id={`cat${typeKey}-${index}`}
                                        name="mood"
                                        type="radio"
                                        value={emotion}
                                        css={inputStyles}
                                        onChange={() =>
                                            handleEmotionChange(emotion)
                                        }
                                        // checked={selectedEmotion === emotion}
                                    />
                                    <LabelBox
                                        htmlFor={`cat${typeKey}-${index}`}
                                    >
                                        {emotion}
                                    </LabelBox>
                                </li>
                            ))}
                        </LabelContainer>
                    </CatgoryContainer>
                )
            })}

            {/* {errors.emotion && (
                <Text typography="t3" color="red">
                    감정을 선택해주세요.
                </Text>
            )} */}
        </>
    )
}

const inputStyles = css`
    &:checked + label {
        color: var(--white);
        background-color: var(--primary300);
    }
`

const CatgoryContainer = styled(Flex)`
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--gray100);
`

const LabelContainer = styled(Flex)`
    gap: 12px 8px;
    flex-wrap: wrap;
`

const CategoryTitle = styled(Text)<{ type: string }>`
    padding: 8px 14px;
    display: block;

    background: ${(props) =>
        props.type
            ? `url(/images/moodicon/${
                  props.type === '희'
                      ? 'happiness'
                      : props.type === '노'
                        ? 'anger'
                        : props.type === '애'
                          ? 'sadness'
                          : props.type === '락'
                            ? 'enjoyment'
                            : ''
              }.png) no-repeat left 6px center `
            : ''};

    background-size: 30px;
`

export default TagCategory
