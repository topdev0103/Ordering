import { lighten } from 'polished'
import styled, { css } from 'styled-components'

export const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 100vh;
  position: relative;

  @media (min-width: 768px) {
    height: 100%;
  }

  @media (min-width: 1201px) {
    flex-wrap: nowrap;
  }
`

export const WrapperImage = styled.div`
  width: 100%;
  position: relative;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 1201px) {
    width: calc(50% - 10px);
    top: 0;
  }
`

export const ProductImage = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 300px;

  img {
    border-radius: 16px;
    object-fit: contain;
    height: 100%;
    box-sizing: border-box;
  }

  @media (min-width: 1201px) {
    height: auto;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px;
  position: relative;
  margin-top: 10px;

  h1 {
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    color: #263238;
    margin-top: 0px;
    ${props => props.theme?.rtl && css`
      text-align: right;
    `}
  }

  p {
    font-size: 14px;
    font-weight: 200;
    text-align: left;
    margin-top: 0px;

    line-height: 1.5em;
    width: 100%;
    ${props => props.theme?.rtl && css`
      text-align: right;
    `}
  }

  @media (min-width: 381px) {
    h1 {
      font-size: 24px;
    }
    p {
      font-size: 16px;
    }
  }

  @media (min-width: 411px) {
    padding: 10px 0px;
  }

  @media (min-width: 1201px) {
    width: calc(50% - 20px);
    padding: 0px 10px;
    top: 0;
    margin-top: 0px;

    h1 {
      text-align: left;

      ${props => props.theme?.rtl && css`
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    }
  }
`

export const ProductEdition = styled.div``

export const SectionTitle = styled.h3`
  font-size: 18px;
  padding: 15px 0px;
  margin: 0px;
  font-weight: 600;
  color: #333333;
`

export const ProductComment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 115px;

  p {
    font-weight: 300;
    margin-bottom: 5px;
  }
  textarea {
    font-size: 16px;
    font-weight: 300;
    padding: 10px;
    border: 1px solid #CCC;
    outline: none;
    color: #555;
    resize: none;
    border-radius: 10px;

    &:focus {
      border-color: #555;
    }
  }

  @media (min-width: 577px) {
    margin-bottom: 62px;
  }

  @media (min-width: 769px) {
    margin-bottom: 0px;
  }
`

export const ProductActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0px;
  width: 100%;

  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  background-color: #FFF;

  div.incdec-control {
    width: 50%;
    display: flex;
    justify-content: space-around;
    align-items: center;

    svg {
      width: 35px;
      height: 35px;
      cursor: pointer;
    }
  }
  div:last-child {
    width: 100%;
    display: flex;
    align-items: center;
  }

  button:disabled,
  button.disabled,
  svg.disabled {
    opacity: 0.5;
  }

  svg.disabled {
    pointer-events: none;
  }

  button.add {
    width: 90%;
    padding: 5px 10px;
    margin: 10px 0px 0px;
    position: relative;

    span:last-child {
      position: absolute;
      right: 0;
      margin-right: 10px;

      ${props => props.theme?.rtl && css`
        position: absolute;
        left: 0;
        right: initial;
        margin-left: 10px;
        margin-right: 0px;
      `}
    }
    &.soldout {
      width: 100%;
      cursor: not-allowed;
    }
  }

  @media (min-width: 577px) {
    justify-content: space-between;
    flex-direction: row;

    div.incdec-control {
      width: 25%;
    }
    div:last-child {
      width: 75%;
    }
    button.add {
      width: 75%;
      margin: 0 10px;
    }
  }

  @media (min-width: 769px) {
    position: relative;
    bottom: initial;
    right: initial;

    button.add {
      width: 100%;
      margin: 0px;
    }
  }

  @media (min-width: 1201px) {
    padding: 10px 0px;

    div.incdec-control {
      width: 30%;
    }
    div:last-child {
      width: 70%;
      button {
        width: 100%;
      }
    }
    button.add {
      width: 68%;
    }
  }
`
export const SkeletonBlock = styled.div`
  width: ${({ width }) => width && `${width}%`};
  border-radius: 16px;
  margin: auto;

  span {
    margin-bottom: 10px;
  }
`

export const WrapperSubOption = styled.div`
  border-radius: 10px;
  &.error {
    background-color: ${lighten(0.58, '#A52121')};
  }
`

export const SkuContent = styled.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 0px;
  }

  p {
    font-size: 14px;
  }
`
