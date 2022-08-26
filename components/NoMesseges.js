import React from 'react'
import styled from 'styled-components'

function NoMesseges() {
  return (
    <Main>
        <Text>No Chat is selected.</Text>
    </Main>
  )
}

export default NoMesseges

const Main = styled.div`

    display: none;
    align-items: center;
    height: 100vh;
    width: 100%;
    justify-content: center;
    @media (min-width: 768px) {
        display: flex;
    }
`;

const Text = styled.p`
    font-size: 2rem;

`;
