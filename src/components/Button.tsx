import styled from '@emotion/styled';

type BtnProps = {
  width: string;
  height: string;
  fontSize?: string;
};

export default styled.button`
  width: ${(props: BtnProps) => props.width};
  height: ${(props: BtnProps) => props.height};
  font-size: ${(props: BtnProps) => props.fontSize};
  background-color: #656565;
  color: #fff;
  border: none;
  border-radius: 10px;
  &:hover {
    cursor: pointer;
    background-color: #fff;
    color: #656565;
  }
`;
