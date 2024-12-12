import React from 'react'
import Flex from '@shared/Flex'
import styled from '@emotion/styled'

const TabContainer = styled(Flex)`
    padding: 5px;
    margin-top: 20px;
    margin-bottom: 24px;
    width: 100%;
    gap: 5px;
    background-color: var(--gray100);
    border-radius: 6px;

    li {
        flex: 1;

        button {
            padding: 10px 0;
            width: 100%;
            display: block;
            font-size: 14px;
            font-weight: 500;
            color: var(--slate700);
            text-align: center;
            border-radius: 3px;
        }
    }
`

export default TabContainer
