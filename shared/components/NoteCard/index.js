import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import noteCardStyles from './styles';
import VertDotsIcon from '../../../shared/assets/icons/outline_more_vert_black_24dp.png';

const NoteCard = ({ item, actionMenuOptions }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const handleOptionPress = (onPress) => {
    setActionMenuOpen(false);
    onPress(item);
  };

  return (
    <Wrapper>
      <Title>{item.title}</Title>
      <Note>{item.note}</Note>
      {actionMenuOptions ? (
        <Fragment>
          <ActionMenuPressable
            onClick={() => setActionMenuOpen((prev) => !prev)}
          >
            <ActionMenuIcon src={VertDotsIcon} />
          </ActionMenuPressable>
          {actionMenuOpen ? (
            <ActionMenuOptions>
              {actionMenuOptions.map((option, index) => (
                <ActionMenuOptionPressable
                  key={index}
                  onClick={() => handleOptionPress(option.onPress)}
                >
                  <ActionMenuOptionText>{option.label}</ActionMenuOptionText>
                </ActionMenuOptionPressable>
              ))}
            </ActionMenuOptions>
          ) : null}
        </Fragment>
      ) : null}
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
const ActionMenuPressable = styled.div`
  position: absolute;
  right: 2%;
  top: 24px;
  cursor: pointer;
`;
const ActionMenuIcon = styled.img`
  width: 24px;
  height: 24px;
  opacity: 0.5;
`;
const ActionMenuOptions = styled.div`
  background-color: white;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 100px;
  position: absolute;
  right: 6%;
  top: 8px;
  overflow: hidden;
`;
const ActionMenuOptionPressable = styled.div`
  padding: 4px 10px;
  cursor: pointer;
`;
const ActionMenuOptionText = styled.p`
  color: black;
`;
