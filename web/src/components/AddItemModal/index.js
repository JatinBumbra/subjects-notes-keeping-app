import React from 'react';
import styled from 'styled-components';
import Button from '../../../../shared/components/Button';

const AddItemModal = ({
  title,
  handleCancel = () => {},
  handleSave = () => {},
  children,
}) => {
  return (
    <Modal>
      <Overlay />
      <ContentWrapper>
        <ModalTitle>{title}</ModalTitle>
        <InputWrapper>{children}</InputWrapper>
        <CancelPressable onClick={handleCancel}>
          <CancelText>Cancel</CancelText>
        </CancelPressable>
        <Button label='Save' onPress={handleSave} />
      </ContentWrapper>
    </Modal>
  );
};

export default AddItemModal;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 999;
`;
const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;
const ContentWrapper = styled.div`
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 1.5rem;
  border-radius: 24px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.2);
`;
const ModalTitle = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: black;
`;
const InputWrapper = styled.div`
  margin: 5% 0;
`;
const CancelPressable = styled.button`
  margin: 4% 0;
  cursor: pointer;
`;
const CancelText = styled.span`
  text-align: center;
  font-weight: bold;
  font-size: 16px;
  color: black;
`;
