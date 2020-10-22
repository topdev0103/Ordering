import React, { useEffect } from 'react'
import { UpsellingPage as UpsellingPageController, useLanguage } from 'ordering-components'
import { Container, UpsellingContainer, Item, Image, Details, CloseUpselling, SkeletonContainer } from './styles'
import { Button } from '../../styles/Buttons'
import Skeleton from 'react-loading-skeleton'
import { Modal } from '../Modal'

const UpsellingPageUI = (props) => {
  const { upsellingProducts, handleAddProductUpselling, handleUpsellingPage, openUpselling, canOpenUpselling, setCanOpenUpselling } = props
  const [, t] = useLanguage()

  useEffect(() => {
    if (upsellingProducts?.products?.length && !upsellingProducts.loading) {
      setCanOpenUpselling(true)
    } else if (!upsellingProducts?.products?.length && !upsellingProducts.loading && !canOpenUpselling && openUpselling) {
      handleUpsellingPage()
    }
  }, [upsellingProducts.loading])

  return (
    <>
      {!canOpenUpselling ? '' : (
        <Modal
          title={t('WANT_SOMETHING_ELSE', 'Do you want something else?')}
          open={openUpselling}
          onClose={() => handleUpsellingPage()}
          width='70%'
        >
          <Container>
            <UpsellingContainer>
              {
                !upsellingProducts.loading ? (
                  <>
                    {
                      !upsellingProducts.error ? upsellingProducts.products.map(product => (
                        <Item key={product.id}>
                          <Image>
                            <img src={product.images} />
                          </Image>
                          <Details>
                            <div>
                              <h3 title={product.name}>{product.name}</h3>
                            </div>
                            <p>${product.price}</p>
                            <Button color='primary' onClick={handleAddProductUpselling}>{t('ADD', 'Add')}</Button>
                          </Details>
                        </Item>
                      )) : (
                        <>
                          {upsellingProducts.message}
                        </>
                      )
                    }
                  </>
                ) : [...Array(8)].map((item, i) => (
                  <SkeletonContainer key={i}>
                    <Skeleton width={150} height={250} />
                  </SkeletonContainer>
                ))
              }
            </UpsellingContainer>
            <CloseUpselling>
              <Button
                color='secondary'
                outline
                onClick={() => handleUpsellingPage(false)}
              >
                {t('NO_THANKS', 'No, Thanks')}
              </Button>
            </CloseUpselling>

          </Container>
        </Modal>
      )}
    </>
  )
}

export const UpsellingPage = (props) => {
  const UpsellingPageProps = {
    ...props,
    UIComponent: UpsellingPageUI
  }

  return <UpsellingPageController {...UpsellingPageProps} />
}
