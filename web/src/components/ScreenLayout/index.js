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
        <DataList>{children}</DataList>
        <AddButtonWrapper>
          <Button label={addButtonLabel} onPress={addButtonOnPress} />
        </AddButtonWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default ScreenLayout;

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;
`;
const ContentWrapper = styled.div`
  height: 100%;
  max-width: 720px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;
const AddButtonWrapper = styled.div`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
const DataList = styled.div`
  overflow: hidden;
  overflow-y: scroll;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  height: 100%;
  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
