import React from 'react'
import Text from '@shared/Text'
import Flex from '@shared/Flex'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Spacing from '@shared/Spacing'

const AddPopup = () => {
    return (
        <div>
            <Flex
                direction="column"
                css={css`
                    padding-left: 10px;
                `}
            >
                <Spacing size={20} />
                <Text typography="t4" color="gray800" weight="bold">
                    오늘 하루를 기록하러 오셨군요!
                </Text>
                <Text typography="t2" color="gray500" weight="regular">
                    일기 작성 방법을 선택해 주세요.
                </Text>
            </Flex>
            <Spacing size={20} />
            <Flex direction="column">
                <AddButton css={aiAdd}>
                    <Text
                        typography="t4"
                        weight="bold"
                        color="white"
                        align="left"
                    >
                        AI 생성
                    </Text>
                    <Spacing size={8} />
                    <Text typography="t1" color="gray100" align="left">
                        기록은 하고싶지만 시간이 없을때,
                        <br />
                        AI를 통해 그날의 감정을 남겨보세요!
                    </Text>
                </AddButton>
                <Spacing size={11} />
                <AddButton css={normalAdd}>
                    <Text
                        typography="t4"
                        weight="bold"
                        color="gray800"
                        align="left"
                    >
                        직접 작성
                    </Text>
                    <Spacing size={8} />
                    <Text typography="t1" color="gray600" align="left">
                        더 세세한 그날의 감정을 직접 남겨보세요!
                    </Text>
                </AddButton>
            </Flex>
        </div>
    )
}

const AddButton = styled.button`
    width: 100%;
    padding: 24px 0 38px 28px;
    border-radius: 12px;
    background: red;
`

const aiAdd = css`
    background: #836bba url(/images/character/addDiary_character1.svg) no-repeat
        right top;
    background-size: 100px auto;
`
const normalAdd = css`
    background: #dbdbff url(/images/character/addDiary_character2.svg) no-repeat
        right top;
    background-size: 100px auto;
`
export default AddPopup
