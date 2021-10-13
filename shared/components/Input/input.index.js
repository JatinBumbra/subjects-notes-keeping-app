import React from 'react';
import styled from 'styled-components/native';

const Input = ({ label, value, onChangeText, placehodler, error }) => {
  return (
    <Wrapper>
      {label ? <Label>{label}</Label> : null}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placehodler={placehodler}
      />
      {error ? <Error>{error}</Error> : null}
    </Wrapper>
  );
};

export default Input;

const Wrapper = styled.View``;
const Label = styled.Text``;
const TextInput = styled.TextInput`
  padding: 8px 16px;
  font-size: 16px;
  border-width: 1px;
  border-color: rgba(0, 0, 0, 0.2);
  border-style: solid;
  border-radius: 999px;
`;
const Error = styled.Text``;
