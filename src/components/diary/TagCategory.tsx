import React from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Input from '@shared/Input'
import Spacing from '@shared/Spacing'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

const TagCategory = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
    const [selectedValue, setSelectedValue] = useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // 기본 동작 방지
        if (selectedValue) {
            onSubmit(selectedValue)
        } else {
            alert('감정을 선택해주세요.')
        }
    }

    return (
        <form onSubmit={}>
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
                    `}
                >
                    <li>
                        <Input
                            name="emotion"
                            id="cat1"
                            type="radio"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat1">기쁨</LabelBox>
                    </li>
                    <li>
                        <Input
                            name="emotion"
                            id="cat2"
                            type="radio"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat2">설렘</LabelBox>
                    </li>
                    <li>
                        <Input
                            name="emotion"
                            id="cat3"
                            type="radio"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat3"> 뿌듯함</LabelBox>
                    </li>
                    <li>
                        <Input
                            name="emotion"
                            id="cat4"
                            type="radio"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat4">감동</LabelBox>
                    </li>
                    <li>
                        <Input
                            name="emotion"
                            id="cat5"
                            type="radio"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat5">만족감</LabelBox>
                    </li>
                    <li>
                        <Input
                            name="emotion"
                            id="cat6"
                            type="radio"
                            css={inputStyles}
                        />
                        <LabelBox htmlFor="cat6">만족감</LabelBox>
                    </li>
                </Flex>
            </CatgoryContainer>
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
`

export default TagCategory
