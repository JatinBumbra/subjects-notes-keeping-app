import React from 'react';
import styled from 'styled-components/native';
import inputStyles from './styles';

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

const Wrapper = styled.View`
  ${inputStyles.wrapper}
`;
const Label = styled.Text`
  ${inputStyles.label}
`;
const TextInput = styled.TextInput`
  ${inputStyles.textinput}
`;
const Error = styled.Text`
  ${inputStyles.error}
`;
