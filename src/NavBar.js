import React from 'react'
import styled from 'styled-components'

const NavBar = props => {
  return (
    <Header>
      <HeaderMenu>
        <HeaderItem>
          RookieCookie
        </HeaderItem>
      </HeaderMenu>
    </Header>
  )
}
export default NavBar

NavBar.displayName = 'NavBar'

const Header = styled.header`
  background-color: #00c4ff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 25px;
  box-shadow: 0 0 5px 0 gray;
`
const HeaderMenu = styled.div`
  margin-top: 0px;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  display: flex;
`
const HeaderItem = styled.div`
  padding: 0 10px 0 10px;
  text-align: center;
  box-sizing: border-box;
  list-style-type: none;
`
