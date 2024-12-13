import { useState } from 'react'
import Topbar from '@shared/Topbar'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Input from '@shared/Input'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'
import ArrowLeft from '@shared/ico/ArrowLeft'
import { useNavigate } from 'react-router-dom'
import FixedBottomButton from '@/components/shared/FixedBottomButton'

const Nickname = () => {
    const [first, setfirst] = useState<number>(0)
    const navigate = useNavigate()

    const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setfirst(e.target.value.length)
    }
    const handleChangeNickname = () => {
        //닉네임 변경요청
    }

    return (
        <div>
            <Topbar
                title="닉네임 변경"
                left={<ArrowLeft />}
                leftOnClick={() => navigate(-1)}
            />
            <Spacing size={30} />
            <Flex direction="column">
                <Text typography="t3" color="gray800">
                    변경할 닉네임을 입력해 주세요
                </Text>
                <Spacing size={16} />
                <input
                    type="text"
                    css={nicknameInput}
                    onChange={onChangeNickname}
                    maxLength={10}
                />
                <Spacing size={4} />
                <Text typography="t1" color="gray500" weight="regular">
                    {`(${first} / 10)`}
                </Text>
            </Flex>
            <FixedBottomButton
                type="button"
                label="변경 완료"
                onClick={handleChangeNickname}
                disabled={first > 0 ? false : true}
            />
        </div>
    )
}

const nicknameInput = css`
    padding-bottom: 8px;
    width: 100%;
    display: block;
    font-size: 20px;
    font-weight: 500;
    color: var(--gray800);
    border-bottom: 1px solid var(--gray200);
`

export default Nickname
