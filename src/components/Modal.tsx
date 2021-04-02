import React, { ReactElement } from 'react'
import styled from 'styled-components'

interface Props extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  closeHandler?: () => void
}

const ModalContainer = styled.section`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0px;
  z-index: 10;
  display: flex;
  top: 0;
`

const Backdrop = styled.div`
  background-color: rgba(50, 50, 44, 0.25);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
`

const ModalWrapper = styled.main`
  position: relative;
  max-width: 300px;
  background-color: white;
  padding: 16px;
  margin: auto;
  z-index: 11;
  width: 100%;
  border-radius: 5px;
`

const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;

  img {
    cursor: pointer;
  }
`

const ModalTitle = styled.h1`
  line-height: normal;
  font-size: 24px !important;
  font-weight: bold;
`

const ModalContent = styled.section`
  margin-bottom: 16px;
`

export default function Modal(props: Props): ReactElement {
  const closeModal = () => props.closeHandler && props.closeHandler()

  return (
    <ModalContainer {...props}>
      <ModalWrapper>
        <ModalHeader>
          {props.header}
          <img
            src="cross--danger.svg"
            alt="Close modal"
            onClick={closeModal}
            aria-hidden="true"
          />
        </ModalHeader>
        {props.content}
        {props.footer}
      </ModalWrapper>
      <Backdrop onClick={closeModal} />
    </ModalContainer>
  )
}

export { ModalTitle, ModalContent }

const header = () => <></>
header.displayName = 'header'

const content = () => <></>
content.displayName = 'content'

const footer = () => <></>
footer.displayName = 'footer'

Modal.defaultProps = {
  header,
  content,
  footer,
  closeHandler: () => {},
}

Modal.displayName = 'Modal'
