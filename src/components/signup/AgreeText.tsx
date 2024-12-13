import React from 'react'
import Text from '@shared/Text'
import styled from '@emotion/styled'
import Spacing from '@shared/Spacing'

const AgreeText = ({ type }: { type: number }) => {
    console.log(type)
    return (
        <AgreeContainer>
            <Text typography="t3" color="gray600" weight="bold">
                {type === 1 && '서비스 이용약관 동의'}
                {type === 2 && '개인정보 수집ㆍ이용에 동의합니다.'}
                {type === 3 && '개인정보 제 3자 제공 동의합니다.'}
            </Text>
            <Spacing size={12} />
            <TextArea name="" id="" readOnly={true}>
                {type === 1 &&
                    `
                본 약관은 "기로록" 서비스의 이용과 관련하여 회사와 이용자 간의
                권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.\n\n
                회사는 회원의 개인정보를 보호하며, 관련 법령을 준수합니다. 개인정보의 수집·이용에 대한 사항은 개인정보처리방침에 따릅니다.\n\n
                `}
            </TextArea>
        </AgreeContainer>
    )
}

const AgreeContainer = styled.div`
    padding: 10px;
    width: 233px;
`

const TextArea = styled.textarea`
    width: 100%;
    height: 238px;
    word-break: keep-all;
    color: var(--gray500);
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    border: none;
`

export default AgreeText
