import React from 'react';
import styled from 'styled-components';
import { ReactComponent as SearchIcon } from '../icons/search.svg';

export default function SearchInput(props) {
  const { placeholder, onChange, onSearch, value } = props;

  function handleSearchChange(e) {
    if (onChange) {
      onChange(e.target.value);
    }
  }

  function handleClick() {
    if (onSearch) {
      onSearch();
    }
  }

  function handleKeyDown(e) {
    if (onSearch && e.key === 'Enter') {
      onSearch();
    }
  }

  return (
    <SearchContainer>
      <StyledSearch
        type="text"
        onChange={handleSearchChange}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        value={value}
      />
      <SearchIcon
        style={{
          cursor: 'pointer',
          position: 'relative',
          top: '7px',
          right: '30px',
        }}
        height="20px"
        onClick={handleClick}
      />
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
`;

const StyledSearch = styled.input`
  border-radius: 3px;
  border: 1px solid rgb(241, 241, 244);
  background: #f1f1f4;
  font-size: 16px;
  padding: 8px 35px 8px 16px;
  width: 100%;
`;
