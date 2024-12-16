import { useEffect, useState } from 'react'

import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import Input from '@shared/Input'
import Text from '@shared/Text'
import { useForm } from 'react-hook-form'

const UserAgreeForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
    const { register, handleSubmit, watch } = useForm<any>()

    const [AllChecked, setAllChecked] = useState<Boolean>(false)

    //각 약관의 상태값을 추적
    const checkboxWatch = watch(['agree1', 'agree2', 'agree3'])

    useEffect(() => {
        //상태를 추적하고 모든 약관이 동의가 됐다면 약관동의 상태값 변경
        setAllChecked(checkboxWatch.every(Boolean))
    }, [checkboxWatch])

    return (
        <>
            <form id="agree" onSubmit={handleSubmit(onSubmit)}>
                <Flex>
                    <Text>약관 동의</Text>

                    <Flex direction="column">
                        <Flex>
                            <Input
                                type="checkbox"
                                id="agree1"
                                {...register('agree1', {
                                    required: '체크해주세요',
                                })}
                            />
                            <label htmlFor="agree1">동의</label>
                        </Flex>
                        <Flex>
                            <Input
                                type="checkbox"
                                id="agree2"
                                {...register('agree2', {
                                    required: '체크해주세요',
                                })}
                            />
                            <label htmlFor="agree2">동의</label>
                        </Flex>
                        <Flex>
                            <Input
                                type="checkbox"
                                id="agree3"
                                {...register('agree3', {
                                    required: '체크해주세요',
                                })}
                            />
                            <label htmlFor="agree3">동의</label>
                        </Flex>
                    </Flex>
                </Flex>
            </form>

            <FixedBottomButton
                label="다음"
                form="agree"
                type="submit"
                disabled={!AllChecked}
            />
        </>
    )
}

export default UserAgreeForm
