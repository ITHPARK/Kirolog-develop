import styled from '@emotion/styled'

const TabContainer = styled.div`
    padding: 20px 0 24px;
    position: sticky;
    top: 0;
    left: 0;
    background-color: var(--white);

    ul {
        padding: 5px;
        width: 100%;
        display: flex;
        gap: 5px;

        background-color: var(--gray100);
        border-radius: 6px;

        li {
            flex: 1;

            button {
                padding: 10px 0;
                width: 100%;
                display: block;
                font-size: 14px;
                font-weight: 500;
                color: var(--slate700);
                text-align: center;
                border-radius: 3px;
            }
        }
    }
`

export default TabContainer
