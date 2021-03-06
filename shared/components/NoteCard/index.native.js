import React from 'react';
import styled from 'styled-components/native';
import noteCardStyles from './styles';
import ActionMenuForCards from '../ActionMenuForCards';

const NoteCard = ({ item, actionMenuOptions }) => {
  return (
    <Wrapper>
      <Title>{item.title}</Title>
      <Note>{item.note}</Note>
      <ActionMenuForCards item={item} actionMenuOptions={actionMenuOptions} />
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
const Note = styled.Text`
  ${noteCardStyles.note}
`;
