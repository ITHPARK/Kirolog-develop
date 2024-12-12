import { useAddDiaryData, useAddDiaryStep } from '@store/useAddDiary'

import Flex from '@shared/Flex'
import Input from '@shared/Input'
import React from 'react'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

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
    const handleFormSubmit = (data: { emotion: string }) => {
        if (data.emotion) {
            //감정 추가가
            setStep(1)
            setDiaryData({ ...diaryData, mood: data.emotion })
        } else {
            alert('감정을 선택해주세요.')
        }
    }

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)}>
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

            <CatgoryContainer direction="column">
                <div>
                    <CategoryTitle
                        typography="t2"
                        weight="bold"
                        color="gray700"
                    >
                        희
                    </CategoryTitle>
                </div>
                <Spacing size={16} />
                <Flex
                    as="ul"
                    css={css`
                        gap: 12px 8px;
                        flex-wrap: wrap;
                    `}
                >
                    <li>
                        <Input
                            {...register('emotion', { required: true })}
                            id="cat1"
                            type="radio"
                            value="기쁨"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat1">기쁨</LabelBox>
                    </li>
                    <li>
                        <Input
                            {...register('emotion', { required: true })}
                            id="cat2"
                            type="radio"
                            value="설렘"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat2">설렘</LabelBox>
                    </li>
                    <li>
                        <Input
                            {...register('emotion', { required: true })}
                            id="cat3"
                            type="radio"
                            value="뿌듯함"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat3">뿌듯함</LabelBox>
                    </li>
                    <li>
                        <Input
                            {...register('emotion', { required: true })}
                            id="cat4"
                            type="radio"
                            value="감동"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat4">감동</LabelBox>
                    </li>
                    <li>
                        <Input
                            {...register('emotion', { required: true })}
                            id="cat5"
                            type="radio"
                            value="만족감"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat5">만족감</LabelBox>
                    </li>
                </Flex>
            </CatgoryContainer>
            {errors.emotion && (
                <Text typography="t3" color="red">
                    감정을 선택해주세요.
                </Text>
            )}
            <button type="submit">전송</button>
        </form>
    )
}

const inputStyles = css`
    &:checked + label {
        background-color: #4caf50;
    }
`

const CatgoryContainer = styled(Flex)`
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid var(--gray100);
`

const CategoryTitle = styled(Text)`
    padding: 8px 15px;
    display: inline-block;
`

const LabelBox = styled.label`
    display: block;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--gray700);
    line-height: 1.5;
    border-radius: 32px;
    background: var(--gray100);
    white-space: nowrap;
`

export default TagCategory
