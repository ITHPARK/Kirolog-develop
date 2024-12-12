import React from 'react'
import Topbar from '@shared/Topbar'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import styled from '@emotion/styled'
import Spacing from '@shared/Spacing'
import { useNavigate } from 'react-router-dom'

const DiaryDetail = () => {
    const navigate = useNavigate()

    const handleClickBack = () => {
        navigate(-1)
    }
    return (
        <div>
            <Spacing size={30} />
            <Topbar title="날짜" left="뒤로" leftOnClick={handleClickBack} />
            <Flex direction="column">
                <ImageArea></ImageArea>
                <Spacing size={20} />
                <Flex align="center">
                    <Text typography="t3" weight="bold" color="gray800">
                        행복함
                    </Text>
                    <Spacing size={4} direction="horizontal" />
                    <span>아이콘</span>
                </Flex>
                <Spacing size={4} />
                <Text typography="t2" weight="regular" color="gray700">
                    가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사
                    가나다라마바사 가나다라마바사 가나다라마바사 가나다라마바사
                    가나다라마바사
                </Text>
            </Flex>
        </div>
    )
}

const ImageArea = styled.div`
    widht: 100%;
    height: 335px;
    background: #ddd;
    border-radius: 8px;
`

export default DiaryDetail
