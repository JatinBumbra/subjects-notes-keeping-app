import React from 'react';
import styled from 'styled-components/native';
import Header from '../../../shared/components/Header';
import Searchbar from '../../../shared/components/Searchbar';

const ScreenLayout = ({
  headerTitle,
  searchInput,
  setSearchInput,
  searchInputPlaceholder,
  renderData,
  renderComponent,
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
    </Wrapper>
  );
};

export default ScreenLayout;

const Wrapper = styled.View``;
const DataList = styled.FlatList``;
