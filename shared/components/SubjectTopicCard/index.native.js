import React, { useState, Fragment } from 'react';
import styled from 'styled-components/native';
import subjectTopicCardStyles from './styles';
import VertDotsIcon from '../../../shared/assets/icons/outline_more_vert_black_24dp.png';

const SubjectTopicCard = ({ item, onPress, actionMenuOptions }) => {
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
      <Pressable android_ripple={android_ripple} onPress={onPress}>
        <SubjectInitialLetterWrapper>
          <SubjectInitialLetter>C</SubjectInitialLetter>
        </SubjectInitialLetterWrapper>
        <DetailsWrapper>
          <SubjectName>{item.name}</SubjectName>
          <SubjectMetaInfo>4 Topics / 12 Notes</SubjectMetaInfo>
        </DetailsWrapper>
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
      </Pressable>
    </Wrapper>
  );
};

export default SubjectTopicCard;

const Wrapper = styled.View`
  ${subjectTopicCardStyles.wrapper}
`;
const Pressable = styled.Pressable`
  ${subjectTopicCardStyles.pressableWrapper}
`;
const SubjectInitialLetterWrapper = styled.View`
  ${subjectTopicCardStyles.subjectInitialLetterWrapper}
`;
const SubjectInitialLetter = styled.Text`
  ${subjectTopicCardStyles.subjectInitialLetter}
`;
const DetailsWrapper = styled.View`
  ${subjectTopicCardStyles.detailsWrapper}
`;
const SubjectName = styled.Text`
  ${subjectTopicCardStyles.subjectName}
`;
const SubjectMetaInfo = styled.Text`
  ${subjectTopicCardStyles.subjectMetaInfo}
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
