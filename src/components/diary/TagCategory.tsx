import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'

import Alert from '@shared/Alert/Alert'
import ArrowLeft from '@shared/ico/ArrowLeft'
import Close from '@shared/ico/Close'
import DiaryTop from '@components/diary/DiaryTop'
import Flex from '@shared/Flex'
import Input from '@shared/Input'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Topbar from '../shared/Topbar'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useAlertContext } from '@context/AlertContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import LabelBox from '@shared/LabelBox'

const mood = {
    type1: {
        title: '희',
        subMood: ['기쁨', '설렘', '뿌듯', '감동', '만족', '행복'],
    },
    type2: {
        title: '노',
        subMood: ['분노', '짜증', '억울', '불쾌', '좌절', '답답', '초조'],
    },
    type3: {
        title: '애',
        subMood: ['슬픔', '속상', '우울', '외로움', '후회', '무기력', '그리움'],
    },
    type4: {
        title: '락',
        subMood: ['즐거움', '따듯', '기대', '여유', '평온'],
    },
}

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

            {Object.keys(mood).map((typeKey) => {
                const { title, subMood } = mood[typeKey as keyof typeof mood]

                return (
                    <div key={typeKey}>
                        <CategoryTitle
                            typography="t2"
                            weight="bold"
                            color="gray700"
                        >
                            {title}
                        </CategoryTitle>
                        <Spacing size={16} />
                        <LabelContainer as="ul">
                            {subMood.map((emotion, index) => (
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
                    </div>
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

const CategoryTitle = styled(Text)`
    padding: 8px 15px;
    display: inline-block;
`

// const LabelBox = styled.label`
//     display: block;
//     padding: 10px 20px;
//     font-size: 14px;
//     font-weight: 500;
//     color: var(--gray700);
//     line-height: 1.5;
//     border-radius: 32px;
//     background: var(--gray100);
//     white-space: nowrap;
// `

export default TagCategory
