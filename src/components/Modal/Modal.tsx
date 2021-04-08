import React, { ReactElement } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

interface ModalProps extends React.HTMLAttributes<HTMLElement> {
  header?: React.ReactNode
  content?: React.ReactNode
  footer?: React.ReactNode
  closeHandler?: () => void
  isShow: boolean
}

const ModalContainer = styled.section`
  position: fixed;
  left: 50%;
  z-index: 10;
  display: flex;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 11;
  width: 100%;
  max-width: 300px;
`

const Backdrop = styled.div`
  background-color: ${(props) => props.theme.color.dark};
  opacity: 0.25;
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
`

const ModalWrapper = styled.main`
  position: relative;
  background-color: white;
  padding: 16px;
  margin: auto;
  width: 100%;
  height: 100%;
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

export default function Modal(props: ModalProps): ReactElement {
  const closeModal = () => props.closeHandler && props.closeHandler()

  return (
    <>
      <CSSTransition
        in={props.isShow}
        timeout={500}
        unmountOnExit
        classNames="modal"
      >
        <ModalContainer {...props}>
          <ModalWrapper>
            <ModalHeader>
              {props.header}
              <img
                src="/cross--danger.svg"
                alt="Close modal"
                onClick={closeModal}
                aria-hidden="true"
              />
            </ModalHeader>
            {props.content}
            {props.footer}
          </ModalWrapper>
        </ModalContainer>
      </CSSTransition>
      <CSSTransition
        in={props.isShow}
        timeout={500}
        unmountOnExit
        classNames="backdrop-modal"
      >
        <Backdrop onClick={closeModal} />
      </CSSTransition>
    </>
  )
}

export { ModalTitle, ModalContent }
export type { ModalProps }

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
