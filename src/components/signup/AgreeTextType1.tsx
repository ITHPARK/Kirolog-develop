import Text from "@shared/Text"
import { css } from "@emotion/react"

const AgreeTextType1 = () => {
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
                본 약관은 "기로록" 서비스의 이용과 관련하여 회사와 이용자 간의
                권리, 의무 및 책임 사항을 규정함을 목적으로 합니다.
                <br /> <br />
                회원은 본 약관에 동의하고 서비스를 이용하는 고객을 의미하며,
                서비스는 "기로록"이 제공하는 일기 작성, AI 분석, 감정 리포트,
                캐릭터 시스템 등의 기능을 의미합니다.회사는 회원의 개인정보를
                보호하며, 관련 법령을 준수합니다. <br />
                <br /> 개인정보의 수집·이용에 대한 사항은 개인정보처리방침에
                따릅니다.AI 분석을 위해 회원의 일기 데이터를 **GPT
                API(OpenAI)**에 전송하며,
                <br />
                <br /> 이에 대한 동의는 서비스 내 개인정보 제3자 제공 동의로
                이루어집니다.회원은 언제든지 서비스 내 탈퇴 기능을 통해 계약을
                해지할 수 있습니다.
                <br />
                <br /> 탈퇴 시 회원의 모든 데이터는 즉시 삭제되며 복구할 수
                없습니다.
            </Text>
        </div>
    )
}

export default AgreeTextType1
