import styled from "styled-components";

export const Wrapper = styled.div`
    width: 27rem;
    height: 30rem;
    background-color: #fbfbff;
    border-radius: 20px;
    padding: 0 3rem;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    /* 가운데 정렬 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h1 {
        color: #23315d;
        padding-top: 4rem;
        padding-bottom: 1rem;
    }
`;
