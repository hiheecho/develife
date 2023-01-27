import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { IoChevronDownCircle, IoCut, IoCloseCircle } from 'react-icons/io5';
import { useState } from 'react';
import { authService, dbService } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Comment } from './ContentsList';

type ContentProps = {
  item: Comment;
  contents: Comment[];
};

export default function Content({ item, contents }: ContentProps) {
  const [dropDown, setDropDown] = useState(false);
  const [editContentValue, setEditContentValue] = useState(item.text);

  // Content delete하기
  const deleteContent = async (id: string) => {
    let con = window.confirm('정말 삭제하시겠습니까?');
    if (con === true) {
      await deleteDoc(doc(dbService, 'test', id));
      alert('삭제하였습니다.');
    } else {
      alert('취소하였습니다.');
      setDropDown(false);
    }
  };
  // Content edit하기
  const Edit = async (id: string) => {
    const idx = contents.findIndex((item) => item.id === id);
    await updateDoc(doc(dbService, 'test', id), {
      isEdit: !contents[idx].isEdit,
    });
  };

  const EditContent = async (id: string) => {
    const editContent = editContentValue?.trim();
    if (!editContent) {
      setEditContentValue('');
      return alert('입력한 글이 없습니다.');
    }
    await updateDoc(doc(dbService, 'test', id), {
      text: editContent,
      isEdit: false,
    });
    setDropDown(false);
  };

  const EditCancel = async (id: string) => {
    await updateDoc(doc(dbService, 'test', id), {
      isEdit: false,
    });
    setDropDown(false);
    setEditContentValue(item.text);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  //useState(authService.currentUser);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  });

  //authService.currentUser.uid === item.userId && (드랍박스 보이고)

  return (
    <ContentsItem key={item.id}>
      <ContentsIdContainer>
        {item.isEdit ? (
          <>
            <>
              <ContentsId>{item?.userName}</ContentsId>
              <button
                onClick={() => {
                  EditContent(item.id);
                }}
              >
                확인
              </button>
              <button
                onClick={() => {
                  EditCancel(item.id);
                }}
              >
                취소
              </button>
            </>
            <input
              onChange={(e) => {
                setEditContentValue(e.target.value);
              }}
              type="text"
              autoFocus={true}
              value={editContentValue}
              placeholder="댓글을 작성해주세요."
              maxLength="32"
            />
          </>
        ) : (
          <>
            <ContentsId>{item?.userName}</ContentsId>
            {/*(if(authService.currentUser.uid === item.userId)*/}
            {isLoggedIn && authService.currentUser?.uid === item.userId ? (
              <IoChevronDownCircle
                onClick={() => {
                  setDropDown(!dropDown);
                }}
                size={24}
              />
            ) : null}

            {dropDown === true ? (
              <DropDownBox>
                <IoCut
                  size={32}
                  onClick={() => {
                    Edit(item.id);
                  }}
                />
                <IoCloseCircle
                  size={32}
                  onClick={() => {
                    deleteContent(item.id);
                  }}
                />
              </DropDownBox>
            ) : null}
            <ContentsText>{item.text}</ContentsText>
          </>
        )}
      </ContentsIdContainer>
    </ContentsItem>
  );
}

const ContentsItem = styled.div`
  margin-bottom: 12px;
`;
const ContentsId = styled.div`
  font-weight: 600;
  margin-bottom: 10px;
`;
const ContentsText = styled.div`
  border-radius: 8px;
  background-color: #fff;
  padding-left: 12px;
  height: 4vh;
  overflow-wrap: break-word;
`;

const DropDownBox = styled.div`
  position: absolute;
  background-color: #fff;
  z-index: 300;
  height: auto;
  width: auto;
`;
const ContentsIdContainer = styled.div``;
