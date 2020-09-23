import React from 'react';
import styled from 'styled-components';

export default function Button(props) {
  const { children, onClick } = props;
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
}

const StyledButton = styled.button`
  color: #fff;
  cursor: pointer;
  margin: 0;
  padding: 10px 20px;
  font-size: 18px;
  border-width: 0;
  border-radius: 3px;
  background-color: #d62533;
  margin-top: 1rem;
`;
