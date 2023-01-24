import React, { useState } from 'react';
import styled from '@emotion/styled';
import Modal from 'react-modal';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../firebase';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const Signup = () => {
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordCheck, setRegisterPasswordCheck] = useState('');
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isValidatePassword, setIsValidatePassword] = useState(false);

  const email_validation = new RegExp(
    /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/,
  );

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(
        authService,
        registerEmail,
        registerPassword,
      );
      setRegisterEmail('');
      setRegisterPassword('');
    } catch (err) {
      console.log(err.code);
    }
  };
  return (
    <Container>
      <div className="signContainer">
        <div className="containerTop" style={{ marginBottom: '30px' }}>
          <h3> 회원 가입</h3>
        </div>
        <form>
          <div className="inputContainer">
            <label className="labelInput" htmlFor="inputId">
              아이디
            </label>
            <input
              id="inputId"
              type="email"
              value={registerEmail}
              onChange={(e) => {
                setRegisterEmail(e.target.value);
                if (email_validation.test(e.target.value)) {
                  setIsValidateEmail(true);
                } else {
                  setIsValidateEmail(false);
                }
              }}
              placeholder="이메일 입력해주세요."
            />
            <CheckBox>
              {registerEmail ? (
                isValidateEmail ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )
              ) : null}
            </CheckBox>
          </div>
          <div className="inputContainer">
            <label className="labelInput" htmlFor="inputNickname">
              닉네임
            </label>
            <input id="inputNickname" placeholder="닉네임 입력해주세요." />
          </div>
          <div className="inputContainer">
            <label className="labelInput" htmlFor="inputPw">
              비밀번호
            </label>
            <input
              id="inputPw"
              type={'password'}
              value={registerPassword}
              onChange={(e) => {
                setRegisterPassword(e.target.value);
                if (e.target.value.length > 7) {
                  setIsValidatePassword(true);
                } else {
                  setIsValidatePassword(false);
                }
              }}
              placeholder="비밀번호 입력해주세요."
            />
            <CheckBox>
              {registerPassword ? (
                isValidatePassword ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )
              ) : null}
            </CheckBox>
          </div>
          <div className="inputContainer">
            <label className="labelInput" htmlFor="inputPwCheck">
              2차 확인
            </label>
            <input
              id="inputPwCheck"
              type={'password'}
              value={registerPasswordCheck}
              onChange={(e) => {
                setRegisterPasswordCheck(e.target.value);
              }}
              placeholder="비밀번호 2차 입력해주세요."
            />
            <CheckBox>
              {registerPasswordCheck ? (
                registerPasswordCheck === registerPassword ? (
                  <CheckCircleOutlined style={{ color: 'green' }} />
                ) : (
                  <CloseCircleOutlined style={{ color: 'red' }} />
                )
              ) : null}
            </CheckBox>
          </div>

          <SignButton
            isdisabled={
              !isValidateEmail || !(registerPasswordCheck === registerPassword)
            }
            disabled={
              !isValidateEmail || !(registerPasswordCheck === registerPassword)
            }
            onClick={register}
          >
            회원가입
          </SignButton>
        </form>
      </div>
    </Container>
  );
};

const Container = styled.div`
  background-image: url('https://mblogthumb-phinf.pstatic.net/MjAxNzAxMTJfMjE0/MDAxNDg0MjI4ODU5Mjc2.sQxFE9oQ2BFC6ZHtoilp44-EpcWN5QiWnqn1h2HWs1Ag.62dDmPKu1_h9Rii4SsfsmSPmSmnBH8Sw07LHH7NQKXAg.JPEG.ohs6888/%EC%82%AC%EB%B3%B8_-gNuN03I.jpg?type=w800');
  background-repeat: no-repeat;
  background-size: cover;

  width: 100vw;
  height: 100vh;

  font-size: 16px;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  .signContainer {
    background-color: #333;
    width: 400px;
    height: 400px;

    border-radius: 10px;
    padding: 50px;
  }

  .inputContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  input {
    width: 700px;
    height: 30px;

    border-radius: 10px;
    padding-left: 10px;
  }
`;

const SignButton = styled.button`
  margin-top: 10px;
  background-color: ${({ isdisabled }) =>
    isdisabled ? 'rgba(248, 47, 98, 0.5)' : 'rgb(248, 47, 98)'};
  color: rgb(255, 255, 255);
  font-weight: 700;
  letter-spacing: -0.1px;
  text-align: center;
  width: 300px;
  border-radius: 40px;
  font-size: 16px;
  line-height: 47px;
  height: 48px;
  border: none;
`;

const CheckBox = styled.div`
  position: absolute;
  margin-left: 270px;
  width: 20px;
`;

export default Signup;
