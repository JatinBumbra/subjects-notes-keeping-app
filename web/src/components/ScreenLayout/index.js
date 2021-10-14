import React from 'react';
import styled from 'styled-components';
import Header from '../../../../shared/components/Header';
import Searchbar from '../../../../shared/components/Searchbar';
import Button from '../../../../shared/components/Button';

const ScreenLayout = ({
  headerTitle,
  searchInput,
  setSearchInput,
  searchInputPlaceholder,
  children,
  addButtonLabel,
  addButtonOnPress,
}) => {
  return (
    <Wrapper>
      <ContentWrapper>
        <Header title={headerTitle} />
        <Searchbar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchInputPlaceholder={searchInputPlaceholder}
        />
        {children}
        <AddButtonWrapper>
          <Button label={addButtonLabel} onPress={addButtonOnPress} />
        </AddButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ScreenLayout;

const Wrapper = styled.div``;
const ContentWrapper = styled.div`
  max-width: 720px;
  margin: auto;
`;
const AddButtonWrapper = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
