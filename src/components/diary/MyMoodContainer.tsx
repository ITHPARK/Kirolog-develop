import Flex from '@shared/Flex'
import Text from '@shared/Text'
import styled from '@emotion/styled'

const MyMoodContainer = ({ mood }: { mood: string }) => {
    return (
        <MoodContainer>
            <MoodBox justify="space-between">
                <Text typography="t2" color="gray800">
                    오늘 당신의 감정은
                </Text>
                <Text typography="t2" color="gray800" weight="bold">
                    {mood}
                </Text>
            </MoodBox>
        </MoodContainer>
    )
}

const MoodContainer = styled.div`
    padding-top: 36px;
    background: url(/images/character/mood_character.png) no-repeat right 10px
        top;
    background-size: 60px auto;
`

const MoodBox = styled(Flex)`
    padding: 16px 30px 16px 20px;
    width: 100%;
    background: var(--gray100);
    border-radius: 8px;
`

export default MyMoodContainer
