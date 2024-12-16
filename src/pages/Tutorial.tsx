import 'swiper/swiper-bundle.css'

import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef, useState } from 'react'

import FixedBottomButton from '@components/shared/FixedBottomButton'
import Flex from '@shared/Flex'
import { Pagination } from 'swiper/modules'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { css } from '@emotion/react'
import { useNavigate } from 'react-router-dom'

const onBoarding = {
    slide1: {
        title: '온전히 나를 위한 시간 \n 감정과 생각을 남겨보세요',
        img: '/images/onboarding/onboarding1.png',
    },
    slide2: {
        title: '일기 작성이 어렵다면 \n AI 생성으로 도와드릴게요',
        img: '/images/onboarding/onboarding2.png',
    },
    slide3: {
        title: '쌓여가는 나의 이야기 \n 기록으로 나를 깊이 이해해요',
        img: '/images/onboarding/onboarding3.png',
    },
    slide4: {
        title: 'AI 주간 리포트로 \n 놓쳤던 나의 상태를 확인해요',
        img: '/images/onboarding/onboarding4.png',
    },
}

const Tutorial = () => {
    const swiperRef = useRef<any>(null)
    const paginationRef = useRef<HTMLDivElement | null>(null)
    const [buttonText, setButtonText] = useState<string>('다음')
    const navigate = useNavigate()

    const handleNextClick = () => {
        const swiper = swiperRef.current?.swiper
        if (swiper) {
            if (swiper.activeIndex === swiper.slides.length - 1) {
                navigate('/interest')
            } else {
                swiper.slideNext() // 마지막 슬라이드가 아니면 다음 슬라이드로 이동
            }
        }
    }

    const handleSwipe = () => {
        const swiper = swiperRef.current?.swiper

        if (swiper.activeIndex === swiper.slides.length - 1) {
            setButtonText('시작하기')
        }
    }

    return (
        <div
            css={css`
                height: 100vh;
                background-color: #f7f8fa;
            `}
        >
            <Spacing size={20} />
            <Flex
                justify="flex-end"
                css={css`
                    padding: 0 20px;
                `}
            >
                <button onClick={() => navigate('/interest')}>
                    <Text typography="t3" color="gray600">
                        Skip
                    </Text>
                </button>
            </Flex>
            <Spacing size={14} />

            <Flex
                as="ul"
                justify="center"
                ref={paginationRef}
                className="custom-pagination"
            />

            <Spacing size={24} />

            <Swiper
                ref={swiperRef} // Swiper 인스턴스 참조 추가
                modules={[Pagination]}
                pagination={{
                    el: paginationRef.current, // 커스텀 엘리먼트 설정
                    clickable: true,
                    renderBullet: (index: string, className: string) => {
                        return `<li class="${className}"></li>`
                    },
                }}
                onBeforeInit={(swiper: any) => {
                    // Swiper 초기화 시점에 pagination.el을 수동으로 설정
                    if (paginationRef.current) {
                        swiper.params.pagination.el = paginationRef.current
                        swiper.pagination.init()
                        swiper.pagination.update()
                    }
                }}
                onSlideChange={handleSwipe}
            >
                {Object.values(onBoarding).map((slide, index) => (
                    <SwiperSlide key={index}>
                        <Text
                            typography="t5"
                            weight="bold"
                            color="gray800"
                            align="center"
                            dangerouslySetInnerHTML={{
                                __html: slide.title.replace(/\n/g, '<br />'),
                            }}
                        ></Text>
                        <Spacing size={64} />
                        <Flex justify="center">
                            <img
                                src={slide.img}
                                alt={`slide ${index + 1}`}
                                css={imgaeSize}
                            />
                        </Flex>
                    </SwiperSlide>
                ))}
            </Swiper>

            <FixedBottomButton
                type="button"
                label={buttonText}
                bggray={true}
                onClick={handleNextClick}
            />
        </div>
    )
}

const imgaeSize = css`
    width: 325px;
`

export default Tutorial
