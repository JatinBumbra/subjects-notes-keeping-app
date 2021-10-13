import React from 'react';
import styled from 'styled-components/native';

const Searchbar = ({ searchInput, setSearchInput, searchInputPlaceholder }) => {
  return (
    <InputWrapper>
      <SearchInput
        value={searchInput}
        onChangeText={setSearchInput}
        placeholder={searchInputPlaceholder}
        placeholderTextColor={'rgba(0,0,0,0.4)'}
      />
    </InputWrapper>
  );
};

export default Searchbar;

const InputWrapper = styled.View`
  margin: 8px 5% 16px;
  background-color: rgba(0, 0, 0, 0.07);
  padding: 6px 16px;
  border-radius: 999px;
`;
const SearchInput = styled.TextInput`
  padding: 0;
  color: black;
  font-size: 16px;
`;
