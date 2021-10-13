import React from 'react';
import styled from 'styled-components/native';
import headerStyles from './styles';

const Header = ({ title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.View`
  ${headerStyles.wrapper}
`;
const Title = styled.Text`
  ${headerStyles.title}
`;
