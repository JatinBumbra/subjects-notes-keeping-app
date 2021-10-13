import React from 'react';
import styled from 'styled-components/native';
import subjectTopicCardStyles from './styles';

const SubjectTopicCard = ({ item, onPress }) => {
  return (
    <Wrapper>
      <Pressable
        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
        onPress={onPress}
      >
        <SubjectInitialLetterWrapper>
          <SubjectInitialLetter>C</SubjectInitialLetter>
        </SubjectInitialLetterWrapper>
        <DetailsWrapper>
          <SubjectName>{item.name}</SubjectName>
          <SubjectMetaInfo>4 Topics / 12 Notes</SubjectMetaInfo>
        </DetailsWrapper>
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
