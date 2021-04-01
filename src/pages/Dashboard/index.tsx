import DashboardLayout from '@/layout/DashboardLayout'
import React, { ReactElement } from 'react'
import styled from 'styled-components'

const Header = styled.header`
  * {
    color: white !important;
  }

  p,
  h1 {
    text-align: center;
  }

  p {
    font-size: 16px !important;
    line-height: normal;
  }

  h1 {
    font-size: 36px !important;
    font-weight: bold;
    line-height: normal;
  }
`

export default function index(): ReactElement {
  return (
    <DashboardLayout>
      <Header>
        <p>Hello,</p>
        <h1>Alfian Andi</h1>
      </Header>
    </DashboardLayout>
  )
}
