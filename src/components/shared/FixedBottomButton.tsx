import Button from '@shared/Button'
import React from 'react'
import { createPortal } from 'react-dom'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

interface FixedBottomButtonProps {
    label: string
    onClick?: () => void
    disabled?: boolean
    form?: string
    type: 'button' | 'submit' | 'reset' | undefined
}

const FixedBottomButton = ({
    label,
    onClick,
    disabled,
    form,
    type,
}: FixedBottomButtonProps) => {
    const $portal = document.getElementById('bottomButton')

    if ($portal == null) {
        return null
    }

    return createPortal(
        <Container>
            <Button
                onClick={onClick}
                full={true}
                disabled={disabled}
                form={form}
                type={type}
                typography="t3"
                bgColor="gray800"
                color="white"
            >
                {label}
            </Button>
        </Container>,
        $portal,
    )
}

const slideup = keyframes`
  to {
    transform: translateY(0);
  }
`

const Container = styled.div`
    padding: 20px 18px 53px;
    background-color: #fff;
    transform: translateY(100%);
    animation: ${slideup} 0.5s ease-in-out forwards;
`
export default FixedBottomButton
