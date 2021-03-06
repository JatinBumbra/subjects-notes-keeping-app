import React from 'react';
import styled from 'styled-components';

const Searchbar = ({ searchInput, setSearchInput, searchInputPlaceholder }) => {
  return (
    <InputWrapper>
      <SearchInput
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder={searchInputPlaceholder}
      />
    </InputWrapper>
  );
};

export default Searchbar;

const InputWrapper = styled.div`
  margin: 8px 5% 16px;
  background-color: rgba(0, 0, 0, 0.07);
  padding: 6px 16px;
  border-radius: 999px;
`;
const SearchInput = styled.input`
  padding: 0;
  color: black;
  font-size: 16px;
`;
