import Alert from '@shared/Alert/Alert'
import ArrowLeft from '@shared/ico/ArrowLeft'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Topbar from '@shared/Topbar'
import { deleteUser } from '@remote/user'
import styled from '@emotion/styled'
import { useAlertContext } from '@context/AlertContext'
import { useAuth } from '@context/AuthContext'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import useUserStore from '@store/useUserStore'

const Account = () => {
    const navigate = useNavigate()
    const { open } = useAlertContext()
    const { logout } = useAuth()
    const { user } = useUserStore()

    const mutate = useMutation({
        mutationFn: async (username: string) => {
            return await deleteUser(username)
        },
        onSuccess: () => {
            logout()
            alert('탈퇴가 완료되었습니다.')
        },
    })

    const handleClickLogout = () => {
        open({
            Component: Alert,
            componentProps: {
                title: '로그아웃 하시겠어요?',
                description: '다음에 또 만나요!',
            },
            onButtonClick1: () => {
                logout()
            },
            onButtonClick2: () => {},
            buttonLabel1: '네',
            buttonLabel2: '아니요',
        })
    }
    const handleClickSecession = () => {
        open({
            Component: Alert,
            componentProps: {
                title: '서비스를 탈퇴하시겠어요?',
                description:
                    "서비스탈퇴 시 ‘기로록'에 저장되어있던\n 모든 데이터는 삭제되며, 복구가 불가능합니다.",
            },
            onButtonClick1: () => {
                if (user?.username) {
                    mutate.mutate(user.username)
                }
            },
            onButtonClick2: () => {},
            buttonLabel1: '네',
            buttonLabel2: '아니요',
        })
    }

    return (
        <div>
            <Topbar
                title="계정 관리"
                left={<ArrowLeft />}
                leftOnClick={() => navigate(-1)}
            />
            <Spacing size={30} />
            <Flex as="ul" direction="column">
                <Flex as="li" justify="space-between" align="center">
                    <Text typography="t3" color="gray800">
                        일반 로그인
                    </Text>
                    <AccountButton onClick={handleClickLogout}>
                        로그아웃
                    </AccountButton>
                </Flex>
                <Spacing size={24} />
                <Spacing size={1} color="gray100" />
                <Spacing size={24} />
                <Flex as="li" justify="space-between" align="center">
                    <Text typography="t2" color="gray500" weight="regular">
                        회원정보를 삭제 하시겠어요?
                    </Text>
                    <AccountButton onClick={handleClickSecession}>
                        서비스 탈퇴
                    </AccountButton>
                </Flex>
            </Flex>
        </div>
    )
}

const AccountButton = styled.button`
    font-size: 14px;
    font-weight: 600;
    color: var(--gray500);
    line-height: 1.5;
`

export default Account
