import React from 'react';
import styled from 'styled-components';
import subjectTopicCardStyles from './styles';
import ActionMenuForCards from '../ActionMenuForCards';

const SubjectTopicCard = ({ item, onPress, actionMenuOptions }) => {
  return (
    <Wrapper>
      <SubjectInitialLetterWrapper>
        <SubjectInitialLetter>{item.name.slice(0, 1)}</SubjectInitialLetter>
      </SubjectInitialLetterWrapper>
      <DetailsWrapper onClick={onPress}>
        <SubjectName>{item.name}</SubjectName>
      </DetailsWrapper>
      <ActionMenuForCards item={item} actionMenuOptions={actionMenuOptions} />
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
