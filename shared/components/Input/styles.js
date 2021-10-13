import { css } from 'styled-components';

const wrapper = css`
  margin: 10px 0;
`;
const label = css`
  margin: 4px 8px;
`;
const textinput = css`
  padding: 8px 16px;
  font-size: 16px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-radius: 999px;
`;
const error = css`
  ${label}
  color: red;
`;

const inputStyles = Object.freeze({
  wrapper,
  label,
  textinput,
  error,
});

export default inputStyles;
