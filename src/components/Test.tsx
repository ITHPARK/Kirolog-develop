import React from 'react'
import styled from '@emotion/styled'

const Test = () => {
    return (
        <TestC>
            fdshfsdjkfhdsjklfhdsjkfhsdakljfhsdajklfhdsjklfhsdjklfhdsjklfhdsjklfhsdkljfhdskjlhfdskjlfhdsjklfhdskljh
        </TestC>
    )
}

const TestC = styled.div`
    width: 300px;
    height: 300px;
    white-space: wrap;
`

export default Test
