import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import actionMenuStyles from './styles';
import VertDotsIcon from '../../../shared/assets/icons/outline_more_vert_black_24dp.png';

const ActionMenuForCards = ({ item, actionMenuOptions }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const handleOptionPress = (onPress) => {
    setActionMenuOpen(false);
    onPress(item);
  };

  return actionMenuOptions ? (
    <Fragment>
      <ActionMenuIcon
        src={VertDotsIcon}
        onClick={() => setActionMenuOpen((prev) => !prev)}
      />
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
  ) : null;
};

export default ActionMenuForCards;

const ActionMenuIcon = styled.img`
  ${actionMenuStyles.actionMenuPressable}
  ${actionMenuStyles.actionMenuIcon}
  padding: 6px;
  border-radius: 999px;
  cursor: pointer;
  width: 32px;
  height: 32px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const ActionMenuOptions = styled.div`
  ${actionMenuStyles.actionMenuOptions}
  right: 48px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;
const ActionMenuOptionPressable = styled.div`
  padding: 8px 12px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const ActionMenuOptionText = styled.p`
  color: black;
  font-size: 14px;
`;
