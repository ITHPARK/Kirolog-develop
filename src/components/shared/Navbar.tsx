import React from 'react'
import Flex from '@shared/Flex'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { createPortal } from 'react-dom'

const Navbar = () => {
    const navPortal = document.getElementById('nav')

    if (navPortal == null) {
        return null
    }

    return createPortal(
        <Flex as={'ul'} css={NavStyles}>
            <li>
                <Link to="/">홈</Link>
            </li>
            <li>
                <Link to="/page1">page1</Link>
            </li>
            <li>
                <Link to="/page2">page2</Link>
            </li>
            <li>
                <Link to="/page2">마이페이지</Link>
            </li>
        </Flex>,
        navPortal,
    )
}

const NavStyles = css`
    width: 100%;
    height: 60px;

    li {
        flex: 1;
    }
`

export default Navbar
