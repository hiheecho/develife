import styled from '@emotion/styled';
import { useState } from 'react';
import YoutubeBoard from '../components/YoutubeBoard';
import Navbar from '../components/Navbar';

function Main() {
  const [category, setCategory] = useState<string>('');

  return (
    <MainContainer>
      <MainWrapper>
        <Navbar category={category} setCategory={setCategory} />
        <YoutubeBoard category={category}></YoutubeBoard>
      </MainWrapper>
    </MainContainer>
  );
}

export default Main;
const MainContainer = styled.div`
  background-color: black;
`;
const MainWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
