import Text from "@shared/Text"
import { css } from "@emotion/react"

const AgreeTextType3 = () => {
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
                데이터는 AI 생성 및 분석을 위해 OpenAI의 AI API로 전송됩니다. 이
                데이터는 분석 목적 외에 사용되지 않으며 일기 데이터는 탈퇴 시
                삭제됩니다.
            </Text>
            <ul>
                <li className="agree-list">
                    데이터 저장 방법
                    <span className="agree-list-caption">
                        - 이미지 및 텍스트 보관 : 클라우드
                    </span>
                    <span className="agree-list-caption">
                        - 함호화 저송 방법 : SSL
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default AgreeTextType3
