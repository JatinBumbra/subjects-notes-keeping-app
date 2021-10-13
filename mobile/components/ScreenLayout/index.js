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
  noDataText,
}) => {
  return (
    <Wrapper>
      <Header title={headerTitle} />
      <Searchbar
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        searchInputPlaceholder={searchInputPlaceholder}
      />
      {renderData && renderData?.length ? (
        <DataList
          data={renderData}
          renderItem={renderComponent}
          keyExtractor={item => item.id}
        />
      ) : (
        <NoDataWrapper>
          <NoDataText>{noDataText}</NoDataText>
        </NoDataWrapper>
      )}
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
const NoDataWrapper = styled.View`
  margin: 5%;
`;
const NoDataText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: black;
  text-align: center;
`;
const AddButtonWrapper = styled.View`
  position: absolute;
  right: 16px;
  bottom: 16px;
`;
