import React, { useEffect, useState } from 'react'
import { useOrder, useLanguage } from 'ordering-components'
import { CancelToken } from 'ordering-api-sdk'

export const ProductsListing = (props) => {
  console.log('Move ProductsListing to ordering-componenets')
  const {
    slug,
    ordering,
    businessProps,
    UIComponent
  } = props

  const [orderState] = useOrder()
  const [, t] = useLanguage()

  const [categorySelected, setCategorySelected] = useState({ id: null, name: t('ALL', 'All') })
  const [businessState, setBusinessState] = useState({ business: {}, loading: true, error: null })
  const [categoriesState, setCategoriesState] = useState({})
  const requestsState = {}

  const categoryStateDefault = {
    loading: true,
    pagination: { currentPage: 0, pageSize: 20, totalItems: null, totalPages: 0, nextPageItems: 10 },
    products: []
  }

  const [categoryState, setCategoryState] = useState(categoryStateDefault)
  const [errors, setErrors] = useState(null)

  /**
   * Change category selected
   * @param {Object} category Category object
   */
  const handleChangeCategory = (category) => {
    if (category?.id === categorySelected?.id) return
    setCategorySelected(category)
  }

  const getProducts = async (newFetch) => {
    if (!businessState.business.lazy_load_products_recommended) {
      const categoryState = {
        ...categoryStateDefault,
        loading: false
      }
      if (categorySelected.id) {
        categoryState.products = businessState.business.categories?.find(category => category.id === categorySelected.id)?.products || []
      } else {
        categoryState.products = businessState.business.categories?.reduce((products, category) => [...products, ...category.products], []) || []
      }
      setCategoryState({ ...categoryState })
      return
    }

    const categoryKey = categorySelected.id ? `categoryId:${categorySelected.id}` : 'all'
    const categoryState = categoriesState[categoryKey] || categoryStateDefault

    const pagination = categoryState.pagination
    if (pagination.currentPage > 0 && pagination.currentPage === pagination.totalPages) {
      setCategoryState({ ...categoryState, loading: false })
      return
    }

    setCategoryState({ ...categoryState, loading: true })

    const parameters = {
      type: orderState.options?.type || 1,
      page: newFetch ? 1 : pagination.currentPage + 1,
      page_size: pagination.pageSize
    }

    try {
      const functionFetch = categorySelected.id ? ordering.businesses(businessState.business.id).categories(categorySelected.id).products() : ordering.businesses(businessState.business.id).products()
      const source = CancelToken.source()
      requestsState.products = source
      const { content: { error, result, pagination } } = await functionFetch.parameters(parameters).get({ cancelToken: source.token })
      if (!error) {
        const newcategoryState = {
          pagination: {
            ...categoryState.pagination,
            currentPage: pagination.current_page,
            totalItems: pagination.total,
            totalPages: pagination.total_pages
          },
          loading: false,
          products: [...categoryState.products, ...result]
        }
        categoriesState[categoryKey] = newcategoryState
        setCategoryState({ ...newcategoryState })
        setCategoriesState({ ...categoriesState })
      } else {
        setErrors(result)
      }
    } catch (err) {
      if (err.constructor.name !== 'Cancel') {
        setErrors([err.message])
      }
    }
  }

  const getBusiness = async () => {
    try {
      setBusinessState({ ...businessState, loading: true })
      const source = CancelToken.source()
      requestsState.business = source
      const parameters = {
        type: orderState.options?.type || 1,
        location: orderState.options?.address?.location
          ? `${orderState.options?.address?.location?.lat},${orderState.options?.address?.location?.lng}`
          : null
      }
      if (orderState.options?.moment) {
        const parts = orderState.options?.moment.split(' ')
        const dateParts = parts[0].split('-')
        const timeParts = parts[1].split(':')
        const moment = Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2], timeParts[0], timeParts[1], timeParts[2]) / 1000
        parameters.timestamp = moment
      }
      const { content: { result } } = await ordering
        .businesses(slug)
        .select(businessProps)
        .parameters(parameters)
        .get({ cancelToken: source.token })
      setBusinessState({
        ...businessState,
        business: result,
        loading: false
      })
    } catch (err) {
      if (err.constructor.name !== 'Cancel') {
        setBusinessState({
          ...businessState,
          loading: false,
          error: [err.message]
        })
      }
    }
  }

  useEffect(() => {
    if (orderState.loading || businessState.loading) return
    getProducts()
  }, [orderState, categorySelected, businessState])

  useEffect(() => {
    if (!orderState.loading) {
      getBusiness()
    }
  }, [orderState])

  /**
   * Cancel business request on unmount
   */
  useEffect(() => {
    return () => {
      if (requestsState.business) {
        requestsState.business.cancel()
      }
    }
  }, [])

  /**
   * Cancel products request on unmount
   */
  useEffect(() => {
    return () => {
      if (requestsState.products) {
        requestsState.products.cancel()
      }
    }
  }, [businessState])

  /**
   * Cancel products request on unmount and pagination
   */
  useEffect(() => {
    return () => {
      if (requestsState.products) {
        requestsState.products.cancel()
      }
    }
  }, [categoryState])

  return (
    <>
      {UIComponent && (
        <UIComponent
          {...props}
          errors={errors}
          categorySelected={categorySelected}
          categoryState={categoryState}
          businessState={businessState}
          handleChangeCategory={handleChangeCategory}
          getNextProducts={getProducts}
        />
      )}
    </>
  )
}