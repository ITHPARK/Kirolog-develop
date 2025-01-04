import Topbar from "@shared/Topbar"
import Flex from "@shared/Flex"
import Text from "@shared/Text"
import Spacing from "@shared/Spacing"
import { css } from "@emotion/react"
import ArrowLeft from "@shared/ico/ArrowLeft"
import { useNavigate } from "react-router-dom"

const TermsList = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Topbar
                title="서비스 이용약관"
                left={<ArrowLeft />}
                leftOnClick={() => navigate(-1)}
            />
            <Spacing size={40} />
            <Text typography="t6" weight="semiBold" color="gray800">
                서비스 이용약관
            </Text>
            <Spacing size={24} />
            <Flex as="ul" direction="column">
                <li>
                    <Text typography="t3" weight="regular" color="gray700">
                        본 약관은 "기로록" 서비스의 이용과 관련하여 회사와
                        이용자 간의 권리, 의무 및 책임 사항을 규정함을 목적으로
                        합니다. 회원은 본 약관에 동의하고 서비스를 이용하는
                        고객을 의미하며, 서비스는 "기로록"이 제공하는 일기 작성,
                        AI 분석, 감정 리포트, 캐릭터 시스템 등의 기능을
                        의미합니다. 회사는 회원의 개인정보를 보호하며, 관련
                        법령을 준수합니다.
                        <br />
                        개인정보의 수집·이용에 대한 사항은 개인정보처리방침에
                        따릅니다. AI 분석을 위해 회원의 일기 데이터를 **GPT
                        API(OpenAI)**에 전송하며, 이에 대한 동의는 서비스 내
                        개인정보 제3자 제공 동의로 이루어집니다.회원은 언제든지
                        서비스 내 탈퇴 기능을 통해 계약을 해지할 수 있습니다.
                        <br />
                        탈퇴 시 회원의 모든 데이터는 즉시 삭제되며 복구할 수
                        없습니다.
                    </Text>
                    <Spacing size={40} />
                </li>
                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        개인정보 수집·이용 동의
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}></span>
                        법적 근거: <br />
                        개인정보보호법 제15조(개인정보의 수집·이용)
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}></span>
                        필수 동의 사항:
                        <br />
                        수집 항목 (아이디, 비밀번호, 일기 데이터)
                        <br />
                        수집 목적 (로그인 및 일기 분석)
                        <br />
                        보유 기간 (탈퇴 시까지)
                        <br />
                        제3자 제공 여부 (GPT에 전달하는 경우 제3자 제공에 해당)
                    </Text>
                    <Spacing size={40} />
                </li>
                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        개인정보 수집·이용 동의
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        데이터는 AI 생성 및 분석을 위해 OpenAI의 AI API로
                        전송됩니다. 이 데이터는 분석 목적 외에 사용되지 않으며
                        일기 데이터는 탈퇴 시 삭제됩니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}></span>
                        데이터 저장 방법 :
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}></span>
                        이미지 및 텍스트 보관 : 클라우드
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}></span>
                        암호화 전송 방법 : SSL
                    </Text>
                    <Spacing size={76} />
                </li>
            </Flex>
        </div>
    )
}

const termlist = css`
    padding-left: 22px;
    position: relative;

    &::after {
        content: "";
        width: 4px;
        height: 4px;
        display: block;
        position: absolute;
        left: 9px;
        top: 9px;
        background-color: var(--gray700);
        border-radius: 50%;
    }
`

const listTitle = css`
    font-size: 16px;
    font-weight: 400;
    position: absolute;
    left: 6px;
    top: 0;
`
export default TermsList
