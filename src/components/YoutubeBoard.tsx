import styled from '@emotion/styled';
import { useQuery } from 'react-query';
import { getAll, getHomeTrainning, getProgramming, getItItem } from '../api';
import { useState } from 'react';
import Modal from '../pages/Modal';
import YoutubeContent from './YoutubeContent';
import Training from './Training';
import Programing from './Programing';
import ItItem from './ItItem';

type CategoryProps = {
  category: string;
};
export interface Items {
  items: [
    {
      id: string;
      snippet: {
        title: string;
        description: string;
        thumbnails: {
          high: {
            url: string;
          };
          maxres: {
            url: string;
          };
        };
        resourceId: {
          videoId: string;
        };
      };
    },
  ];
}
export interface Item {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    resourceId: {
      videoId: string;
    };
  };
}
export interface Snippet {
  title: string;
  description: string;
  thumbnails: {
    high: {
      url: string;
    };
  };
  resourceId: {
    videoId: string;
  };
}
function YoutubeBoard({ category }: CategoryProps) {
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
  const [modalPlayItem, setModalPlayItem] = useState<Snippet | null>(null);

  const clickImg = (snippet: Snippet) => {
    setReleaseModal(true);
    document.body.style.overflow = 'hidden';
    setModalPlayItem(snippet);
  };

  const closeReleasePopup = () => {
    setReleaseModal(false);
    setModalPlayItem(null);
    document.body.style.overflow = 'unset';
  };

  if (isLoading) {
    return <h3>로딩중 입니다.</h3>;
  }

  if (category === 'training') {
    return (
      <Training
        HometrainningPlayList={HometrainningPlayList}
        clickImg={clickImg}
        releaseModal={releaseModal}
        closeReleasePopup={closeReleasePopup}
        modalPlayItem={modalPlayItem}
      />
    );
  } else if (category === 'programing') {
    return (
      <Programing
        ProgrammingPlayList={ProgrammingPlayList}
        clickImg={clickImg}
        releaseModal={releaseModal}
        closeReleasePopup={closeReleasePopup}
        modalPlayItem={modalPlayItem}
      />
    );
  } else if (category === 'review') {
    return (
      <ItItem
        ItItemPlayList={ItItemPlayList}
        clickImg={clickImg}
        releaseModal={releaseModal}
        closeReleasePopup={closeReleasePopup}
        modalPlayItem={modalPlayItem}
      />
    );
  }
  return (
    <YoutubeList>
      {AllPlayList.items.map((item: Item) => (
        <YoutubeContent key={item.id} item={item} clickImg={clickImg} />
      ))}
      {releaseModal && (
        <Modal
          modalPlayItem={modalPlayItem}
          releaseModal={releaseModal}
          closeReleasePopup={closeReleasePopup}
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
