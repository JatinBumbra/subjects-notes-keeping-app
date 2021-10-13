import React from 'react';
import styled from 'styled-components/native';
import Button from '../../../shared/components/Button';

const AddItemModal = ({
  title,
  visible,
  handleCancel = () => {},
  handleSave = () => {},
  children,
}) => {
  return (
    <Modal visible={visible} transparent>
      <Overlay />
      <ContentWrapper>
        <ModalTitle>{title}</ModalTitle>
        <InputWrapper>{children}</InputWrapper>
        <CancelPressable onPress={handleCancel}>
          <CancelText>Cancel</CancelText>
        </CancelPressable>
        <Button label="Save" onPress={handleSave} />
      </ContentWrapper>
    </Modal>
  );
};

export default AddItemModal;

const Modal = styled.Modal``;
const Overlay = styled.View`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ContentWrapper = styled.View`
  background-color: white;
  margin-top: auto;
  padding: 5%;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;
const ModalTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
const InputWrapper = styled.View`
  margin: 5% 0;
`;
const CancelPressable = styled.Pressable`
  margin: 4%;
`;
const CancelText = styled.Text`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
`;
