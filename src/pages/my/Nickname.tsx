import ArrowLeft from '@shared/ico/ArrowLeft'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Topbar from '@shared/Topbar'
import { css } from '@emotion/react'
import { replaceNickName } from '@remote/user'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import useUserStore from '@/store/useUserStore'

const Nickname = () => {
    const [first, setfirst] = useState<number>(0)
    const [change, setChange] = useState<string | null>(null)
    const navigate = useNavigate()
    const { user, setUser } = useUserStore()

    const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
        setfirst(e.target.value.length)
        setChange(e.target.value)
    }
    const handleChangeNickname = () => {
        if (user?.username && change) {
            mutate.mutate({ username: user.username, after: change })
        }
    }

    const mutate = useMutation({
        mutationFn: async ({
            username,
            after,
        }: {
            username: string
            after: string
        }) => {
            return await replaceNickName(username, after)
        },
        onSuccess: (data, variables) => {
            // nickname을 변경한 후 변수에서 'before' 값을 사용
            setUser({
                ...user,
                nickname: variables.after, // 'after'는 변경된 닉네임
            })
            navigate('/my') // 마이 페이지로 이동
            alert('닉네임 변경이 완료되었습니다.') // 알림
        },
    })

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
