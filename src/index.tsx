import React, { useState, useEffect, Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Global } from '@emotion/react'
import globalStyles from '@/styles/globalStyles'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import Splash from '@components/Splash'

const client = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const Root = () => {
    const [firstLoading, setFirstLoading] = useState(false)

    useEffect(() => {
        // 로컬스토리지에서 'hasVisited' 값을 확인
        const isFirstLoad = localStorage.getItem('hasVisited')

        // 'hasVisited'가 없으면 스플래시 화면을 보여주고, 그 후에는 로컬스토리지에 'hasVisited' 값을 저장
        if (!isFirstLoad) {
            // 최초 로딩 시에는 스플래시 화면을 표시하고, 이후에는 표시하지 않음
            localStorage.setItem('hasVisited', 'true')
        }

        // 스플래시 화면을 2초간 표시 후, 메인 화면으로 전환
        setTimeout(() => {
            setFirstLoading(false)
        }, 2000) // 2초 후 스플래시 화면 숨기기
    }, [firstLoading])

    return (
        <React.StrictMode>
            <Global styles={globalStyles} />
            <QueryClientProvider client={client}>
                <BrowserRouter>
                    {firstLoading ? <Splash /> : <App />}
                </BrowserRouter>
            </QueryClientProvider>
        </React.StrictMode>
    )
}

root.render(<Root />)

reportWebVitals()
