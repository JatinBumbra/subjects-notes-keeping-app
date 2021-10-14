import React from 'react';
import styled from 'styled-components';
import buttonStyles from './styles';

const Button = ({ label = 'Button', onPress }) => {
  return (
    <Wrapper onClick={onPress}>
      <Label>{label}</Label>
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.button`
  ${buttonStyles.wrapper}
  cursor: pointer;
`;
const Label = styled.span`
  ${buttonStyles.label}
`;
