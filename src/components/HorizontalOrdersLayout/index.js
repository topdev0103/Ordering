import React from 'react'
import { useLanguage, useUtils, useConfig } from 'ordering-components'

import {
  OpenOrder,
  Content,
  Price,
  Logo,
  Card,
  Map,
  Reorder
} from './styles'
import { OrdersContainer, BusinessInformation } from '../OrdersOption/styles'

import { AutoScroll } from '../AutoScroll'
import { Tabs } from '../../styles/Tabs'
import { Button } from '../../styles/Buttons'
import { getGoogleMapImage } from '../../utils'

export const HorizontalOrdersLayout = (props) => {
  const {
    orders,
    pagination,
    loadMoreOrders,
    getOrderStatus,
    isBusinessesPage,
    handleReorder,
    customArray,
    onRedirectPage
  } = props

  const [, t] = useLanguage()
  const [{ configs }] = useConfig()
  const [{ parsePrice, parseDate }] = useUtils()

  const handleClickCard = (uuid) => {
    if (customArray) {
      onRedirectPage({ page: 'checkout', params: { cartUuid: uuid } })
    } else if (isBusinessesPage) {
      onRedirectPage({ page: 'order_detail', params: { orderId: uuid } })
    }
  }

  const Orders = () => {
    return (
      <>
        {orders.length > 0 && orders.map(order => (
          <Card
            key={order.id || order.uuid}
            id='order-card'
            isBusinessesPage={isBusinessesPage}
            onClick={() => handleClickCard(order?.uuid)}
          >
            {(configs?.google_maps_api_key?.value || isBusinessesPage) && (
              <Map isBusinessesPage={isBusinessesPage}>
                <img
                  src={
                    isBusinessesPage 
                      ? (order?.business?.header || order?.business?.logo) 
                      : getGoogleMapImage(order?.business?.location, configs?.google_maps_api_key?.value)
                  }
                  alt={isBusinessesPage ? 'business_header' : 'google-maps-img'}
                  height={isBusinessesPage ? '200px' : '100px'}
                  width='400px'
                />
              </Map>
            )}
            <Content>
              {order.business?.logo && !isBusinessesPage && (
                <Logo>
                  <img src={order.business?.logo} alt='business-logo' width='75px' height='75px' />
                </Logo>
              )}

              <BusinessInformation activeOrders>
                <h2>{order.business?.name}</h2>
                <p name='order_number'>{t('ORDER_NUMBER', 'Order No.')} {order.id}</p>
                <p>{order?.delivery_datetime_utc 
                  ? parseDate(order?.delivery_datetime_utc) 
                  : parseDate(order?.delivery_datetime, { utc: false })}
                </p>
              </BusinessInformation>

              <Price isBusinessesPage={isBusinessesPage}>
                <h2>
                  {parsePrice(order?.summary?.total || order?.total)}
                </h2>
                {order?.status !== 0 && (
                  <p>{getOrderStatus(order.status)?.value}</p>
                )}
                {customArray && (
                  <p name='view-cart' onClick={() => handleClickCard(order.uuid)}>
                    {t('VIEW_ORDER', 'View Order')}
                  </p>
                )}
                {isBusinessesPage && !customArray && (
                  <Reorder>
                    <Button color='primary' onClick={() => handleReorder(order.id)}>
                      {t('REORDER', 'Reorder')}
                    </Button>
                  </Reorder>
                )}
              </Price>
            </Content>
            {!isBusinessesPage && (
              <OpenOrder isBusinessesPage={isBusinessesPage}>
                <Button
                  color='primary'
                  onClick={() => onRedirectPage({ page: 'order_detail', params: { orderId: order?.uuid } })}
                >
                  {t('OPEN_ORDER', 'Open order')}
                </Button>
              </OpenOrder>
            )}
          </Card>
        ))}
        {pagination?.totalPages && pagination?.currentPage < pagination?.totalPages && (
          <Card flex nobg>
            <Button
              className='load-orders'
              bgtransparent
              color='primary'
              outline
              onClick={loadMoreOrders}
            >
              {t('LOAD_MORE_ORDERS', 'Load more orders')}
            </Button>
          </Card>
        )}
      </>
    )
  }

  return (
    <OrdersContainer
      id='orders-container'
      activeOrders
      ordersLength={orders?.length <= 1}
      isBusinessesPage={isBusinessesPage}
    >
      {!isBusinessesPage ? (
        <Tabs>
          <AutoScroll>
            <Orders />
          </AutoScroll>
        </Tabs>
      ) : <Orders />}
    </OrdersContainer>
  )
}