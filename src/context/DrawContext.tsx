import {
    createContext,
    ComponentProps,
    useState,
    useCallback,
    useMemo,
    useContext,
} from 'react'
import { createPortal } from 'react-dom'

import Drawer from '@shared/Drawer'

type DrawerProps = ComponentProps<typeof Drawer> //Drawer의 타입을 가져온다.
type DrawerOptions = Omit<DrawerProps, 'open'> //DrawerProps open타입을 제거한것

interface DrawerContextValue {
    open: (options: DrawerOptions) => void //확인 버튼을 누르면 사라지기 때문에 open만 넣어준다.
}

const Context = createContext<DrawerContextValue | undefined>(undefined) //context생성

//Drawer의 기본 옵션
const defaultValues: DrawerProps = {
    open: false,
    Component: null,
    onClose: () => {},
}

//context를 사용한다는것은 항상 alert을 가지고 있는것이고, open함수를 이용해서 출력하는것
export const DrawerContextProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const [drawerState, setDrawerState] = useState(defaultValues)

    const $portal_root = document.getElementById('modal-portal')

    const close = useCallback(() => {
        setDrawerState({ ...defaultValues, open: false })
    }, [])

    const open = useCallback(
        ({ onClose, ...options }: DrawerProps) => {
            setDrawerState({
                ...options,
                onClose: () => {
                    close()
                },
                open: true,
            })
        },
        [close],
    )

    //context에서 open함수를 넘긴다.
    const values = useMemo(() => ({ open }), [open]) //알럿이 바뀔때 까지 함수를 저장

    return (
        <Context.Provider value={values}>
            {children}
            {$portal_root != null && drawerState.open
                ? createPortal(<Drawer {...drawerState} />, $portal_root)
                : null}
        </Context.Provider>
    )
}

export const useDrawerContext = () => {
    const values = useContext(Context)

    if (values == null) {
        throw new Error('DrawerContext 내부에서 사용해주세요')
    }

    return values
}
