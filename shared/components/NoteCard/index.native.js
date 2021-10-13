import React from 'react';
import styled from 'styled-components/native';
import noteCardStyles from './styles';

const NoteCard = ({ item }) => {
  return (
    <Wrapper>
      <Title>{item.title}</Title>
      <Note>{item.note}</Note>
    </Wrapper>
  );
};

export default NoteCard;

const Wrapper = styled.View`
  ${noteCardStyles.wrapper}
`;
const Title = styled.Text`
  ${noteCardStyles.title}
`;
const Note = styled.Text``;
