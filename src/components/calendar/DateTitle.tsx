import CalendarPicker from "@components/calendar/CalendarPicker"
import Text from "@shared/Text"
import styled from "@emotion/styled"
import { useDrawerContext } from "@/context/DrawContext"
import useFormatPickerDate from "@hooks/useFormatPickerDate"

interface DateTitleProps {
    pickerDate: Date
    setPickerDate: (date: Date) => void // directly set the correct type here
}

const DateTitle = ({ pickerDate, setPickerDate }: DateTitleProps) => {
    const { open } = useDrawerContext()
    const formatPickerDate = useFormatPickerDate()

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
            {formatPickerDate(pickerDate)}
        </DateTitleText>
    )
}

const DateTitleText = styled(Text)`
    padding-right: 22px;
    margin-bottom: 20px;
`

export default DateTitle
