import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { getAll, getHomeTrainning, getProgramming, getItItem } from '../api';
import { useState } from 'react';
import Modal from '../pages/Modal';

function YoutubeBoard({ category }) {
  const { data: AllPlayList, isLoading: isLoadingAP } = useQuery('All', getAll);
  const { data: HometrainningPlayList, isLoading: isLoadingHP } = useQuery(
    'HomeTrainning',
    getHomeTrainning,
  );
  const { data: ProgrammingPlayList, isLoading: isLoadingPG } = useQuery(
    'Programming',
    getProgramming,
  );
  const { data: ItItemPlayList, isLoading: isLoadingIT } = useQuery(
    'ItItem',
    getItItem,
  );

  const isLoading = isLoadingAP || isLoadingHP || isLoadingPG || isLoadingIT;

  const [releaseModal, setReleaseModal] = useState(false);
  const [youtubeInfo, setYoutubeInfo] = useState('');

  const closeReleasePopup = () => {
    setReleaseModal(false);
    document.body.style.overflow = 'unset';
  };

  const clickImg = (id) => {
    setReleaseModal(true);
    document.body.style.overflow = 'hidden';
    setYoutubeInfo(id.snippet);

    // router 연결 시 detail page 이동
    // 이동 시 params이용 id 전달
    console.log('youtubeId', id);
  };

  if (isLoading) {
    return <h3>로딩중 입니다.</h3>;
  }

  if (category === 'training') {
    return (
      <YoutubeList>
        {HometrainningPlayList.items.map((item) => (
          <YoutubeBox key={item.id}>
            <YoutubeImg
              src={`${item.snippet.thumbnails.high.url}`}
              alt={`${item.snippet.title}`}
              onClick={() => clickImg(item)}
            />
          </YoutubeBox>
        ))}
        {releaseModal && (
          <Modal
            closeReleasePopup={closeReleasePopup}
            youtubeInfo={youtubeInfo}
          />
        )}
      </YoutubeList>
    );
  } else if (category === 'programing') {
    return (
      <YoutubeList>
        {ProgrammingPlayList.items.map((item) => (
          <YoutubeBox key={item.id}>
            <YoutubeImg
              src={`${item.snippet.thumbnails.high.url}`}
              alt={`${item.snippet.title}`}
              onClick={() => clickImg(item)}
            />
          </YoutubeBox>
        ))}
        {releaseModal && (
          <Modal
            closeReleasePopup={closeReleasePopup}
            youtubeInfo={youtubeInfo}
          />
        )}
      </YoutubeList>
    );
  } else if (category === 'review') {
    return (
      <YoutubeList>
        {ItItemPlayList.items.map((item) => (
          <YoutubeBox key={item.id}>
            <YoutubeImg
              src={`${item.snippet.thumbnails.high.url}`}
              alt={`${item.snippet.title}`}
              onClick={() => clickImg(item)}
            />
          </YoutubeBox>
        ))}
        {releaseModal && (
          <Modal
            closeReleasePopup={closeReleasePopup}
            youtubeInfo={youtubeInfo}
          />
        )}
      </YoutubeList>
    );
  }
  return (
    <YoutubeList>
      {AllPlayList.items.map((item) => (
        <YoutubeBox key={item.id}>
          <YoutubeImg
            src={`${item.snippet.thumbnails.high.url}`}
            alt={`${item.snippet.title}`}
            onClick={() => clickImg(item)}
          />
        </YoutubeBox>
      ))}
      {releaseModal && (
        <Modal
          closeReleasePopup={closeReleasePopup}
          youtubeInfo={youtubeInfo}
        />
      )}
    </YoutubeList>
  );
}

export default YoutubeBoard;

const YoutubeList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 35px;
`;
const YoutubeBox = styled.div`
  // 유튜브 들어오면 지워주기
  background-color: #ccc;
  //
`;
const YoutubeImg = styled.img`
  width: 100%;
  cursor: pointer;
`;
