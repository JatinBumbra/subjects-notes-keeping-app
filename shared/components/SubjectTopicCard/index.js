import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import subjectTopicCardStyles from './styles';
import VertDotsIcon from '../../../shared/assets/icons/outline_more_vert_black_24dp.png';

const SubjectTopicCard = ({ item, onPress, actionMenuOptions }) => {
  const [actionMenuOpen, setActionMenuOpen] = useState(false);

  const handleOptionPress = (onPress) => {
    setActionMenuOpen(false);
    onPress(item);
  };

  return (
    <Wrapper>
      <SubjectInitialLetterWrapper>
        <SubjectInitialLetter>C</SubjectInitialLetter>
      </SubjectInitialLetterWrapper>
      <DetailsWrapper onClick={onPress}>
        <SubjectName>{item.name}</SubjectName>
        <SubjectMetaInfo>4 Topics / 12 Notes</SubjectMetaInfo>
      </DetailsWrapper>
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

export default SubjectTopicCard;

const Wrapper = styled.div`
  ${subjectTopicCardStyles.wrapper}
  ${subjectTopicCardStyles.pressableWrapper}
  position: relative;
  width: 100%;
  cursor: pointer;
`;
const SubjectInitialLetterWrapper = styled.div`
  ${subjectTopicCardStyles.subjectInitialLetterWrapper}
`;
const SubjectInitialLetter = styled.p`
  ${subjectTopicCardStyles.subjectInitialLetter}
`;
const DetailsWrapper = styled.div`
  ${subjectTopicCardStyles.detailsWrapper}
`;
const SubjectName = styled.p`
  ${subjectTopicCardStyles.subjectName}
`;
const SubjectMetaInfo = styled.p`
  ${subjectTopicCardStyles.subjectMetaInfo}
`;
const ActionMenuPressable = styled.div`
  position: absolute;
  right: 2%;
  top: 24px;
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
`;
const ActionMenuOptionText = styled.p`
  color: black;
`;
