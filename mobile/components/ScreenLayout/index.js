import React from 'react';
import styled from 'styled-components/native';
import Header from '../../../shared/components/Header';
import Searchbar from '../../../shared/components/Searchbar';
import Button from '../../../shared/components/Button';

const ScreenLayout = ({
  headerTitle,
  searchInput,
  setSearchInput,
  searchInputPlaceholder,
  renderData,
  renderComponent,
  children,
  addButtonLabel,
  addButtonOnPress,
}) => {
  return (
    <Wrapper>
      <Header title={headerTitle} />
      <Searchbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchInputPlaceholder={searchInputPlaceholder}
      />
      <DataList
        data={renderData}
        renderItem={renderComponent}
        keyExtractor={item => item.id}
      />
      {children}
      <AddButtonWrapper>
        <Button label={addButtonLabel} onPress={addButtonOnPress} />
      </AddButtonWrapper>
    </Wrapper>
  );
};

export default ScreenLayout;

const Wrapper = styled.View`
  flex: 1;
`;
const DataList = styled.FlatList``;
const AddButtonWrapper = styled.View`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
