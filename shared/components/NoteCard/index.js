import React from 'react';
import styled from 'styled-components';
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

const Wrapper = styled.div`
  ${noteCardStyles.wrapper}
  position: relative;
`;
const Title = styled.p`
  ${noteCardStyles.title}
`;
const Note = styled.p`
  ${noteCardStyles.note}
`;
