import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  AddressForm as AddressFormController,
  // useSession,
  GoogleAutocompleteInput,
  GoogleGpsButton
} from 'ordering-components'

import {
  FormControl,
  FormActions,
  AddressWrap,
  WrapAddressInput,
  AddressTagSection
} from './styles'

import company from '../../../template/assets/company.svg'
import heart from '../../../template/assets/heart.svg'
import home from '../../../template/assets/home.svg'

import { Button } from '../../styles/Buttons'
import { Input } from '../../styles/Inputs'

const AddressFormUI = (props) => {
  const {
    formState,
    addressState,
    validationFields,
    isRequiredField,
    updateChanges,
    onCancel,
    onSaveAddressForm,
    hanldeChangeInput,
    saveAddress
  } = props
  // const [{ auth }] = useSession()
  const { handleSubmit, register, errors } = useForm()
  const [state, setState] = useState({ selectedFromAutocomplete: true })
  const [addressTag, setAddressTag] = useState(null)

  const onSubmit = (values) => {
    saveAddress()
    if (!formState.loading) {
      onSaveAddressForm()
    }
  }

  const handleAddressTag = (tag) => {
    setAddressTag(tag)
    hanldeChangeInput({
      target: {
        name: 'tag',
        value: tag
      }
    })
  }

  const handleChangeAddress = (address) => {
    console.log(address)
    setState({
      ...state,
      selectedFromAutocomplete: true
    })
    updateChanges(address)
  }

  const handleAddressKeyDown = () => {
    state.selectedFromAutocomplete && setState({
      ...state,
      selectedFromAutocomplete: false
    })
  }

  return (
    <>
      <FormControl onSubmit={handleSubmit(onSubmit)}>
        <AddressWrap className='google-control'>
          <WrapAddressInput>
            <GoogleAutocompleteInput
              className='input-autocomplete'
              apiKey='AIzaSyDX5giPfK-mtbLR72qxzevCYSUrbi832Sk'
              name='address'
              placeholder='Address'
              onChangeAddress={handleChangeAddress}
              onKeyDown={handleAddressKeyDown}
              defaultValue={formState.changes?.address || addressState.address?.address}
              childRef={register({
                required: isRequiredField('address') ? 'Address is required' : null
              })}
            />
            {!formState.changes?.location && errors.address && <i style={{ color: '#c10000' }}>{errors.address.message}</i>}
          </WrapAddressInput>
          {(!validationFields.loading || !addressState.loading) &&
            <GoogleGpsButton
              className='gps-button'
              apiKey='AIzaSyDX5giPfK-mtbLR72qxzevCYSUrbi832Sk'
              onAddress={handleChangeAddress}
            />}
        </AddressWrap>
        <Input
          name='internal_number'
          placeholder='Internal number'
          ref={register}
          onChange={hanldeChangeInput}
        />
        <Input
          name='zipcode'
          placeholder='Zip code'
          ref={register}
          onChange={hanldeChangeInput}
        />
        <Input
          name='address_notes'
          type='textarea'
          w='100'
          placeholder='Address Notes'
          ref={register}
          onChange={hanldeChangeInput}
        />
        {!formState.loading && formState.error && <p style={{ color: '#c10000' }}>{formState.error}</p>}
        <AddressTagSection>
          <Button className={addressTag === 'home' ? 'active' : ''} type='button' outline circle onClick={() => handleAddressTag('home')}>
            <img src={company} alt='Home' />
          </Button>
          <Button className={addressTag === 'office' ? 'active' : ''} type='button' outline circle onClick={() => handleAddressTag('office')}>
            <img src={heart} alt='Office' />
          </Button>
          <Button className={addressTag === 'favorite' ? 'active' : ''} type='button' outline circle onClick={() => handleAddressTag('favorite')}>
            <img src={home} alt='Favorite' />
          </Button>
          <Button className={addressTag === 'other' ? 'active' : ''} type='button' outline circle onClick={() => handleAddressTag('other')}>
            <img src={home} alt='Other' />  {/** Change this image for a plus image */}
          </Button>
        </AddressTagSection>
        <FormActions>
          <Button type='button' disabled={formState.loading} outline onClick={() => onCancel()}>Cancel</Button>
          <Button type='submit' disabled={formState.loading} color='primary'>{addressState.address?.id ? 'Update' : 'Add'}</Button>
        </FormActions>
      </FormControl>
    </>
  )
}

export const AddressForm = (props) => {
  const addressFormProps = {
    ...props,
    UIComponent: AddressFormUI
  }

  return <AddressFormController {...addressFormProps} />
}
