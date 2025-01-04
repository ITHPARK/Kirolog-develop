import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import useToken from "@hooks/useToken"

const Redirection = () => {
    const [searchParams] = useSearchParams()

    const token = useToken()

    const certifiCode = searchParams.get("code")

    useEffect(() => {
        if (certifiCode != null) {
            token(certifiCode)
        }
    }, [certifiCode, token])

    return <div></div>
}

export default Redirection
