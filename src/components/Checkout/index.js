import React, { useEffect, useState } from 'react'
import { VscWarning } from 'react-icons/vsc'
import Skeleton from 'react-loading-skeleton'
import { Checkout as CheckoutController, useOrder, useSession, useApi, useLanguage } from 'ordering-components'

import {
  Container,
  WrappContainer,
  UserDetailsContainer,
  PaymentMethodContainer,
  DriverTipContainer,
  CartContainer,
  WrapperPlaceOrderButton,
  WarningMessage,
  CartsList,
  CartItem,
  CartItemWrapper,
  LogoWrapper,
  CartItemLogo,
  CartItemInfo,
  CartItemActions
} from './styles'

import { Button } from '../../styles/Buttons'

import { NotFoundSource } from '../NotFoundSource'

import { AddressDetails } from '../AddressDetails'
import { UserDetails } from '../UserDetails'
import { PaymentOptions } from '../PaymentOptions'
import { DriverTips } from '../DriverTips'
import { Cart } from '../Cart'

import { DriverTipsOptions, formatPrice } from '../../utils'

const CheckoutUI = (props) => {
  const {
    cartState,
    cart,
    placing,
    businessDetails,
    paymethodSelected,
    handlePaymethodChange,
    handlerClickPlaceOrder
  } = props

  const [{ options }] = useOrder()
  const [, t] = useLanguage()

  return (
    <Container>
      <WrappContainer>
        {cart?.status === 2 && (
          <WarningMessage>
            <VscWarning />
            <h1>
              {t('CART_STATUS_PENDING_MESSAGE', 'Your order is being processed, please wait a little more. if you\'ve been waiting too long, please reload the page')}
            </h1>
          </WarningMessage>
        )}
        {cart?.status === 4 && (
          <WarningMessage>
            <VscWarning />
            <h1>
              {t('CART_STATUS_CANCEL_MESSAGE', 'The payment has not been successful, please try again')}
            </h1>
          </WarningMessage>
        )}

        {cartState.loading ? (
          <div style={{ width: '100%', marginBottom: '20px' }}>
            <Skeleton height={35} style={{ marginBottom: '10px' }} />
            <Skeleton height={150} />
          </div>
        ) : (
          <AddressDetails
            businessId={cart?.business_id}
            apiKey='AIzaSyDX5giPfK-mtbLR72qxzevCYSUrbi832Sk'
          />
        )}

        <UserDetailsContainer>
          <div className='user'>
            {cartState.loading ? (
              <div>
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
              </div>
            ) : (
              <UserDetails
                cartStatus={cart?.status}
                businessId={cart?.business_id}
                useValidationFields
                useDefualtSessionManager
                useSessionUser
              />
            )}
          </div>
          {(businessDetails?.loading || cartState.loading) && (
            <div className='business'>
              <div>
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
                <Skeleton height={35} style={{ marginBottom: '10px' }} />
              </div>
            </div>
          )}
          {!cartState.loading && businessDetails?.business && Object.values(businessDetails?.business).length > 0 && (
            <div className='business'>
              <h1>{t('BUSINESS_DETAILS', 'Business Details')}</h1>
              <div>
                <p>{businessDetails?.business?.name}</p>
                <p>{businessDetails?.business?.email}</p>
                <p>{businessDetails?.business?.cellphone}</p>
                <p>{businessDetails?.business?.address}</p>
              </div>
            </div>
          )}
          {businessDetails?.error && businessDetails?.error?.length > 0 && (
            <div className='business'>
              <h1>{t('BUSINESS_DETAILS', 'Business Details')}</h1>
              {businessDetails?.error.map((e, i) => (
                <p key={i}>{t('ERROR', 'ERROR')}: [{e}]</p>
              ))}
            </div>
          )}
        </UserDetailsContainer>

        {!cartState.loading && cart && cart?.status !== 2 && (
          <PaymentMethodContainer>
            <h1>{t('PAYMENT_METHOD', 'Payment Method')}</h1>
            {businessDetails.business && (
              <PaymentOptions
                businessId={cart?.business_id}
                paymethods={businessDetails?.business?.paymethods}
                onPaymentChange={handlePaymethodChange}
              />
            )}
          </PaymentMethodContainer>
        )}

        {!cartState.loading && cart && options.type === 1 && cart?.status !== 2 && (
          <DriverTipContainer>
            <h1>{t('DRIVER_TIP', 'Driver Tip')}</h1>
            <DriverTips
              businessId={cart?.business_id}
              driverTipsOptions={DriverTipsOptions}
              useOrderContext
            />
          </DriverTipContainer>
        )}

        {!cartState.loading && cart && (
          <CartContainer>
            <h1>{t('YOUR_ORDER', 'Your Order')}</h1>
            <Cart
              cart={cart}
              isProducts={cart?.products?.length || 0}
            />
          </CartContainer>
        )}

        {!cartState.loading && cart && cart?.status !== 2 && (
          <WrapperPlaceOrderButton>
            <Button
              color='primary'
              disabled={!cart?.valid || !paymethodSelected || placing}
              onClick={() => handlerClickPlaceOrder()}
            >
              {placing ? t('PLACING', 'Placing...') : t('PLACE_ORDER', 'Place Order')}
            </Button>
          </WrapperPlaceOrderButton>
        )}

        {/* {error && error?.length > 0 && (
          error.map((e, i) => (
            <p key={i}>{t('ERROR', 'ERROR')}: [{e}]</p>
          ))
        )} */}
      </WrappContainer>
    </Container>
  )
}

export const Checkout = (props) => {
  const {
    query,
    cartUuid,
    handleOrderRedirect,
    handleCheckoutRedirect,
    handleSearchRedirect
  } = props

  const [{ carts }, { confirmCart }] = useOrder()
  const [{ token }] = useSession()
  const [ordering] = useApi()
  const [, t] = useLanguage()

  const [cartState, setCartState] = useState({ loading: false, error: null, cart: null })

  const getOrder = async (cartId) => {
    try {
      setCartState({ ...cartState, loading: true })
      const response = await fetch(`${ordering.root}/carts/${cartId}`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } })
      const { result } = await response.json()

      if (result.status === 1 && result.order?.uuid) {
        handleOrderRedirect(result.order.uuid)
        setCartState({ ...cartState, loading: false })
      } else if (result.status === 2 && result.paymethod_data.gateway === 'stripe_redirect' && query.get('payment_intent')) {
        try {
          await confirmCart(cartUuid)
          handleOrderRedirect(result.order.uuid)
        } catch (error) {
          console.log(error)
        }
      } else {
        setCartState({
          ...cartState,
          loading: false,
          cart: result
        })
      }
    } catch (e) {
      setCartState({
        ...cartState,
        loading: false,
        error: [e.toString()]
      })
    }
  }

  useEffect(() => {
    if (token && cartUuid) {
      getOrder(cartUuid)
    }
  }, [token, cartUuid])

  const checkoutProps = {
    ...props,
    UIComponent: CheckoutUI,
    cartState,
    businessId: cartState.cart?.business_id
  }
  return (
    <>
      {!cartUuid && carts && Object.keys(carts).length === 0 && (
        <NotFoundSource
          content={t('NOT_FOUND_CARTS', 'Sorry, You don\'t seem to have any carts.')}
          btnTitle={t('SEARCH_REDIRECT', 'Go to Businesses')}
          onClickButton={handleSearchRedirect}
        />
      )}
      {!cartUuid && carts && Object.values(carts).length > 0 && (
        <CartsList>
          {Object.values(carts).map(cart => (
            <CartItem
              key={cart.uuid}
            >
              <CartItemWrapper>
                <LogoWrapper>
                  <CartItemLogo bgimage={cart?.business?.logo} />
                </LogoWrapper>
                <CartItemInfo>
                  <h1>{cart?.business?.name}</h1>
                  <p>{formatPrice(cart?.total)}</p>
                </CartItemInfo>
              </CartItemWrapper>
              <CartItemActions>
                <Button
                  color='primary'
                  onClick={() => handleCheckoutRedirect(cart.uuid)}
                >
                  Pay
                </Button>
              </CartItemActions>
            </CartItem>
          ))}
        </CartsList>
      )}
      {cartState.error && cartState.error?.length > 0 && (
        <NotFoundSource
          content={t('ERROR_CART', 'Sorry, an error has occurred.')}
          btnTitle={t('SEARCH_REDIRECT', 'Go to Businesses')}
          onClickButton={handleSearchRedirect}
        />
      )}
      {cartUuid && cartState.cart && cartState.cart?.status !== 1 && <CheckoutController {...checkoutProps} />}
    </>
  )
}
