import { css } from 'styled-components';

const wrapper = css`
  padding: 16px;
  margin: 1% 2%;
  border-bottom-width: 1px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
`;
const title = css`
  font-weight: bold;
  font-size: 16px;
  color: black;
`;
const note = css``;

const noteCardStyles = Object.freeze({
  wrapper,
  title,
  note,
});

export default noteCardStyles;
