import React, { useState, Fragment } from 'react';
import styled from 'styled-components/native';
import actionMenuStyles from './styles';
import VertDotsIcon from '../../../shared/assets/icons/outline_more_vert_black_24dp.png';

const ActionMenuForCards = ({ item, actionMenuOptions }) => {
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

  return actionMenuOptions ? (
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
  ) : null;
};

export default ActionMenuForCards;

const ActionMenuPressable = styled.Pressable`
  ${actionMenuStyles.actionMenuPressable}
`;
const ActionMenuIcon = styled.Image`
  ${actionMenuStyles.actionMenuIcon}
`;
const ActionMenuOptions = styled.View`
  ${actionMenuStyles.actionMenuOptions}
  elevation: 8;
  right: 36px;
`;
const ActionMenuOptionPressable = styled.Pressable`
  padding: 4px 10px;
`;
const ActionMenuOptionText = styled.Text`
  color: black;
`;
