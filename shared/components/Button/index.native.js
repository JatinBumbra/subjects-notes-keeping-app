import React from 'react';
import styled from 'styled-components/native';
import buttonStyles from './styles';

const Button = ({ label = 'Button', onPress }) => {
  return (
    <Wrapper
      android_ripple={{ color: 'rgba(255,255,255,0.2)' }}
      onPress={onPress}
    >
      <Label>{label}</Label>
    </Wrapper>
  );
};

export default Button;

const Wrapper = styled.Pressable`
  ${buttonStyles.wrapper}
`;
const Label = styled.Text`
  ${buttonStyles.label}
`;
