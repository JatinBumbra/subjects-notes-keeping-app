import React from 'react';
import styled from 'styled-components';
import inputStyles from './styles';

const Input = ({ label, value, onChangeText, placehodler, error }) => {
  return (
    <Wrapper>
      {label ? <Label>{label}</Label> : null}
      <TextInput
        value={value}
        onChange={(e) => onChangeText(e.target.value)}
        placehodler={placehodler}
      />
      {error ? <Error>{error}</Error> : null}
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.div`
  ${inputStyles.wrapper}
`;
const Label = styled.label`
  ${inputStyles.label}
  font-size: 14px;
`;
const TextInput = styled.input`
  ${inputStyles.textinput}
  margin: 8px 0;
`;
const Error = styled.p`
  ${inputStyles.error}
  font-size: 13px;
  margin-top: -4px;
`;
