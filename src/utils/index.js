import React from 'react'
import moment from 'moment'
import { FaCcMastercard, FaCcVisa, FaCreditCard } from 'react-icons/fa'

export const optimizeImage = (url, params, fallback) => {
  if (!url && fallback) return fallback
  params = params && params.length > 0 ? `,${params}` : ''
  if (url != null && url.indexOf('res.cloudinary.com') !== -1) {
    var parts = url.split('upload')
    url = `${parts[0]}upload/f_auto,q_auto${params}${parts[1]}`
  }
  return url
}

/**
 * TODO: refactor this method with current currency or some context about it
 * @param {Number} price
 */
export const formatPrice = (price) => `$ ${price.toFixed(2)}`

export const getIconCard = (brand = '') => {
  const value = brand.toLowerCase()
  switch (value) {
    case 'visa':
      return <FaCcVisa />
    case 'mastercard':
      return <FaCcMastercard />
    default:
      return <FaCreditCard />
  }
}

export const DriverTipsOptions = [0, 10, 15, 20, 25]

export const isADateValid = (date) => {
  return moment(date, 'YYYY-MM-DD HH:mm:ss', true).isValid()
}

/**
 * Function to calculate time to scroll element
 * @param {*} t = current time
 * @param {*} b = start value
 * @param {*} c = change in value
 * @param {*} d = duration
 */
const easeInOutQuad = (t, b, c, d) => {
  t /= d / 2
  if (t < 1) return c / 2 * t * t + b
  t--
  return -c / 2 * (t * (t - 2) - 1) + b
}

/**
 * Function to do scroll of one element to another
 * @param {*} element = parent element
 * @param {*} to = position Top of child element
 * @param {*} duration = time to animation
 */
export const scrollTo = (element, to, duration) => {
  const start = element.scrollTop
  const change = to - start
  let currentTime = 0
  const increment = 20

  const animateScroll = () => {
    currentTime += increment
    const val = easeInOutQuad(currentTime, start, change, duration)
    element.scrollTop = val
    if (currentTime < duration) {
      setTimeout(animateScroll, increment)
    }
  }
  animateScroll()
}
