import React from 'react'
import styled from '@emotion/styled'
import Dimmed from '@shared/Dimmed'

interface DrawerProps {
    open?: boolean
    Component?: React.ComponentType<any> | null
    componentProps?: any // Component에 전달할 props
    onClose?: () => void
}

// Drawer 컴포넌트
const Drawer = ({ open, Component, componentProps, onClose }: DrawerProps) => {
    return (
        <>
            <Dimmed onClick={onClose}> </Dimmed>
            <DrawerContainer open={open ? open : '1'}>
                <DrawerContent>
                    <CloseButton onClick={onClose}>
                        <img src="/images/close.svg" alt="닫기" />
                    </CloseButton>
                    {Component != null && (
                        <Component {...componentProps} onClose={onClose} />
                    )}
                </DrawerContent>
            </DrawerContainer>
        </>
    )
}

// Drawer 기본 스타일링
const DrawerContainer = styled.div<{ open: boolean | string }>`
    padding: 20px 20px 0 20px;
    position: fixed;
    bottom: 0;
    right: 0;
    height: 350px;
    width: 100%;
    background-color: var(--white);
    color: white;
    border-radius: 12px 12px 0 0;
    transition: transform 0.5s ease-in-out;
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(100%)')};

    z-index: 1000;
`

// Drawer 내용
const DrawerContent = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
`
const CloseButton = styled.button`
    width: 14px;
    height: 14px;
    position: absolute;
    right: 0;
    top: 0;

    img {
        width: 100%;
    }
`

export default Drawer
