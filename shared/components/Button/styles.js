import { css } from 'styled-components';

const wrapper = css`
  background-color: black;
  padding: 10px 24px;
  border-radius: 999px;
`;
const label = css`
  color: white;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
`;

const buttonStyles = Object.freeze({
  wrapper,
  label,
});

export default buttonStyles;
