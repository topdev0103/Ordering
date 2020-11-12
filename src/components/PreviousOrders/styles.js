import styled, { css } from 'styled-components'

export const SingleCard = styled.div`
  width: 100%;
  display: flex;
  height: 100px;
  border: none;
  @media(min-width: 480px){
    height: 140px;
    border-top: 1px solid #ccc;
  }
`

export const OrderPastContent = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  padding: 10px 0;
  padding-right: 5px;
  min-width: 220px;

  ${props => props.theme?.rtl && css`
    padding-left: 5px;
    padding-right: 0px;
  `}
`

export const PastLogo = styled.div`
  width: 55px;
  height: 80%;
  img {
    width: 100%;
    height: 100%;
    border-radius: 17px;
    object-fit: contain;
  }
  @media (min-width: 480px){
    width: 75px;
  }
`

export const WrapperBusinessTitle = styled.div`
  width: 95%
`

export const Reorder = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 0.8em;
  margin-right: 25px;

  ${props => props.theme?.rtl && css`
      margin-left: 25px;
      margin-right: 0;
  `}

  p {
    color: #53ad26;
    margin-block-start: 0;
    margin-block-end: 0;
  }
  button {
    margin: 5px 0;
    width: 100%;
    font-size: 0.9em;
    white-space: nowrap;
  }

  @media (min-width: 480px){
    font-size: 1em;
    button{
      width: 90%;
      font-size: 0.9em;
    }
  }

  @media (min-width: 768px){
    ${props => props.theme?.rtl ? css`
      margin-left: 0;
    ` : css`
      margin-right: 0;
    `}
    button{
      width: 80%;
    }
  }

  @media (min-width: 1024px){
    button{
      width: 50%;
    }
  }
`

export const WrappButton = styled.div`
  width: 80%;
  display: flex;
  justify-content: center;
  margin: 20px auto;

  button {
    padding: 10px 0px;
    width: 100%;
  }

  @media (min-width: 768px) {
    button {
      width: 60%;
    }
  }
`
