import Spacing from "@shared/Spacing"
import Text from "@shared/Text"
import styled from "@emotion/styled"
import AgreeTextType1 from "@components/signup/AgreeTextType1"
import AgreeTextType2 from "@components/signup/AgreeTextType2"
import AgreeTextType3 from "@components/signup/AgreeTextType3"

const AgreeText = ({ type }: { type: number }) => {
    return (
        <AgreeContainer>
            <Text typography="t3" color="gray600" weight="bold">
                {type === 1 && "서비스 이용약관 동의"}
                {type === 2 && "개인정보 수집ㆍ이용에 동의합니다."}
                {type === 3 && "개인정보 제 3자 제공 동의합니다."}
            </Text>
            <Spacing size={12} />
            <div>
                {type === 1 && <AgreeTextType1 />}
                {type === 2 && <AgreeTextType2 />}
                {type === 3 && <AgreeTextType3 />}
            </div>
        </AgreeContainer>
    )
}

const AgreeContainer = styled.div`
    padding: 10px;
    width: 100%;
`

export default AgreeText
