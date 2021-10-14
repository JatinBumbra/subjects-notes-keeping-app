import React from 'react';
import styled from 'styled-components/native';
import subjectTopicCardStyles from './styles';
import ActionMenuForCards from '../ActionMenuForCards';

const SubjectTopicCard = ({ item, onPress, actionMenuOptions }) => {
  const android_ripple = { color: 'rgba(0,0,0,0.1)' };

  return (
    <Wrapper>
      <Pressable android_ripple={android_ripple} onPress={onPress}>
        <SubjectInitialLetterWrapper>
          <SubjectInitialLetter>{item.name.slice(0, 1)}</SubjectInitialLetter>
        </SubjectInitialLetterWrapper>
        <DetailsWrapper>
          <SubjectName>{item.name}</SubjectName>
        </DetailsWrapper>
        <ActionMenuForCards item={item} actionMenuOptions={actionMenuOptions} />
      </Pressable>
    </Wrapper>
  );
};

export default SubjectTopicCard;

const Wrapper = styled.View`
  ${subjectTopicCardStyles.wrapper}
  overflow: hidden;
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
