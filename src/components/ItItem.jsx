import React from 'react';
import Modal from '../pages/Modal';
import YoutubeContent from './YoutubeContent';
import styled from '@emotion/styled';

const ItItem = ({
  ItItemPlayList,
  clickImg,
  releaseModal,
  modalPlayItem,
  closeReleasePopup,
}) => {
  return (
    <>
      <CateMainWarpper>
        <YoutubeBox>
          <YoutubeImg
            src={`${ItItemPlayList.items[0].snippet.thumbnails.maxres.url}`}
            alt={`${ItItemPlayList.items[0].snippet.title}`}
            onClick={() => clickImg(ItItemPlayList.items[0].snippet)}
          />
        </YoutubeBox>
        <DescriptionBox>카테고리 설명</DescriptionBox>
      </CateMainWarpper>
      <YoutubeList>
        {ItItemPlayList.items
          .filter((item) => item.id !== ItItemPlayList.items[0].id)
          .map((item) => (
            <YoutubeContent key={item.id} item={item} clickImg={clickImg} />
          ))}
        {releaseModal && (
          <Modal
            modalPlayItem={modalPlayItem}
            closeReleasePopup={closeReleasePopup}
          />
        )}
      </YoutubeList>
    </>
  );
};
const YoutubeList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 35px;
`;
const YoutubeBox = styled.div`
  background-color: #ccc;
`;
const YoutubeImg = styled.img`
  width: 100%;
  cursor: pointer;
`;
const CateMainWarpper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px;
  margin-bottom: 30px;
`;
const DescriptionBox = styled.div``;

export default ItItem;
