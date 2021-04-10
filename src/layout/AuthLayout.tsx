import Container from '@/components/Container'
import React, { ReactElement } from 'react'
import styled from 'styled-components'
import useHistoryPusher from '@/hooks/useHistoryPusher'
import Typography from '@/components/Typography'
import { useHistory } from 'react-router-dom'

type Props = React.HTMLAttributes<HTMLElement>

const Background = styled.div`
  background-color: ${(props) => props.theme.color.primary};
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
`

const AuthContainer = styled(Container)`
  background-color: ${(props) => props.theme.color.primary};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Logo = styled.img`
  height: 16px;
  margin-top: 28px;
  cursor: pointer;
`

const StyledAuthHeading = styled(Typography)`
  font-size: 24px !important;
  font-weight: bold;
  color: white !important;
  text-align: center;
  margin-bottom: 36px;
`

const StyledAuthFooterLabel = styled(Typography)`
  * {
    color: white !important;
  }
  margin-top: 16px;
  text-align: center;

  b {
    font-weight: bold;
    cursor: pointer;
  }
`

const AuthInputGroup = styled.section`
  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`

const AuthHeading = (props: Props): ReactElement => (
  <StyledAuthHeading variant="h1" {...props}>
    {props.children}
  </StyledAuthHeading>
)

const AuthFooterLabel = (props: Props): ReactElement => (
  <StyledAuthFooterLabel variant="p" {...props}>
    {props.children}
  </StyledAuthFooterLabel>
)

export default function AuthLayout(props: Props): ReactElement {
  const historyPusher = useHistoryPusher()
  const history = useHistory()
  const toStartPage = () => historyPusher.toStartPage()
  return (
    <>
      <Background />
      <AuthContainer {...props}>
        {history.location.pathname !== '/' && (
          <Logo
            src="/MaoJajan-logo--white.svg"
            alt="MaoJajan logo"
            onClick={toStartPage}
          />
        )}
        {props.children}
      </AuthContainer>
    </>
  )
}

export { AuthHeading, AuthInputGroup, AuthFooterLabel }
