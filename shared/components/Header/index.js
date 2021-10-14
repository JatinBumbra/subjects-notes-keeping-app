import React from 'react';
import styled from 'styled-components';
import headerStyles from './styles';

const Header = ({ title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  ${headerStyles.wrapper}
`;
const Title = styled.p`
  ${headerStyles.title}
`;
