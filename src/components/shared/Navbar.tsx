import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { createPortal } from 'react-dom'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Navbar = () => {
    const [menu, setMenu] = useState<boolean[]>([false, true, false])
    const navigate = useNavigate()

    const navPortal = document.getElementById('nav')

    if (navPortal == null) {
        return null
    }

    const handleClick = (num: number) => {
        setMenu(() => {
            const newMenu = [false, false, false]
            newMenu[num] = true
            return newMenu
        })

        if (num === 0) {
            navigate('/report')
        } else if (num === 1) {
            navigate('/')
        } else if (num === 2) {
            navigate('/my')
        }
    }

    return createPortal(
        <NavStyles as={'ul'}>
            <li>
                <div onClick={() => handleClick(0)}>
                    <Flex direction="column" align="center">
                        <IconContainer iconName="nav_report" active={menu[0]} />
                        <Spacing size={2} />
                        <Text
                            typography="t1"
                            weight="semiBold"
                            color={menu[0] ? 'gray700' : 'gray300'}
                        >
                            리포트
                        </Text>
                    </Flex>
                </div>
            </li>
            <li>
                <div onClick={() => handleClick(1)}>
                    <Flex direction="column" align="center">
                        <IconContainer iconName="nav_home" active={menu[1]} />
                        <Spacing size={2} />
                        <Text
                            typography="t1"
                            weight="semiBold"
                            color={menu[1] ? 'gray700' : 'gray300'}
                        >
                            홈
                        </Text>
                    </Flex>
                </div>
            </li>
            <li>
                <div onClick={() => handleClick(2)}>
                    <Flex direction="column" align="center">
                        <IconContainer iconName="nav_my" active={menu[2]} />
                        <Spacing size={2} />
                        <Text
                            typography="t1"
                            weight="semiBold"
                            color={menu[2] ? 'gray700' : 'gray300'}
                        >
                            마이
                        </Text>
                    </Flex>
                </div>
            </li>
        </NavStyles>,
        navPortal,
    )
}

const NavStyles = styled(Flex)`
    width: 100%;
    height: 90px;
    padding: 10px;
    background-color: #fff;
    border-top: 1px solid var(--gray200);

    li {
        flex: 1;
    }
`

const IconContainer = styled.span<{ iconName: string; active: boolean }>`
    display: inline-block;
    width: 24px;
    height: 24px;
    background: url(/images/nav/${(props) => props.iconName}.svg) no-repeat;
    background-position: ${(props) =>
        props.active ? 'left center' : 'right center'};
`

export default Navbar
