import { css } from '@emotion/react'

export default css`
    .react-calendar {
        width: 350px;
        max-width: 100%;
        background: #ffff;
        border: 1px solid #eeeeee;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
        border-radius: 10px;
        box-shadow: 0px 0px 20px #e0e0e0;
    }

    .react-calendar__navigation {
        display: flex;
    }

    .react-calendar__navigation button {
        flex: 1;
    }

    .react-calendar__navigation
        button
        .react-calendar__navigation__label__labelText {
        white-space: nowrap;
    }

    .react-calendar__tile--now {
        background: #ef5350;
        color: #fafafa;
    }

    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #ef5350;
        color: #fafafa;
    }

    .react-calendar__tile--active {
        background: #7fb77e;
        color: white;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
        background: #7fb77e;
    }

    .react-calendar__month-view__weekdays__weekday {
        padding: 10px 0;
        flex: 1;
    }

    .react-calendar__month-view__weekdays__weekday:last-child {
        border-right: none;
    }

    .react-calendar__month-view__weekdays {
        text-align: center;
    }

    .react-calendar__month-view__days {
        margin-top: 10px;
    }

    .react-calendar__month-view__days button {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        height: 60px;
    }

    .different-month {
        color: #ddd;
    }

    .feed_calendar .react-calendar__navigation__next2-button,
    .feed_calendar .react-calendar__navigation__prev2-button {
        display: none;
    }
`
