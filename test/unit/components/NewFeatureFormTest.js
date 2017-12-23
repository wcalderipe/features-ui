import sinon from 'sinon'
import {React, shallow} from './testSetup'

import NewFeatureForm from '../../../src/components/NewFeatureForm'

describe('NewFeatureForm component', () => {
  const sandbox = sinon.sandbox.create()
  const props = {
    match: {
      params: {applicationId: '99'}
    }
  }

  afterEach(() => {
    sandbox.restore()
  })

  it('starts with empty state', () => {
    const wrapper = shallow(<NewFeatureForm {...props} />)

    expect(wrapper.state('name')).toEqual('')
    expect(wrapper.state('submitSucceeded')).toEqual(false)
  })

  it('renders FeatureForm with form handlers', () => {
    const wrapper = shallow(<NewFeatureForm {...props} />)
    const form = wrapper.find('FeatureForm')
    const expectedProps = {
      onSubmit: wrapper.instance().handleSubmit,
      onChange: wrapper.instance().handleChange
    }

    expect(form.exists()).toEqual(true)
    expect(form.props()).toEqual(expectedProps)
  })

  it('does not redirect to application features list', () => {
    const wrapper = shallow(<NewFeatureForm {...props} />)
    const redirect = wrapper.find('Redirect')

    expect(redirect.exists()).toEqual(false)
  })
})
