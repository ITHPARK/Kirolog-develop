import { css } from "@emotion/react"

export default css`
    .react-calendar {
        width: 100%;
        

        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
    }

    .react-calendar__navigation {
        display: flex;
    }

    .react-calendar__navigation button {
        flex: 1;
    }

    .react-calendar__navigation__label {
        flex: unset !important;
    }

    .react-calendar__month-view__weekdays {
        margin-bottom: 20px;
        flex: 1;
        font-size: 12px;
        font-weight: 400;
        line-height: 1.4;
        color: var(--gray400);
        border: none;
    }
    
    .react-calendar__month-view__weekdays__weekday:last-child {
        border-right: none;
    }

    .react-calendar__month-view__weekdays__weekday abbr {
        text-decoration: none;
        color: var(--gray400)
    }

    .react-calendar__month-view__weekdays {
        text-align: center;
    }

    .react-calendar__month-view__days {
        gap: 16px 0;
    }

    .react-calendar__month-view__days button {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 61px;
    }

    .react-calendar__navigation {
        display: none;
    }
    
    .react-calendar__tile {
         all: unset;
    }

    .react-calendar__tile.react-calendar__month-view__days__day {
        gap: 8px;
        font-size: 12px;
        font-weight: 400;
        line-height: 1.4;
        color: var(--gray800);
    }
    .react-calendar__tile.react-calendar__month-view__days__day.future-date {
    color: var(--gray400);

    }

    .different-month {
        color: #ddd;
    }

    .different-month * {
        display: none;
    }

    .react-calendar-datepicker {
        margin-top: 30px;
    }

    .react-calendar-datepicker .react-calendar__year-view__months {
        gap: 8px;
    }
        

    .react-calendar-datepicker .react-calendar__year-view__months__month {
        padding: 15px 0;
        flex: calc(33% - 5px) !important;
        background-color: var(--gray200);
        font-size: 14px;
        font-weight: 800;
        color:var(--gray600)
        line-height: 1.5;
        border-radius: 8px;
    }
`
