import Flex from '@shared/Flex'
import React from 'react'
import Text from '@shared/Text'
import Input from '@shared/Input'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import LabelBox from '@shared/LabelBox'
import { Link, useNavigate } from 'react-router-dom'
import ArrowRight from '@shared/ico/ArrowRight'
import Spacing from '@/components/shared/Spacing'
import useUserStore from '@/store/useUserStore'

const My = () => {
    const { user } = useUserStore()
    const navigate = useNavigate()

    return (
        <Flex direction="column">
            <Flex
                justify="space-between"
                align="center"
                css={css`
                    padding: 50px 20px 20px;
                    border-bottom: 1px solid var(--gray100);
                `}
            >
                <Flex
                    direction="column"
                    onClick={() => navigate('/my/nickname')}
                >
                    <Text typography="t5" weight="bold" color="primary400">
                        {user?.nickname}님
                    </Text>
                    <Text typography="t5" weight="bold" color="gray800">
                        반가워요!
                    </Text>
                </Flex>
                <ArrowRight />
            </Flex>
            <Flex
                direction="column"
                css={css`
                    padding: 25px 20px;
                `}
            >
                <Flex
                    justify="space-between"
                    onClick={() => navigate('/interest')}
                >
                    <Text typography="t2" weight="bold">
                        요즘 나의 성격, 관심사
                    </Text>
                    <ArrowRight />
                </Flex>
                <CatgoryContainer direction="column">
                    <LabelContainer as="ul">
                        {(user?.personalities || []).map((item, index) => {
                            return (
                                <li key={index}>
                                    <Label>{item}</Label>
                                </li>
                            )
                        })}
                    </LabelContainer>
                    <Spacing size={8} />
                    <LabelContainer as="ul">
                        {(user?.interests || []).map((item) => {
                            return (
                                <li key={item}>
                                    <Label>{item}</Label>
                                </li>
                            )
                        })}
                    </LabelContainer>
                </CatgoryContainer>
            </Flex>
            <Spacing size={8} color="gray100" />
            <Flex as="ul" direction="column">
                <li>
                    <Link to="/my/account" css={menu}>
                        계정관리
                    </Link>
                </li>
                <li>
                    <Link to="/my/privacy" css={menu}>
                        개인정보처리 방침
                    </Link>
                </li>
                <li>
                    <Link
                        to="/my/terms"
                        css={css`
                            ${menu};
                            border-bottom: none;
                        `}
                    >
                        서비스 이용약관
                    </Link>
                </li>
            </Flex>
        </Flex>
    )
}

const CatgoryContainer = styled(Flex)`
    margin-top: 16px;
`

const LabelContainer = styled(Flex)`
    gap: 12px 8px;
    flex-wrap: wrap;
`

const Label = styled.span`
    display: block;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 500;
    color: var(--gray700);
    line-height: 1.5;
    border-radius: 32px;
    background: var(--gray100);
    white-space: nowrap;
`

const menu = css`
    padding: 24px 20px;
    display: block;
    font-size: 16px;
    font-weight: 500;
    color: var(--gray700);
    border-bottom: 1px solid var(--gray100);
`

export default My
