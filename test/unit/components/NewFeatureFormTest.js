import sinon from 'sinon'
import {React, shallow} from './testSetup'

import * as client from '../../../src/clients/api'
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

  describe('handleSubmit', () => {
    beforeEach(() => {
      sandbox.stub(client, 'post').resolves({status: 201})
    })

    it('calls client post', async () => {
      const wrapper = shallow(<NewFeatureForm {...props} />)
      const expectedResource = 'features'
      const expectedPayload = {
        applicationId: 99,
        name: 'new_feature'
      }
      const fakeEvent = {
        preventDefault: () => {}
      }
      wrapper.setState({
        name: 'new_feature'
      })

      await wrapper.instance().handleSubmit(fakeEvent)

      sinon.assert.calledWith(client.post, expectedResource, expectedPayload)
    })
  })
})
