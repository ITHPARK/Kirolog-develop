import Button from "@shared/Button"
import React from "react"
import { createPortal } from "react-dom"
import { keyframes } from "@emotion/react"
import styled from "@emotion/styled"
import { SerializedStyles } from "@emotion/react"
import Text from "@shared/Text"
import Spacing from "@shared/Spacing"

interface FixedBottomButtonProps {
    label: string
    onClick?: () => void
    disabled?: boolean
    form?: string
    type: "button" | "submit" | "reset" | undefined
    css?: SerializedStyles
    bggray?: boolean
    description?: string
}

const FixedBottomButton = ({
    label,
    onClick,
    disabled,
    form,
    type,
    css,
    bggray,
    description,
}: FixedBottomButtonProps) => {
    const $portal = document.getElementById("bottomButton")

    if ($portal == null) {
        return null
    }

    return createPortal(
        <Container css={css} bggray={bggray}>
            {description && (
                <>
                    <Text
                        typography="t1"
                        weight="regular"
                        color="gray600"
                        align="center"
                    >
                        {description}
                    </Text>
                    <Spacing size={16} />
                </>
            )}
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

const Container = styled.div<{ bggray?: boolean }>`
    /* bggray의 타입을 optional로 변경 */
    padding: 20px 18px 53px;
    background-color: ${(props) =>
        props.bggray ? "#f7f8fa" : "#fff"}; /* props.bggray로 조건 처리 */
`
export default FixedBottomButton
