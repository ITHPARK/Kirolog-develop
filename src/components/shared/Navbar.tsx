import { useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { createPortal } from "react-dom"
import Flex from "@shared/Flex"
import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import styled from "@emotion/styled"
import { css } from "@emotion/react"
import { ReactComponent as NavHome } from "@assets/icons/nav_home.svg"
import { ReactComponent as NavMy } from "@assets/icons/nav_my.svg"
import { ReactComponent as NavReport } from "@assets/icons/nav_report.svg"

const Navbar = () => {
    const [menu, setMenu] = useState<boolean[]>([false, true, false])
    const navigate = useNavigate()
    const location = useLocation() // 현재 경로를 추적

    const navPortal = document.getElementById("nav")

    useEffect(() => {
        // 현재 경로에 맞게 메뉴 상태 업데이트
        if (location.pathname === "/report") {
            setMenu([true, false, false])
        } else if (location.pathname === "/my") {
            setMenu([false, false, true])
        } else {
            setMenu([false, true, false])
        }
    }, [location.pathname]) // 경로가 바뀔 때마다 실행
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
            navigate("/report")
        } else if (num === 1) {
            navigate("/")
        } else if (num === 2) {
            navigate("/my")
        }
    }

    return createPortal(
        <NavStyles as={"ul"}>
            <li>
                <div onClick={() => handleClick(0)}>
                    <Flex direction="column" align="center">
                        <NavMy
                            css={css`
                                color: ${menu[0]
                                    ? "var(--gray700)"
                                    : "var(--gray300)"};
                            `}
                        />
                        <Spacing size={2} />
                        <Text
                            typography="t1"
                            weight="semiBold"
                            color={menu[0] ? "gray700" : "gray300"}
                        >
                            리포트
                        </Text>
                    </Flex>
                </div>
            </li>
            <li>
                <div onClick={() => handleClick(1)}>
                    <Flex direction="column" align="center">
                        <NavHome
                            css={css`
                                color: ${menu[1]
                                    ? "var(--gray700)"
                                    : "var(--gray300)"};
                            `}
                        />
                        <Spacing size={2} />
                        <Text
                            typography="t1"
                            weight="semiBold"
                            color={menu[1] ? "gray700" : "gray300"}
                        >
                            홈
                        </Text>
                    </Flex>
                </div>
            </li>
            <li>
                <div onClick={() => handleClick(2)}>
                    <Flex direction="column" align="center">
                        <NavReport
                            css={css`
                                color: ${menu[2]
                                    ? "var(--gray700)"
                                    : "var(--gray300)"};
                            `}
                        />
                        <Spacing size={2} />
                        <Text
                            typography="t1"
                            weight="semiBold"
                            color={menu[2] ? "gray700" : "gray300"}
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
    position: relative;
    background-color: #fff;
    border-top: 1px solid var(--gray200);

    li {
        flex: 1;
    }

    &:after {
        content: "";
        display: block;
        width: 100%;
        height: 20px;
        position: absolute;
        left: 0;
        top: -21px;
        background-color: #fff;
    }
`

const IconContainer = styled.span<{ iconName: string; active: boolean }>`
    display: inline-block;
    width: 24px;
    height: 24px;
`

export default Navbar
