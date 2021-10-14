import { css } from 'styled-components';

const wrapper = css`
  border-radius: 8px;
  margin: 0 2%;
`;

const pressableWrapper = css`
  padding: 12px 3%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const subjectInitialLetterWrapper = css`
  width: 48px;
  height: 48px;
  background-color: black;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const subjectInitialLetter = css`
  color: white;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
`;
const detailsWrapper = css`
  margin-left: 12px;
`;
const subjectName = css`
  color: black;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
`;
const subjectMetaInfo = css`
  color: black;
  opacity: 0.5;
`;

const subjectTopicCardStyles = Object.freeze({
  wrapper,
  pressableWrapper,
  subjectInitialLetterWrapper,
  subjectInitialLetter,
  detailsWrapper,
  subjectName,
  subjectMetaInfo,
});

export default subjectTopicCardStyles;
