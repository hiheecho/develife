import React from 'react';
import Modal from '../pages/Modal';
import YoutubeContent from './YoutubeContent';
import styled from '@emotion/styled';
import { Snippet, Items } from './YoutubeBoard';

type CategoryProps = {
  ItItemPlayList: Items;
  clickImg: (value: Snippet) => void;
  releaseModal: boolean;
  modalPlayItem: Snippet | null;
  closeReleasePopup: () => void;
};

const ItItem = ({
  ItItemPlayList,
  clickImg,
  releaseModal,
  modalPlayItem,
  closeReleasePopup,
}: CategoryProps) => {
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
        <DescriptionBox>
          <DescriptionTitle>요즘 핫한 아이템 뭐가 있지 ?!</DescriptionTitle>
          <DescriptionContent>
            삶의 질 수직 상승시켜주는 it템 구경하자 !
          </DescriptionContent>
        </DescriptionBox>
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
  box-shadow: 0px 0px 10px #fff;
  height: 99%;
  width: 100%;
  overflow: hidden;
`;
const YoutubeImg = styled.img`
  width: 100%;
  cursor: pointer;
`;
const CateMainWarpper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 35px;
  margin-bottom: 100px;
  color: #fff;
`;
const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;
const DescriptionTitle = styled.p`
  font-size: 36px;
  font-weight: 700;
  text-align: center;
`;
const DescriptionContent = styled.p`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  line-height: 32px;
`;

export default ItItem;
