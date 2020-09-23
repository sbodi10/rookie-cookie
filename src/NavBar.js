import React, { useState } from 'react';
import styled from 'styled-components';

export const Tabs = [
  { label: 'All Classes', value: 'all' },
  { label: 'My Favorites', value: 'favorites' },
];

export default function NavBar(props) {
  const { onNavChange } = props;
  const [activeTab, setActiveTab] = useState(Tabs[0].value);

  function handleTabClick(tabValue) {
    setActiveTab(tabValue);
    if (onNavChange) {
      onNavChange(tabValue);
    }
  }

  function renderHeaderMenuItems() {
    return Tabs.map((tab) => {
      if (tab.value === activeTab) {
        return <HeaderItemActive key={tab.value} onClick={() => handleTabClick(tab.value)}>{tab.label}</HeaderItemActive>;
      } else {
        return <HeaderItem key={tab.value} onClick={() => handleTabClick(tab.value)}>{tab.label}</HeaderItem>;
      }
    });
  }

  return (
    <Header>
      <HeaderSection>
        <HeaderIcon>RookieCookie</HeaderIcon>
      </HeaderSection>
      <HeaderMenu>{renderHeaderMenuItems()}</HeaderMenu>
    </Header>
  );
}

NavBar.displayName = 'NavBar';

const Header = styled.header`
  background-color: #d62533;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  box-shadow: 0 0 5px 0 gray;
  z-index: 1;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-evenly;
`;

const HeaderSection = styled.div`
  margin-left: 1rem;
`;

const HeaderMenu = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderIcon = styled.div`
  color: #ffffff;
  cursor: default;
  font-family: 'bornready', cursive;
  font-size: 36px;
`;

const HeaderItem = styled.a`
  padding: 0 10px 0 10px;
  text-align: center;
  box-sizing: border-box;
  list-style-type: none;
  color: #ffffff;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const HeaderItemActive = styled.a`
  padding: 0 10px 0 10px;
  text-align: center;
  box-sizing: border-box;
  list-style-type: none;
  color: #ffffff;
  cursor: pointer;
  text-decoration: underline;
`;
