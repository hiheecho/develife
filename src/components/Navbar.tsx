import styled from '@emotion/styled';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { authService } from '../firebase';
import React, { useEffect } from 'react';

interface CategoryProps {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

function Navbar({ category }: CategoryProps, { setCategory }: CategoryProps) {
  const navigate = useNavigate();

  const nowCategoryStyle: React.CSSProperties = {
    borderBottom: '3px solid #fff',
    marginBottom: 0,
    fontWeight: 700,
  };

  const onLogout = () => {
    authService
      .signOut()
      .then(() => {
        navigate('/');
      }) // logout successful
      .catch((error) => {
        console.log(error);
      }); // logout fail
  };

  return (
    <HeaderWrapper>
      <NavWrapper>
        <Title>Develife</Title>
        <NavMenuList>
          <NavMenu
            onClick={() => setCategory('')}
            style={category === '' ? nowCategoryStyle : undefined}
          >
            Home
          </NavMenu>
          <NavMenu
            onClick={() => setCategory('training')}
            style={category === 'training' ? nowCategoryStyle : undefined}
          >
            홈트레이닝
          </NavMenu>
          <NavMenu
            onClick={() => setCategory('programing')}
            style={category === 'programing' ? nowCategoryStyle : undefined}
          >
            프로그래밍
          </NavMenu>
          <NavMenu
            onClick={() => setCategory('review')}
            style={category === 'review' ? nowCategoryStyle : undefined}
          >
            IT용품리뷰
          </NavMenu>
        </NavMenuList>
      </NavWrapper>
      <AuthWrapper>
        {!authService.currentUser ? (
          <>
            <Button
              onClick={() => {
                navigate('/login');
              }}
              width="90px"
              height="35px"
            >
              로그인
            </Button>
            <Button
              onClick={() => {
                navigate('/signup');
              }}
              width="90px"
              height="35px"
            >
              회원가입
            </Button>
          </>
        ) : (
          <Button onClick={() => onLogout()} width="90px" height="35px">
            로그아웃
          </Button>
        )}
      </AuthWrapper>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.nav`
  margin: auto;
  height: 100px;
  margin-bottom: 20px;
  display: flex;
  color: #fff;
`;
const NavWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 18px;
`;
const AuthWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
`;
const Title = styled.h1`
  width: 15%;
`;
const NavMenuList = styled.ul`
  padding-left: 5%;
  display: flex;
`;
const NavMenu = styled.li`
  width: 150px;
  padding: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 3px;
  &:hover {
    border-bottom: 3px solid #fff;
    margin-bottom: 0;
    font-weight: 700;
    cursor: pointer;
  }
`;

export default Navbar;
