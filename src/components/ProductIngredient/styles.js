import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;

  span {
    display: flex;
    font-weight: 300;
    color: #555;
  }

  span:nth-child(1) {
    margin-right: 5px;
    svg {
      color: ${props => props.theme.colors.primary};
      font-size: 25px;
      &[disabled] {
        color: #CBCBCB;
      }
    }
  }
`
