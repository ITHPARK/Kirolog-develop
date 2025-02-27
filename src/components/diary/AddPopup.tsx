import Flex from "@shared/Flex"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import { css } from "@emotion/react"
import styled from "@emotion/styled"
import { useNavigate } from "react-router-dom"
import { ReactComponent as AiAddIcon } from "@assets/icons/addDiary_character1.svg"
import { ReactComponent as MyAddIcon } from "@assets/icons/addDiary_character2.svg"

const AddPopup = ({ onClose }: { onClose: () => void }) => {
    const navigate = useNavigate()

    const handleClickAdd = (type: string) => {
        navigate(`/diary/write/${type}`)
        onClose()
    }

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
                <AddButton css={aiAdd} onClick={() => handleClickAdd("ai")}>
                    <AiAddIcon css={buttonIconPos} />
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
                <AddButton css={myAdd} onClick={() => handleClickAdd("my")}>
                    <MyAddIcon css={buttonIconPos} />
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
                <Spacing size={11} />
            </Flex>
        </div>
    )
}

const AddButton = styled.button`
    width: 100%;
    min-height: 130px;
    padding: 23px 0 34px 28px;
    border-radius: 12px;
    position: relative;
`

const aiAdd = css`
    background-color: var(--primary300);
`

const myAdd = css`
    background-color: var(--primary100);
`

const buttonIconPos = css`
    position: absolute;
    right: 0;
    top: 0;
`

export default AddPopup
