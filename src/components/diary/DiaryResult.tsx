import { useState } from 'react'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import styled from '@emotion/styled'
import DiaryImageBox from '@components/diary/DiaryImageBox'
import Spacing from '@shared/Spacing'

const DiaryResult = () => {
    const [text, setText] = useState('') // 초기값 설정

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value) // 값 업데이트
    }
    return (
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
            <DiaryImageBox imageSrc={null} />
            <Spacing size={20} />
            <DiaryContent
                onChange={handleChange}
                value={text}
                placeholder={'작성한 일기'}
            ></DiaryContent>
        </Flex>
    )
}

export default DiaryResult

const MyMoodContainer = styled(Flex)`
    padding: 16px 30px 16px 20px;
    width: 100%;
    background: var(--gray100);
    border-radius: 8px;
`

const DiaryContent = styled.textarea`
    font-size: 16px;
    font-weight: 500;
    color: var(--gray800);
    line-height: 1.5;
    border: none;
    outline: none;
`
