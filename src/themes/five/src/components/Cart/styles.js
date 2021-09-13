import styled, { css } from 'styled-components'

export const CartContainer = styled.div`
  width: 100%;
`

export const CartSticky = styled.div`
  ${({ isCartOnProductsList }) => isCartOnProductsList && css`
    overflow-y: auto;
    max-height: 70vh;
    position: sticky;
    top: 20px;
  `}
  width: 100%;
`

export const OrderBill = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px;
  background-color: ${isCheckout => isCheckout ? 'transparent' : '#FFF'};
  table {
    width: 100%;
    font-size: 14px;

    td span {
      unicode-bidi: bidi-override;
    }

    tr td:nth-child(2) {
      text-align: right;
      ${props => props.theme?.rtl && css`
        text-align: left;
    `}
    }
  }
  table.total {
    border-top: 1px solid #EAEAEA;
    padding-top: 10px;
    tr {
      td {
        font-weight: bold;
        color: ${props => props.theme.colors.darkTextColor};
        font-size: 16px;
      }
    }
  }
`

export const CouponContainer = styled.div`
  width: 100%;
  margin: 10px;
`

export const CheckoutAction = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 0 10px;
  box-sizing: border-box;

  p {
    margin: 0;
    font-weight: 600;
    font-size: 16px;
    color: ${props => props.theme.colors.darkTextColor};
  }

  button {
    padding: 10px 30px;
    min-width: 150px;
    width: 50%;
    &:disabled{
      opacity: 0.5;
      cursor: not-allowed
    }
  }
`

export const Divider = styled.div`
  background: #F8F9FA;
  height: 8px;
  width: calc(100% + 20px);
  margin-left: -10px;

  @media (min-width: 768px) {
    width: calc(100% + 60px);
    margin-left: -30px;
  }
`

export const UpsellingPageTitleWrapper = styled.div`
  display: flex;
  align-items: center;

  p {
    font-weight: 500;
    font-size: 16px;
    color: ${props => props.theme?.colors.darkTextColor};
  }

  svg {
    font-size: 20px;
    cursor: pointer;
    color: #748194;
    margin-left: 30px;

    ${props => props.theme?.rtl && css`
      margin-right: 30px;
      margin-left: 0px;
    `}
  }
`
