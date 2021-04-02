import styled from 'styled-components'

const LeftCart = styled.div`
  background-color: ${(props) => props.theme.color.secondary};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 46px;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
`

const CardContent = styled.div`
  background-color: white;
  width: 100%;
  border-radius: 0 5px 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 14px;
  cursor: pointer;

  h2 {
    font-size: 16px;
    font-weight: bold;
    line-height: normal;
  }

  p {
    font-size: 12px;
    color: ${(props) => props.theme.color.gray};
    line-height: normal;
  }
`

const CardTrash = styled.div`
  position: absolute;
  right: 18px;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
`

const CardItemContainer = styled.section<{ disabled: boolean }>`
  height: 64px;
  display: flex;
  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  border-radius: 5px;

  ${CardContent} {
    background-color: ${(props) => (props.disabled ? '#D7D7D7' : 'white')};
  }

  ${LeftCart} {
    background-color: ${(props) =>
      props.disabled ? props.theme.color.gray : props.theme.color.secondary};
  }
`

export { CardTrash, CardItemContainer, LeftCart, CardContent }
