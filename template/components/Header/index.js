import React from 'react'
import {
  Header as HeaderContainer, HeaderInvert, InnerHeader, LogoHeader, LeftHeader, RightHeader, Menu, MenuLink
} from './styles'

import { Select } from '../../../src/styles/Select'
import { useLocation, Link } from 'react-router-dom'

import { useSession, LanguageSelector, useApi } from 'ordering-components'

import logoHeader from '../../assets/images/logo-header.svg'
import logoHeaderInvert from '../../assets/images/logo-header-invert.svg'

export const Header = (props) => {
  const location = useLocation()
  const [{ auth }] = useSession()

  const isHome = location.pathname === '/' || location.pathname === '/home'
  const HeaderType = isHome ? HeaderInvert : HeaderContainer

  // const languages = [{ value: 1, content: 'English', showOnSelected: 'EN' }, { value: 3, content: 'Español', showOnSelected: 'ES' }]
  // console.log(languages)

  const [ordering] = useApi()

  return (
    <HeaderType>
      <InnerHeader>
        <LeftHeader>
          <LogoHeader>
            <Link to='/'>
              <img src={isHome ? logoHeaderInvert : logoHeader} />
            </Link>
          </LogoHeader>
        </LeftHeader>
        <RightHeader>
          <Menu>
            {
              !auth && (
                <>
                  <MenuLink to='/signin'>Sign In</MenuLink>
                  <MenuLink to='/signup' highlight={1}>Sign Up</MenuLink>
                </>
              )
            }
            {/* <Select options={languages} defaultValue={1} /> */}
          </Menu>
        </RightHeader>
      </InnerHeader>
    </HeaderType>
  )
}
