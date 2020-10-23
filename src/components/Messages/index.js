import React, { useState, useEffect } from 'react'
import { DropDownCircleImage } from '../Dropdown/style'
import {
  Messages as MessagesController,
  useLanguage,
  useSession
} from 'ordering-components'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import {
  MessagesContainer,
  HeaderProfile,
  Image,
  Chat,
  BubbleCustomer,
  MessageCustomer,
  MyName,
  PartnerName,
  MessageBusiness,
  BubbleBusines,
  SkeletonBubbleCustomer,
  SkeletonBubbleBusiness,
  ChatImage,
  TimeofSent,
  SendForm,
  Send,
  SendImage,
  MessageConsole,
  BubbleConsole,
  WrapperDeleteImage,
  WrapperSendMessageButton,
  HeaderOnline
} from './styles'
import { Input } from '../../styles/Inputs'
import { Button } from '../../styles/Buttons'
import { BsCardImage, IoIosSend, RiUser2Fill, FaUserAlt } from 'react-icons/all'
import moment from 'moment'
import { Alert } from '../Confirm'

export const MessagesUI = (props) => {
  const {
    order,
    messages,
    handleSend,
    image,
    message,
    sendMessage,
    setImage,
    setMessage,
    business,
    driver
  } = props

  const [, t] = useLanguage()
  const { handleSubmit, register, errors } = useForm()
  const [alertState, setAlertState] = useState({ open: false, content: [] })
  const [{ user }] = useSession()

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      setAlertState({
        open: true,
        content: Object.values(errors).map(error => error.message)
      })
    }
  }, [errors])

  useEffect(() => {
    if (!sendMessage.loading && sendMessage?.error) {
      setAlertState({
        open: true,
        content: sendMessage.error || [t('ERROR')]
      })
    }
    if (sendMessage.loading) {
      clearInputs()
    }
  }, [sendMessage])

  useEffect(() => {
    if (!messages.loading) {
      const chat = document.getElementById('chat')
      chat.scrollTop = chat.scrollHeight
    }
  }, [messages.messages.length])

  const onChangeMessage = (e) => {
    setMessage(e.target.value)
  }

  const removeImage = (e) => {
    setImage(null)
  }

  const onChangeImage = e => {
    const files = e.target.files[0]
    const reader = new window.FileReader()
    reader.readAsDataURL(files)
    reader.onload = () => {
      setImage(reader.result)
    }
    reader.onerror = error => {
      console.log(error)
    }
  }

  const getStatus = (status) => {
    switch (status) {
      case 0:
        return 'ORDER_STATUS_PENDING'
      case 1:
        return 'ORDERS_COMPLETED'
      case 2:
        return 'ORDER_REJECTED'
      case 3:
        return 'ORDER_STATUS_IN_BUSINESS'
      case 4:
        return 'ORDER_READY'
      case 5:
        return 'ORDER_REJECTED_RESTAURANT'
      case 6:
        return 'ORDER_STATUS_CANCELLEDBYDRIVER'
      case 7:
        return 'ORDER_STATUS_ACCEPTEDBYRESTAURANT'
      case 8:
        return 'ORDER_CONFIRMED_ACCEPTED_BY_DRIVER'
      case 9:
        return 'ORDER_PICKUP_COMPLETED_BY_DRIVER'
      case 10:
        return 'ORDER_PICKUP_FAILED_BY_DRIVER'
      case 11:
        return 'ORDER_DELIVERY_COMPLETED_BY_DRIVER'
      case 12:
        return 'ORDER_DELIVERY_FAILED_BY_DRIVER'
      default:
        return status
    }
  }

  const getLevel = (level) => {
    switch (level) {
      case 0:
        return 'Admin'
      case 1:
        return 'Business'
      case 2:
        return 'Driver'
      case 3:
        return 'Customer'
    }
  }

  const clearInputs = () => {
    const input = document.getElementById('message')
    if (input) {
      input.value = ''
    }
    removeImage()
    setMessage('')
  }

  const onSubmit = (values) => {
    handleSend()
  }

  const closeAlert = () => {
    setAlertState({
      open: false,
      content: []
    })
  }
  return (
    <MessagesContainer>
      <HeaderProfile>
        <Image>
          {
            business && (
              <DropDownCircleImage
                src={order.business?.logo}
                fallback={<FaUserAlt />}
              />
            )
          }
          {
            driver && (
              <DropDownCircleImage
                src={order.driver?.photo}
                fallback={<RiUser2Fill />}
              />
            )
          }
        </Image>
        {business && (
          <HeaderOnline>
            <h1>{order.business?.name}</h1>
            <span>{t('ONLINE', 'Online')}</span>
          </HeaderOnline>
        )}
        {driver && (
          <HeaderOnline>
            <h1>{order.driver?.name}</h1>
            <span>{t('ONLINE', 'Online')}</span>
          </HeaderOnline>
        )}
      </HeaderProfile>
      {!messages.loading ? (
        <Chat id='chat'>
          <MessageConsole>
            <BubbleConsole>
              {t('ORDER_PLACED_FOR', 'Order placed for')} {' '}
              <strong>{moment.utc(order.created_at).format('YYYY/MM/DD hh:mm A')}</strong> {' '}
              {t('VIA', 'via')} <strong>{order.app_id}</strong>{' '}
              <TimeofSent>{moment.utc(order.created_at).fromNow()}</TimeofSent>
            </BubbleConsole>
          </MessageConsole>
          {messages?.messages.map((message) => (
            <MessageConsole key={message.id}>
              {message.type === 1 && (
                message.change?.attribute !== 'driver_id' ? (
                  <BubbleConsole>
                    {t('ORDER', 'Order')}
                    <strong>{message.change.attribute} </strong>
                    {t('CHANGED_FROM', 'Changed from')} {' '}
                    {message.change.old !== null && (
                      <>
                        <strong>{t(getStatus(parseInt(message.change.old, 10)))} </strong>
                      </>
                    )}
                    <> {t('TO', 'to')} {t(getStatus(parseInt(message.change.new, 10)))} </>
                    <TimeofSent>
                      {
                        moment.utc(message.created_at).fromNow()
                      }
                    </TimeofSent>
                  </BubbleConsole>
                ) : (
                  <BubbleConsole>
                    <strong>{message.driver?.name} {' '} {message.driver?.lastname && message.driver.lastname}</strong>
                    {t('WAS_ASSIGNED_AS_DRIVER', 'was assigned as driver')}
                    {message.comment && (<><br /> {message.comment.length}</>)}
                    <TimeofSent>{moment.utc(message.created_at).fromNow()}</TimeofSent>
                  </BubbleConsole>
                )
              )}
            </MessageConsole>
          ))}
          {messages?.messages.map((message) => (
            <React.Fragment key={message.id}>
              {message.type === 2 && user.id === message.author_id && (
                <MessageCustomer>
                  <BubbleCustomer>
                    <strong><MyName>{message.author.name} ({getLevel(message.author.level)})</MyName></strong>
                    {message.comment}
                    <TimeofSent>{moment.utc(message.created_at).fromNow()}</TimeofSent>
                  </BubbleCustomer>
                </MessageCustomer>
              )}
              {message.type === 3 && user.id === message.author_id && (
                <MessageCustomer>
                  <BubbleCustomer name='image'>
                    <strong><MyName>{message.author.name} ({getLevel(message.author.level)})</MyName></strong>
                    <ChatImage><img src={message.source} /></ChatImage>
                    {message.comment && (
                      <>
                        {message.comment}
                      </>
                    )}
                    <TimeofSent>{moment.utc(message.created_at).fromNow()}</TimeofSent>
                  </BubbleCustomer>
                </MessageCustomer>
              )}
              {message.type === 2 && user.id !== message.author_id && (
                <MessageBusiness>
                  <BubbleBusines>
                    <strong><PartnerName>{message.author.name} ({getLevel(message.author.level)})</PartnerName></strong>
                    {message.comment}
                    <TimeofSent>{moment.utc(message.created_at).fromNow()}</TimeofSent>
                  </BubbleBusines>
                </MessageBusiness>
              )}
              {message.type === 3 && user.id !== message.author_id && (
                <MessageBusiness>
                  <BubbleBusines name='image'>
                    <strong><PartnerName>{message.author.name} ({getLevel(message.author.level)})</PartnerName></strong>
                    <ChatImage><img src={message.source} /></ChatImage>
                    {message.comment && (
                      <>
                        {message.comment}
                      </>
                    )}
                    <TimeofSent>{moment.utc(message.created_at).fromNow()}</TimeofSent>
                  </BubbleBusines>
                </MessageBusiness>
              )}
            </React.Fragment>
          ))}
        </Chat>
      ) : (
        <Chat>
          <MessageBusiness>
            <SkeletonBubbleBusiness>
              <Skeleton width={200} height={100} />
            </SkeletonBubbleBusiness>
          </MessageBusiness>
          <MessageCustomer>
            <SkeletonBubbleCustomer>
              <Skeleton width={250} height={100} />
            </SkeletonBubbleCustomer>
          </MessageCustomer>
          <MessageBusiness>
            <SkeletonBubbleBusiness>
              <Skeleton width={150} height={100} />
            </SkeletonBubbleBusiness>
          </MessageBusiness>
          <MessageCustomer>
            <SkeletonBubbleCustomer>
              <Skeleton width={200} height={100} />
            </SkeletonBubbleCustomer>
          </MessageCustomer>
        </Chat>
      )}
      <SendForm>
        <Send onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            placeholder={t('WRITE_A_MESSAGE', 'Write a message')}
            onChange={onChangeMessage}
            name='message'
            id='message'
            ref={register({
              required: !image
            })}
          />
          {!image && (
            <SendImage htmlFor='chat_image'>
              <input
                type='file'
                name='image'
                id='chat_image'
                accept='image/png,image/jpg,image/jpeg'
                onChange={onChangeImage}
              />
              <BsCardImage />
            </SendImage>
          )}
          <WrapperDeleteImage>
            {image && (
              <Button
                circle
                onClick={removeImage}
              >
                {t('X', 'X')}
              </Button>
            )}
          </WrapperDeleteImage>
          <WrapperSendMessageButton>
            <Button
              color='primary'
              type='submit'
              disabled={sendMessage.loading || (message === '' && !image)}
            >
              <IoIosSend />
              {sendMessage.loading ? (
                <>
                  {t('SENDING_MESSAGE', 'Sending...')}
                </>
              )
                : (
                  <>
                    {t('SEND', 'send')}
                  </>)}
            </Button>
          </WrapperSendMessageButton>
        </Send>
      </SendForm>
      <Alert
        title={t('ERROR', 'error')}
        content={alertState.content}
        acceptText={t('ACCEPT')}
        open={alertState.open}
        onClose={() => closeAlert()}
        onAccept={() => closeAlert()}
        closeOnBackdrop={false}
      />
    </MessagesContainer>
  )
}

export const Messages = (props) => {
  const MessagesProps = {
    ...props,
    UIComponent: MessagesUI
  }
  return <MessagesController {...MessagesProps} />
}
