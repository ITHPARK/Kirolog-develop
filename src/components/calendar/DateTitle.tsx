import Text from '@shared/Text'
import useFormatPickerDate from '@hooks/useFormatPickerDate'
import { useDrawerContext } from '@/context/DrawContext'
import CalendarPicker from '@components/calendar/CalendarPicker'
import styled from '@emotion/styled'

interface DateTitleProps {
    pickerDate: Date
    setPickerDate: React.Dispatch<React.SetStateAction<Date>> // directly set the correct type here
}

const DateTitle = ({ pickerDate, setPickerDate }: DateTitleProps) => {
    const { open } = useDrawerContext()

    const handleClickPopup = () => {
        open({
            Component: CalendarPicker,
            componentProps: { setPickerDate: setPickerDate },
            onClose: () => {},
        })
    }

    return (
        <DateTitleText
            display="inline-block"
            typography="t6"
            weight="semiBold"
            onClick={handleClickPopup}
        >
            {useFormatPickerDate(pickerDate)}
        </DateTitleText>
    )
}

const DateTitleText = styled(Text)`
    padding-right: 22px;
    margin-bottom: 20px;
    background: url('/images/arrow/arrow_bottom.svg') no-repeat right center;
    background-size: 14px 7px;
`

export default DateTitle
