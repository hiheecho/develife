import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import AddForm from '../components/AddForm';
import ContentsList from '../components/ContentsList';
import { authService } from '../firebase';

const Modal = ({ closeReleasePopup, youtubeInfo }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  });

  return (
    <>
      <Layer onClick={() => closeReleasePopup()}></Layer>
      <ModalLayer>
        <CloseButton onClick={() => closeReleasePopup()}>X</CloseButton>
        <ModalContainer>
          <YoutubeBox>
            <YoutubeContents>
              <iframe
                id="ytplayer"
                type="text/html"
                width="720"
                height="405"
                src={`https://www.youtube.com/embed/${youtubeInfo.resourceId.videoId}`}
                frameBorder="0"
                allowFullScreen
                title="main"
              />
            </YoutubeContents>
            <div>
              <YoutubeTitle> {youtubeInfo.title} </YoutubeTitle>
              <ContentsText>{youtubeInfo.description}</ContentsText>
            </div>
          </YoutubeBox>
          <ContentsContainer>
            <ContentsTitle>댓글</ContentsTitle>
            <ContentsBox>
              <ContentsList youtubeInfo={youtubeInfo} />
              {isLoggedIn ? <AddForm youtubeInfo={youtubeInfo} /> : null}
            </ContentsBox>
          </ContentsContainer>
        </ModalContainer>
      </ModalLayer>
    </>
  );
};

export default Modal;

const Layer = styled.div`
  z-index: 1500;
  display: block;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const ModalLayer = styled.div`
  z-index: 2000;
  width: 80%;
  height: 80vh;
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: white;
  border-radius: 16px;
  transform: translate(-50%, -50%) !important;
`;
const ModalContainer = styled.div`
  width: 85%;
  height: 100%;
  margin: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  gap: 30px;
`;
const YoutubeBox = styled.div`
  margin-right: 12px;
  width: 60%;
  height: 80%;
  border-radius: 16px;
`;
const ContentsContainer = styled.div`
  background-color: lightgray;
  width: 45%;
  height: 80%;

  border-radius: 16px;
`;
const ContentsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 24px;
  width: 100%;
  height: 18%;
`;
const ContentsBox = styled.div`
  flex-direction: column;
  justify-content: space-between;
  height: 95%;
`;
const ContentsText = styled.div`
  border-radius: 8px;
  background-color: #fff;
  padding-left: 12px;
  height: 16vh;
  overflow: auto;
`;
const CloseButton = styled.button`
  position: absolute;
  font-size: 24px;
  font-weight: 600;
  width: 40px;
  height: 40px;
  right: 12px;
  top: 12px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;
const YoutubeContents = styled.div`
  width: 100%;
  height: 66%;
  background-color: aliceblue;
  margin-bottom: 1vh;
`;
const YoutubeTitle = styled.p`
  font-weight: 800;
  font-size: 24px;
  overflow-wrap: break-word;
  margin-bottom: 1vh;
`;
