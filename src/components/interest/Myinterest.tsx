import React from 'react'
import { InterestProps } from '@models/interest'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Input from '@shared/Input'
import LabelBox from '@shared/LabelBox'
import { css } from '@emotion/react'
import FixedBottomButton from '@shared/FixedBottomButton'

const Myinterest = ({
    interest,
    setStep,
    setData,
    data, // data를 props로 받아와야 합니다.
}: {
    interest: InterestProps
    setStep: React.Dispatch<React.SetStateAction<number>>
    setData: React.Dispatch<React.SetStateAction<string[]>>
    data: string[] // data는 체크된 항목을 저장하는 배열
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setData((prev: string[]) => {
            if (e.target.checked) {
                // 체크된 값이 3개를 넘지 않도록 처리
                if (prev.length < 3) {
                    return [...prev, value]
                }
                return prev
            } else {
                // 체크가 해제된 값은 제거(선택한 value를 filter로 삭제)
                return prev.filter((item) => item !== value)
            }
        })
    }

    return (
        <Flex direction="column" justify="center" align="center">
            <Spacing size={30} />
            <Text
                typography="t6"
                weight="bold"
                color="gray800"
                align="center"
                dangerouslySetInnerHTML={{
                    __html: interest.title.replace(/\n/g, '<br />'),
                }}
            />
            <Spacing size={4} />
            <Text
                typography="t3"
                weight="regular"
                color="gray500"
                align="center"
            >
                {interest.subTitle}
            </Text>
            <Spacing size={40} />
            <Flex as="ul" css={interestList} justify="center">
                {interest.tag.map((item, index) => {
                    const isChecked = data.includes(item) // 데이터 배열에 값이 포함되어 있으면 체크됨
                    return (
                        <li key={index}>
                            <Input
                                id={`${interest.type}-${index}`}
                                name="mood"
                                type="checkbox"
                                value={item}
                                checked={isChecked} // 체크 상태 관리
                                css={inputStyles}
                                onChange={handleChange}
                            />
                            <LabelBox htmlFor={`${interest.type}-${index}`}>
                                {item}
                            </LabelBox>
                        </li>
                    )
                })}
            </Flex>
            <FixedBottomButton
                description="선택하신 태그는 마이페이지에서 수정 가능해요."
                type="button"
                label={interest.type === 'personality' ? '다음' : '완료'}
                onClick={() => {
                    if (data.length == 0) {
                        alert('한가지 이상 골라주세요')
                    } else {
                        setStep((prev: number) => prev + 1)
                    }
                }}
            />
        </Flex>
    )
}

const inputStyles = css`
    &:checked + label {
        color: var(--white);
        background-color: var(--primary300);
    }
`

const interestList = css`
    max-width: 300px;
    gap: 12px 8px;
    flex-wrap: wrap;
`

export default Myinterest
