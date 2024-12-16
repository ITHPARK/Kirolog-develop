import ArrowLeft from '@shared/ico/ArrowLeft'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Topbar from '@shared/Topbar'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const Privacy = () => {
    const navigate = useNavigate()
    return (
        <div>
            <Topbar
                title="개인정보처리 방침"
                left={<ArrowLeft />}
                leftOnClick={() => navigate(-1)}
            />
            <Spacing size={40} />
            <Text typography="t6" weight="semiBold" color="gray800">
                개인정보처리 방침 가이드
            </Text>
            <Spacing size={24} />
            <Flex as="ul" direction="column">
                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제 1조(목적)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        기로록(이하 '회사'라고 함)는 회사가 제공하고자 하는
                        서비스(이하 '회사 서비스')를 이용하는 개인(이하 ‘이용자'
                        또는 개인')의 정보(이하 ‘개인정보')를 보호하기 위해,
                        개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에
                        관한 법률(이하 '정보통신망법') 등 관련 법령을 준수하고,
                        서비스 이용자의 개인정보 보호 관련한 고층을 신속하고
                        원확하게 처리할 수 있도록 하기 위하여 다음과 같이
                        개인정보처리방침(이하 본 방침')을 수립합니다.
                    </Text>
                    <Spacing size={30} />
                </li>
                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제2조(개인정보 처리의 원칙)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        개인정보 관련 법령 및 본 방침에 따라 회사는 이용자의
                        개인정보를 수집할 수 있으며 수집된 개인정보는 개인의
                        동의가 있는 경우에 한해 제3자에게 제공될 수 있습니다.
                        단, 법령의 규정 등에 의해 적법하게 강제되는 경우 회사는
                        수집한 이용자의 개인정보를 사전에 개인의 동의 없이
                        제3자에게 제공할 수도 있습니다.
                    </Text>
                    <Spacing size={30} />
                </li>
                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제3조(본 방침의 공개)
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        회사는 이용자가 언제든지 쉽게 본 방침을 확인할 수 있도록
                        회사 홈페이지 첫 화면 또는 첫 화면과의 연결화면을 통해
                        본 방침을 공개하고 있습니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        회사는 제1항에 따라 본 방침을 공개하는 경우 글자 크기,
                        색상 등을 활용하여 이용자가 본 방침을 쉽게 확인할 수
                        있도록 합니다.
                    </Text>
                    <Spacing size={30} />
                </li>
                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제4조(본 방침의 변경)
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        본방침은 개인정보 관련 법령, 지침, 고시 또는 정부나 회사
                        서비스의 정책이나 내용의 변경에 따라 개정될 수 있습니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        회사는 제1항에 따라 본 방침을 개정하는 경우 다음 각 호
                        하나 이상의 방법으로 공지합니다. 가. 회사가 운영하는
                        인터넷 홈페이지의 첫 화면의 공지사항란 또는 별도의 창을
                        통하여 공지하는 방법 나. 서면•모사전송•전자우편 또는
                        이와 비슷한 방법으로 이용자에게 공지하는 방법
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>3.</span>
                        회사는 제2항의 공지는 본 방침 개정의 시행일로부터 최소
                        7일 이전에 공지합니다. 다만, 이용자 권리의 중 요한
                        변경이 있을 경우에는 최소 30일 전에 공지합니다.
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제5조(회원 가입을 위한 정보)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        회사는 이용자의 회사 서비스에 대한 회원가입을 위하여
                        다음과 같은 정보를 수집합니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        필수 수집 정보: 비밀번호
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제6조(회사 서비스 제공을 위한 정보)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        회사는 이용자에게 회사의 서비스를 제공하기 위하여 다음과
                        같은 정보를 수집합니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        필수 수집 정보: 아이디, 비밀번호
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제7조(개인정보 수집 방법)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        회사는 다음과 같은 방법으로 이용자의 개인정보를
                        수집합니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        이용자가 회사의 서비스에 자신의 개인정보를 입력하는 방식
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        어플리케이션 등 회사가 제공하는 홈페이지 외의 서비스를
                        통해 이용자가 자신의 개인정보를 입력하는 방식
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>3.</span>
                        서비스 가입 경로 응답에 대하 답변 수집
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제8조(개인정보의 이용)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        회사는 개인정보를 다음 각 호의 경우에 이용합니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        공지사항의 전달 등 회사운영에 필요한 경우
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        이용문의에 대한 회신, 불만의 처리 등 이용자에 대한
                        서비스 개선을 위한 경우
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>3.</span>
                        회사의 서비스를 제공하기 위한 경우
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>4.</span>
                        법렁 및 회사 약관을 위반하는 회원에 대한 이용 제한 조치,
                        부정 이용 행위를 포함하여 서비스의 원활한 운영에 지장을
                        주는 행위에 대한 방지 및 제재를 위한 경우
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>5.</span>
                        인구통계학적 분석, 서비스 방문 및 이용기록의 분석을 위한
                        경우
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>6.</span>
                        개인정보 및 관심에 기반한 이용자간 관계의 형성을 위한
                        경우
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제9조(사전동의 등에 따른 개인정보의 제공)
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        회사는 개인정보 제3자 제공 금지에도 불구하고, 이용자가
                        사전에 공개하거나 다음 각호 사항에 대하여 동 의한
                        경우에는 제3자에게 개인정보를 제공할 수 있습니다. 다만
                        이 경우에도 회사는 관련 법령 내에서 최소한으로
                        개인정보를 제공합니다. 가. GPT에게 취향 및 일기 내용
                        분석을 통해 개인화된 AI 솔루션 제공을 위하여 일기 작성
                        내용, 성격 및 관심사 태그 내용을 제공 나. 카카오에게
                        간편한 로그인 환경 제공을 위하여 간편로그인 정보 식별
                        값을 제공
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        회사는 전항의 제3자 제공 관계에 변화가 있거나 제3자 제공
                        관계가 종결될 때도 같은 절차에 의해 이용자 에게 고지 및
                        동의를 구합니다.
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제10조(개인정보의 보유 및 이용기간)
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        회사는 이용자의 개인정보에 대해 개인정보의 수집•이용
                        목적 달성을 위한 기간 동안 개인정보를 보유 및
                        이용합니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        전항에도 불구하고 회사는 내부 방침에 의해 서비스
                        부정이용기록은 부정 가입 및 이용 방지를 위하여 회원 탈퇴
                        시점으로부터 최대 1년간 보관합니다.
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제11조(개인정보의 파기원칙)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        회사는 원칙적으로 이용자의 개인정보 처리 목적의 달성,
                        보유• 이용기간의 경과 등 개인정보가 필요하지 않을
                        경우에는 해당 정보를 지체 없이 파기합니다.
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제12조(개인정보파기절차)
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        이용자가 회원가입 등을 위해 입력한 정보는 개인정보 처리
                        목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의
                        서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호
                        사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후
                        파기 되어집니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        회사는 파기 사유가 발생한 개인정보를 개인정보보호
                        책임자의 승인절차를 거쳐 파기합니다.
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제13조(개인정보파기방법)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        회사는 전자적 파일형태로 저장된 개인정보는 기록을 재생할
                        수 없는 기술적 방법을 사용하여 삭제하며, 종이로 출력된
                        개인정보는 분쇄기로 분쇄하거나 소각 등을 통하여
                        파기합니다.
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제14조(개인정보 조회 및 수집동의 철회)
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        이용자 및 법정 대리인은 언제든지 등록되어 있는 자신의
                        개인정보를 조회하거나 수정할 수 있으며 개인정 보수집
                        동의 철회를 요청할 수 있습니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        이용자 및 법정 대리인은 자신의 가입정보 수집 등에 대한
                        동의를 철회하기 위해서는 개인정보보호책임자 또는
                        담당자에게 서면, 전화 또는 전자우편주소로 연락하시면
                        회사는 지체 없이 조치하겠습니다.
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제15조(개인정보 정보변경 등)
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        이용자는 회사에게 전조의 방법을 통해 개인정보의 오류에
                        대한 정정을 요청할 수 있습니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        회사는 전항의 경우에 개인정보의 정정을 완료하기 전까지
                        개인정보를 이용 또는 제공하지 않으며 잘못된 개인정보를
                        제3자에게 이미 제공한 경우에는 정정처리결과를 제3자에게
                        지체 없이 통지하여 정정이 이루 어지도록 하겠습니다.
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제16조(이용자의 의무)
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        이용자는 자신의 개인정보를 최신의 상태로 유지해야 하며,
                        이용자의 부정확한 정보 입력으로 발생하는 문 제의 책임은
                        이용자 자신에게 있습니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        타인의 개인정보를 도용한 회원가입의 경우 이용자 자격을
                        상실하거나 관련 개인정보보호 법령에 의해 처벌받을 수
                        있습니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>3.</span>
                        이용자는 전자우편주소, 비밀번호 등에 대한 보안을 유지할
                        책임이 있으며 제3자에게 이를 양도하거나 대여할 수
                        없습니다.
                    </Text>
                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제17조(비밀번호의 암호화)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        이용자의 비밀번호는 일방향 암호화하여 저장 및 관리되고
                        있으며, 개인정보의 확인, 변경은 비밀번호를 알고 있는
                        본인에 의해서만 가능합니다.
                    </Text>

                    <Spacing size={30} />
                </li>

                <li>
                    <Text typography="t3" weight="bold" color="gray700">
                        제18조(개인정보 유출 등에 대한 조치)
                    </Text>
                    <Text typography="t3" weight="regular" color="gray700">
                        회사는 개인정보의 분실•도난• 유출(이하 "유출 등"이라
                        한다) 사실을 안 때에는 지체 없이 다음 각 호의 모든
                        사항을 해당 이용자에게 알리고 방송통신위원회 또는
                        한국인터넷진흥원에 신고합니다.
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>1.</span>
                        유출 등이 된 개인정보 항목
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>2.</span>
                        유출 등이 발생한 시점
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>3.</span>
                        이용자가 취할 수 있는 조치
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>4.</span>
                        정보통신서비스 제공자 등의 대응 조치
                    </Text>
                    <Text
                        typography="t3"
                        weight="regular"
                        color="gray700"
                        css={termlist}
                    >
                        <span css={listTitle}>5.</span>
                        이용자가 상담 등을 접수할 수 있는 부서 및 연락처
                    </Text>

                    <Spacing size={100} />
                </li>
            </Flex>
        </div>
    )
}

const termlist = css`
    padding-left: 22px;
    position: relative;
`

const listTitle = css`
    font-size: 16px;
    font-weight: 400;
    position: absolute;
    left: 6px;
    top: 0;
`

export default Privacy
