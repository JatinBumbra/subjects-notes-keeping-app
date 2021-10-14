import { css } from 'styled-components';

const actionMenuPressable = css`
  position: absolute;
  right: 2%;
  top: 24px;
`;
const actionMenuIcon = css`
  width: 24px;
  height: 24px;
  opacity: 0.5;
`;
const actionMenuOptions = css`
  background-color: white;
  border-radius: 8px;
  width: 100px;
  position: absolute;
  top: 8px;
  overflow: hidden;
`;

const actionMenuStyles = Object.freeze({
  actionMenuPressable,
  actionMenuIcon,
  actionMenuOptions,
});

export default actionMenuStyles;
