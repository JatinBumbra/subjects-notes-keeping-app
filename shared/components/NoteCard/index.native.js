import React, { useState, Fragment } from 'react';
import styled from 'styled-components/native';
import noteCardStyles from './styles';
import VertDotsIcon from '../../../shared/assets/icons/outline_more_vert_black_24dp.png';

const NoteCard = ({ item, actionMenuOptions }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const android_ripple = { color: 'rgba(0,0,0,0.1)' };
  const icon_ripple = {
    color: 'rgba(0,0,0,0.1)',
    borderless: true,
    radius: 24,
  };
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
            hitSlop={48}
            android_ripple={icon_ripple}
            onPress={() => setActionMenuOpen((prev) => !prev)}
          >
            <ActionMenuIcon source={VertDotsIcon} />
          </ActionMenuPressable>
          {actionMenuOpen ? (
            <ActionMenuOptions>
              {actionMenuOptions.map((option, index) => (
                <ActionMenuOptionPressable
                  key={index}
                  android_ripple={android_ripple}
                  onPress={() => handleOptionPress(option.onPress)}
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

const Wrapper = styled.View`
  ${noteCardStyles.wrapper}
`;
const Title = styled.Text`
  ${noteCardStyles.title}
`;
const Note = styled.Text`
  ${noteCardStyles.note}
`;
const ActionMenuPressable = styled.Pressable`
  position: absolute;
  right: 2%;
  top: 24px;
`;
const ActionMenuIcon = styled.Image`
  width: 24px;
  height: 24px;
  opacity: 0.5;
`;
const ActionMenuOptions = styled.View`
  background-color: white;
  elevation: 8;
  border-radius: 8px;
  width: 100px;
  position: absolute;
  right: 10%;
  top: 8px;
  overflow: hidden;
`;
const ActionMenuOptionPressable = styled.Pressable`
  padding: 4px 10px;
`;
const ActionMenuOptionText = styled.Text`
  color: black;
`;
