import Text from "@shared/Text"
import { css } from "@emotion/react"

const AgreeTextType2 = () => {
    return (
        <div
            css={css`
                height: 238px;
                overflow-y: auto;
            `}
        >
            <Text
                typography="t0"
                weight="medium"
                color="gray500"
                css={css`
                    word-break: keep-all;
                `}
            >
                개인정보 수집·이용 동의 법적 근거: 개인정보보호법 <br />
                제15조(개인정보의 수집·이용)
            </Text>
            <br />
            <Text typography="t0" weight="medium" color="gray500">
                필수 동의 사항:
            </Text>
            <ul>
                <li className="agree-list">
                    수집 항목 (아이디, 비밀번호, 일기 데이터)
                </li>
                <li className="agree-list">수집 목적 (로그인 및 일기 분석)</li>
                <li className="agree-list">보유 기간 (탈퇴 시까지 )</li>
                <li className="agree-list">
                    제3자 제공 여부 (GPT에 전달하는 경우 제3자 제공에 해당)
                </li>
            </ul>
        </div>
    )
}

export default AgreeTextType2
