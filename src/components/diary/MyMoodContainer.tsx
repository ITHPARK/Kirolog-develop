import Flex from "@shared/Flex"
import Text from "@shared/Text"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { ReactComponent as MoodCharacter } from "@assets/icons/mood_character.svg"

const MyMoodContainer = ({ mood }: { mood: string }) => {
    return (
        <MoodContainer>
            <MoodCharacter css={moodIcon} />
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
    position: relative;
`

const MoodBox = styled(Flex)`
    padding: 16px 30px 16px 20px;
    width: 100%;
    background: var(--gray100);
    border-radius: 8px;
`

const moodIcon = css`
    position: absolute;
    right: 0;
    top: 0;
`

export default MyMoodContainer
